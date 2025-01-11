import { ChangeEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X, Loader2 } from 'lucide-react'
import { useImageUpload } from "@/hooks/useImageUpload"

interface ImageUploadProps {
    onImageUpload: (url: string) => void
    maxWidth?: number
}

export default function ImageUpload({ onImageUpload, maxWidth = 250 }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const uploadBookImage = useImageUpload()

    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setUploading(true)
        const result = await uploadBookImage.mutateAsync(file)
        setUploading(false)
        setPreview(result)
        onImageUpload(result)
    }

    const removeImage = () => {
        setPreview(null)
        onImageUpload('')
    }

    return (
        <div className="space-y-4" style={{ height: '16rem', maxWidth: `${maxWidth}px` }}>
            {preview ? (
                <div className="relative h-full" style={{ maxWidth: `${maxWidth}px` }}>
                    <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                    >
                        <X/>
                    </Button>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full h-full" style={{ maxWidth: `${maxWidth}px` }}>
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        {uploading ? (
                            <div className="flex flex-col items-center justify-center">
                                <Loader2 className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400 animate-spin" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">Uploading...</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                                </p>
                            </div>
                        )}
                        <Input
                            id="dropzone-file"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                        />
                    </label>
                </div>
            )}
        </div>
    )
}

