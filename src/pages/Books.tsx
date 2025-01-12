import UseBooks from "@/hooks/use-books.ts";
import {BooksTable} from "@/components/BooksTable.tsx";
import LoadingState from "@/components/data-states/loading-state.tsx";
import ErrorState from "@/components/data-states/error-state.tsx";

export default function Books() {
    const {books, isError, isLoading} = UseBooks();


    if (isLoading) return <LoadingState className={"size-12"}/>
    //
    // if (isError) {
    //     return (
    //         <div className="min-h-screen flex items-center justify-center">
    //             <p>Failed to load books</p>
    //         </div>
    //     )
    // }

    if (isError) {
        return (
            <ErrorState
                errorMessage={"There was a server error. Please try again after sometime."}
                errorTitle={"Failed to load books"}
            />
        )
    }


    if (!books || !Array.isArray(books)) {
        return <div>No books available.</div>;
    }


    return (
        <BooksTable data={books}/>

    )
}