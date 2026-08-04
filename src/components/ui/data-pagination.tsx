import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

interface DataPaginationProps {
  pageIndex: number
  pageCount: number
  canPreviousPage: boolean
  canNextPage: boolean
  totalItems?: number
  pageSize?: number
  onPageChange: (pageIndex: number) => void
  onPreviousPage: () => void
  onNextPage: () => void
  onFirstPage?: () => void
  onLastPage?: () => void
  className?: string
}

export function DataPagination({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  totalItems,
  pageSize,
  onPageChange,
  onPreviousPage,
  onNextPage,
  onFirstPage,
  onLastPage,
  className,
}: DataPaginationProps) {
  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    const maxVisible = 5

    if (pageCount <= maxVisible) {
      for (let i = 0; i < pageCount; i++) pages.push(i)
      return pages
    }

    pages.push(0) // first page

    if (pageIndex > 2) pages.push("ellipsis")

    const start = Math.max(1, pageIndex - 1)
    const end = Math.min(pageCount - 2, pageIndex + 1)

    for (let i = start; i <= end; i++) pages.push(i)

    if (pageIndex < pageCount - 3) pages.push("ellipsis")

    pages.push(pageCount - 1) // last page

    return pages
  }

  return (
    <div className={cn(
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
      className
    )}>
      {/* Info */}
      <div className="text-sm text-muted-foreground">
        {totalItems !== undefined ? (
          <>
            Showing{" "}
            <span className="font-medium">
              {pageIndex * (pageSize || 10) + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min((pageIndex + 1) * (pageSize || 10), totalItems)}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </>
        ) : (
          <>
            Page <span className="font-medium">{pageIndex + 1}</span> of{" "}
            <span className="font-medium">{pageCount}</span>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1">
        {/* First page */}
        {onFirstPage && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={onFirstPage}
            disabled={!canPreviousPage}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>
        )}

        {/* Previous */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={onPreviousPage}
          disabled={!canPreviousPage}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous page</span>
        </Button>

        {/* Page numbers */}
        <div className="hidden items-center gap-1 sm:flex">
          {getPageNumbers().map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-muted-foreground"
              >
                ...
              </span>
            ) : (
              <Button
                key={page}
                variant={pageIndex === page ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => onPageChange(page)}
              >
                {page + 1}
              </Button>
            )
          )}
        </div>

        {/* Next */}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={onNextPage}
          disabled={!canNextPage}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next page</span>
        </Button>

        {/* Last page */}
        {onLastPage && (
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={onLastPage}
            disabled={!canNextPage}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        )}
      </div>
    </div>
  )
}