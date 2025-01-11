import AddNewBookForm from "@/components/AddBookForm.tsx";
export default function AddBookPage() {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
                <div className="container mx-auto py-10 px-4">
                    <h1 className="text-4xl font-bold mb-6 text-center ">
                        Add New Book
                    </h1>
                    <AddNewBookForm/>
                </div>
            </div>
        </>
    )
}