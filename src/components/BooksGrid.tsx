import {useState} from "react"
import {Book} from "@/types/book"
import {BookCard} from "@/components/BookCard"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import useBooks from "@/hooks/use-books.ts";
import LoadingState from "@/components/data-states/loading-state.tsx";
import ErrorState from "@/components/data-states/error-state.tsx";
import {SearchIcon} from "lucide-react";


export function BooksGrid() {
    const {books, isLoading, isError} = useBooks()
    const [filter, setFilter] = useState("")
    if (isLoading) return <LoadingState/>

    if (isError) return <ErrorState errorMessage={"Something went wrong from our end. Please try again later"}
                                    errorTitle={"Failed to fetch books"}/>

    const filteredBooks = books?.filter((book: Book) =>
        book.title.toLowerCase().includes(filter.toLowerCase())
    )
    return (
        <div className="p-4">
            <div className={"flex flex-col md:flex-row md:justify-between md:items-center"}>
                <div className="flex py-8 gap-4">
                    <Input
                        placeholder="Search books..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button variant="outline"><SearchIcon/></Button>
                </div>
                <div>
                    Filter books
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map((book: Book) => (
                    <BookCard key={book.title} book={book}/>
                ))}
            </div>
            {filteredBooks.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400">No books found.</p>
            )}
        </div>
    )
}

