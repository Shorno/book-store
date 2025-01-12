import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircle} from "lucide-react";

interface ErrorStateProps {
    errorMessage: string;
    errorTitle: string;
}

export default function ErrorState({errorMessage, errorTitle}: ErrorStateProps) {
    return (
        <div className={"min-h-screen flex items-center justify-center"}>
            <Alert variant="destructive" className={"max-w-lg"}>
                <AlertCircle className="h-4 w-4"/>
                <AlertTitle>{errorTitle}</AlertTitle>
                <AlertDescription>
                    {errorMessage}
                </AlertDescription>
            </Alert>
        </div>

    )
}