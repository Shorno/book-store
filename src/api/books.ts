import {axiosSecure} from "@/api/axiosConfig.ts";
import {Book} from "@/types/book.ts";


export const addBook = async (book: Book) => {
    const response = await axiosSecure.post('/books', book);
    return response.data;
}

export const getBooks = async () => {
    const response = await axiosSecure.get("/books");
    return response.data;
}