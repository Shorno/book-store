import {ArrowLeft, Book} from "lucide-react"

import {LoginForm} from "@/components/login-form.tsx"
import {Link} from "react-router";


export default function LoginPage() {

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link to="/" className="flex items-center gap-2 self-center font-medium">
                    <ArrowLeft/>
                    <div
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <Book className="size-4"/>
                    </div>
                    X Book Store
                </Link>
                <LoginForm/>
            </div>
        </div>
    )
}
