import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Link, useNavigate} from "react-router"
import GoogleIcon from "@/icons/googleIcon.tsx"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx"
import {useState, useRef, ChangeEvent} from "react"
import {SignupFormData, signupSchema} from "@/schem.ts"
import useAuthStore from "@/store/authStore.ts"
import toast from "react-hot-toast"
import {useImageUpload} from "@/utils/uploadImage.ts";

export default function SignupForm() {
    const {signUp, signInWithGoogle} = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const imageUploadMutation = useImageUpload()

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
            photoURL: "",
        },
        mode: "onChange"
    })

    const onSubmit = async (values: SignupFormData) => {
        try {
            setIsLoading(true);
            let photoURL = values.photoURL;
            if (selectedFile) {
                try {
                    photoURL = await imageUploadMutation.mutateAsync(selectedFile);
                } catch (uploadError) {
                    console.error("Error uploading image:", uploadError);
                    toast.error("Failed to upload image. Proceeding with signup without profile picture.");
                }
            }
            const {displayName, email, password} = values;
            await signUp(email, password, displayName, photoURL);
            navigate('/');
            toast.success('Registration successful');
        } catch (error: any) {
            console.error("Signup error:", error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email is already in use');
            } else {
                toast.error(`Registration failed: ${error.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle()
            const user = useAuthStore.getState().currentUser?.email
            console.log("Google Sign In successful:", user)
            navigate('/')
            toast.success('Sign in successful')
        } catch (error: any) {
            console.error("Google Sign In error:", error)
            toast.error(`Sign in failed: ${error.message}`)
        }
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const fileUrl = URL.createObjectURL(file)
            setPreviewUrl(fileUrl)

            try {
                const uploadedUrl = await imageUploadMutation.mutateAsync(file);
                form.setValue('photoURL', uploadedUrl, {shouldValidate: true});
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Failed to upload image. Please try again.");
            }
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <>
            <div className={cn("flex flex-col gap-6")}>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Create an account</CardTitle>
                        <CardDescription>
                            Sign up to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" type="button">
                                    <GoogleIcon/>
                                    Sign up with Google
                                </Button>
                                <div
                                    className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center
                after:border-t after:border-border"
                                >
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                      Or continue with
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="displayName"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="m@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <div>
                                        <FormLabel>Profile Picture</FormLabel>
                                        <div className="mt-2 flex items-center gap-4">
                                            <Button onClick={handleUploadClick} type="button" variant="outline">
                                                Upload Image
                                            </Button>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                            {previewUrl && (
                                                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                                                    <img
                                                        src={previewUrl}
                                                        alt="Profile preview"
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <FormField
                                            control={form.control}
                                            name="photoURL"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input type="hidden" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input type="password" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={!form.formState.isValid || isLoading}
                                    >
                                        {isLoading ? "Signing up..." : "Sign up"}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Already have an account?{" "}
                                    <Link to="/login" className="underline underline-offset-4">
                                        Log in
                                    </Link>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
                <div
                    className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                    By clicking continue, you agree to our <Link to="#">Terms of Service</Link>{" "}
                    and <Link to="#">Privacy Policy</Link>.
                </div>
            </div>
        </>
    )
}

