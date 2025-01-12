import {LoadingSpinner} from "@/components/ui/loading-spinner.tsx";
import {cn} from "@/lib/utils.ts";

export default function LoadingState({className}: { className?: string }) {
    return (
        <div className={"min-h-screen flex items-center justify-center"}>
            <LoadingSpinner className={cn("size-8", className)} type={"bars"}/>
        </div>
    )
}