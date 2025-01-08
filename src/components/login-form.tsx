import {useState} from "react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Link, useLocation, useNavigate} from "react-router"
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
} from "@/components/ui/form"
import {LoginFormData, loginSchema} from "@/schem.ts";
import useAuthStore from "@/store/authStore.ts";
import toast from "react-hot-toast";


export function LoginForm() {
    const {login, signInWithGoogle} = useAuthStore();
    const [isLoading, setIsLoading] = useState(false)

    const location = useLocation()
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate();


    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: LoginFormData) => {
        const {email, password} = values;
        try {
            setIsLoading(true);
            await login(email, password);
            toast.success('Login successful');
            navigate(from, {replace: true});
        } catch (error: any) {
            switch (error.code) {
                case 'auth/invalid-credential':
                    toast.error('Invalid Credentials. Please try again');
                    break;
                default:
                    toast.error('Failed to login: ' + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            const user = useAuthStore.getState().currentUser?.email;
            console.log(user)
            navigate(from, {replace: true});
            toast.success('Sign in successful');
        } catch (error: any) {
            toast.error(`Sign in failed ${error.message}`);
        }
    }

    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Google account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <Button onClick={handleGoogleSignIn} variant="outline" className="w-full" type="button">
                                <GoogleIcon/>
                                Login with Google
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
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <div className="flex items-center justify-between">
                                                <FormLabel>Password</FormLabel>
                                                <Link
                                                    to="#"
                                                    className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? "Logging in..." : "Login"}
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                Don&apos;t have an account?{" "}
                                <Link to="/signup" className="underline underline-offset-4">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div
                className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </div>
        </div>
    )
}

