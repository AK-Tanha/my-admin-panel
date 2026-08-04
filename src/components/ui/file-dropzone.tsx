import { useCallback, useState } from "react"
import { useDropzone, type FileRejection } from "react-dropzone"
import { Upload, X, FileIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type DropzoneFile = {
  id: string
  file: File
  preview?: string
}

interface FileDropzoneProps {
  value?: DropzoneFile[]
  onChange?: (files: DropzoneFile[]) => void
  accept?: Record<string, string[]>
  maxFiles?: number
  maxSize?: number // bytes
  multiple?: boolean
  disabled?: boolean
  className?: string
  label?: string
  description?: string
}

export function FileDropzone({
  value = [],
  onChange,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
  },
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  multiple = true,
  disabled = false,
  className,
  label = "Upload files",
  description = "Drag & drop files here, or click to browse",
}: FileDropzoneProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setError(null)

      if (rejectedFiles.length > 0) {
        const firstError = rejectedFiles[0]?.errors[0]
        if (firstError?.code === "file-too-large") {
          setError(`File is too large. Max size is ${Math.round(maxSize / 1024 / 1024)}MB`)
        } else if (firstError?.code === "file-invalid-type") {
          setError("Invalid file type")
        } else {
          setError(firstError?.message || "File rejected")
        }
        return
      }

      const remainingSlots = maxFiles - value.length
      const filesToAdd = acceptedFiles.slice(0, remainingSlots)

      const newFiles: DropzoneFile[] = filesToAdd.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }))

      onChange?.([...value, ...newFiles])
    },
    [value, onChange, maxFiles, maxSize]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled: disabled || value.length >= maxFiles,
  })

  const removeFile = (id: string) => {
    const fileToRemove = value.find((f) => f.id === id)
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview)
    }
    onChange?.(value.filter((f) => f.id !== id))
    setError(null)
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Drop area */}
      <div
        {...getRootProps()}
        className={cn(
          "flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors cursor-pointer",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          (disabled || value.length >= maxFiles) &&
            "cursor-not-allowed opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-3">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
        <p className="text-xs text-muted-foreground mt-2">
          Max {maxFiles} file(s), up to {Math.round(maxSize / 1024 / 1024)}MB each
        </p>
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {/* Preview list */}
      {value.length > 0 && (
        <ul className="space-y-2">
          {value.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              {item.preview ? (
                <img
                  src={item.preview}
                  alt={item.file.name}
                  className="h-10 w-10 rounded object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded bg-muted">
                  <FileIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(item.file.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={() => removeFile(item.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// Optional: simple image-only helper icon usage
export function ImageDropzone(props: Omit<FileDropzoneProps, "accept" | "label">) {
  return (
    <FileDropzone
      {...props}
      accept={{ "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] }}
      label="Upload images"
      description="PNG, JPG, WEBP up to 5MB"
    />
  )
}