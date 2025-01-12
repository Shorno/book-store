import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Card, CardContent} from "@/components/ui/card";
import {Loader2} from 'lucide-react';
import toast from "react-hot-toast";
import ImageUpload from "@/components/BookImageUpload.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {AddBookFormData, addBookSchema} from "@/schem.ts";
import {useMutation} from "@tanstack/react-query";
import {addBook} from "@/api/books.ts";

type ServerError = {
    response: {
        data: {
            status: string;
            message: string;
            error: string;
        }
    }
}

export default function AddNewBookForm() {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors},
    } = useForm<AddBookFormData>({
        resolver: zodResolver(addBookSchema),
    });


    const {mutateAsync, isPending, reset} = useMutation({
        mutationFn: addBook,
        onSuccess: () => {
            toast.success("Book added successfully");
        },
        onError: (error: ServerError) => {
            const errorMessage = error.response?.data?.error || 'Failed to add book';
            if (errorMessage.includes('E11000')) {
                if (errorMessage.includes('title_1')) {
                    toast.error('A book with this title already exists');
                    return;
                }
            }
            toast.error(errorMessage);
            reset();
        }
    })

    const onSubmit = async (data: AddBookFormData) => {
        await mutateAsync(data);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" {...register("title")} className="mt-1"/>
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="author">Author</Label>
                            <Input id="author" {...register("author")} className="mt-1"/>
                            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...register("description")} className="mt-1"/>
                        {errors.description &&
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                {...register("price", {valueAsNumber: true})}
                                className="mt-1"
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="category">Category</Label>
                            <Controller
                                name="category"
                                control={control}
                                render={({field}) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select a category"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fiction">Fiction</SelectItem>
                                            <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                                            <SelectItem value="science">Science</SelectItem>
                                            <SelectItem value="technology">Technology</SelectItem>
                                            <SelectItem value="business">Business</SelectItem>
                                            <SelectItem value="self-help">Self-Help</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                type="number"
                                {...register("quantity", {valueAsNumber: true})}
                                className="mt-1"
                            />
                            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
                        </div>
                    </div>

                    <div>
                        <Label>Cover Image</Label>
                        <ImageUpload
                            onImageUpload={(url) => {
                                setValue("image", url);
                            }}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isPending}>
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Adding Book...
                            </>
                        ) : (
                            'Add Book'
                        )}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}