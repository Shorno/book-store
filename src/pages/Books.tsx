import UseBooks from "@/hooks/use-books.ts";
import {Loader2} from "lucide-react";
import {BooksTable} from "@/components/BooksTable.tsx";

export default function Books() {
    const {books, isError, isLoading} = UseBooks();


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 size={48}/>
            </div>
        )
    }
    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Failed to load books</p>
            </div>
        )
    }

    if (!books || !Array.isArray(books)) {
        return <div>No books available.</div>;
    }


    return (
        <BooksTable data={books}/>

    )
}