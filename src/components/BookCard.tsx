import { Book } from "@/types/book"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
interface BookCardProps {
    book: Book
}

export function BookCard({ book }: BookCardProps) {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader className="relative p-0">
                <img
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    className="w-full h-64 object-cover rounded-t-lg"
                />
            </CardHeader>
            <CardContent className="pt-4">
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">by {book.author}</p>
                <p className="text-sm mt-2">{book.description.slice(0, 100)}...</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <div>
                    <p className="text-lg font-bold">${book.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{book.quantity} in stock</p>
                </div>
                <Button>Add to Cart</Button>
            </CardFooter>
        </Card>
    )
}

