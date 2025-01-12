import {useQuery} from "@tanstack/react-query";
import {getBooks} from "@/api/books.ts";

export default function useBooks() {
    const {data: books, isError, isLoading} = useQuery({
        queryKey: ['books'],
        queryFn: getBooks,
        select: (data) => data.data
    })
    console.log(books)


    return {books, isError, isLoading}
}