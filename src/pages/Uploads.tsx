import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileDropzone, type DropzoneFile } from "@/components/ui/file-dropzone"
import { toast } from "sonner"

export default function Uploads() {
  const [images, setImages] = useState<DropzoneFile[]>([])
  const [documents, setDocuments] = useState<DropzoneFile[]>([])

  const handleUploadImages = () => {
    if (images.length === 0) {
      toast.error("Please select at least one image")
      return
    }
    // Later: upload to your API / S3
    console.log(
      "Images to upload:",
      images.map((f) => f.file)
    )
    toast.success(`${images.length} image(s) ready to upload`)
  }

  const handleUploadDocs = () => {
    if (documents.length === 0) {
      toast.error("Please select at least one file")
      return
    }
    console.log(
      "Documents to upload:",
      documents.map((f) => f.file)
    )
    toast.success(`${documents.length} file(s) ready to upload`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Uploads</h1>
        <p className="text-muted-foreground">
          Example file and image dropzone usage.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Image Upload</CardTitle>
            <CardDescription>
              Drag & drop images or click to browse.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileDropzone
              value={images}
              onChange={setImages}
              maxFiles={4}
              accept={{
                "image/*": [".png", ".jpg", ".jpeg", ".webp"],
              }}
              label="Upload images"
              description="PNG, JPG, WEBP up to 5MB"
            />
            <Button onClick={handleUploadImages} disabled={images.length === 0}>
              Upload Images
            </Button>
          </CardContent>
        </Card>

        {/* Documents */}
        <Card>
          <CardHeader>
            <CardTitle>Document Upload</CardTitle>
            <CardDescription>
              Upload PDF or text documents.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FileDropzone
              value={documents}
              onChange={setDocuments}
              maxFiles={3}
              accept={{
                "application/pdf": [".pdf"],
                "text/plain": [".txt"],
              }}
              label="Upload documents"
              description="PDF or TXT up to 5MB"
            />
            <Button
              onClick={handleUploadDocs}
              disabled={documents.length === 0}
            >
              Upload Documents
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}