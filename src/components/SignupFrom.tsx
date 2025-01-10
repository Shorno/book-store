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
import {useState} from "react";
import {SignupFormData, signupSchema} from "@/schem.ts";
import useAuthStore from "@/store/authStore.ts";
import toast from "react-hot-toast";

export default function SignupFrom() {
    const {signUp, signInWithGoogle} = useAuthStore()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const form = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
            photoURL: "",
        },
    })

    const onSubmit = async (values: SignupFormData) => {
        const {displayName, email, photoURL, password} = values;
        try {
            setIsLoading(true);
            await signUp(email, password, displayName, photoURL);
            navigate('/');
            toast.success('Registration successful');
        } catch (error: any) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    toast.error('Email is already in use');
                    break;
                default:
                    toast.error(`Registration failed ${error.message}`);
                    break;
            }
        } finally {
            setIsLoading(false);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            const user = useAuthStore.getState().currentUser?.email;
            console.log(user);
            navigate('/');
            toast.success('Sign in successful');
        } catch (error: any) {
            toast.error(`Sign in failed ${error.message}`);
        }
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
                                    <FormField
                                        control={form.control}
                                        name="photoURL"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Photo URL</FormLabel>
                                                <FormControl>
                                                    <Input type="url" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
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

                                    <Button type="submit" className="w-full" disabled={isLoading}>
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