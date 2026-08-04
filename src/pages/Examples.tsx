import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { DataPagination } from "@/components/ui/data-pagination"
import { toast } from "sonner"

// ======================
// FORM
// ======================
const exampleFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  email: z.string().email("Enter a valid email"),
  amount: z.string().min(1, "Amount is required"),
  status: z.enum(["pending", "active", "completed"]),
})

type ExampleFormValues = z.infer<typeof exampleFormSchema>

// ======================
// TABLE DATA
// ======================
type ExampleRow = {
  id: string
  title: string
  email: string
  amount: string
  status: "pending" | "active" | "completed"
}

const initialRows: ExampleRow[] = [
  {
    id: "1",
    title: "Website Redesign",
    email: "design@example.com",
    amount: "$2,400",
    status: "active",
  },
  {
    id: "2",
    title: "API Integration",
    email: "dev@example.com",
    amount: "$1,800",
    status: "pending",
  },
  {
    id: "3",
    title: "Mobile App",
    email: "mobile@example.com",
    amount: "$5,200",
    status: "completed",
  },
  {
    id: "4",
    title: "Marketing Campaign",
    email: "marketing@example.com",
    amount: "$950",
    status: "active",
  },
]

const statusVariant = {
  pending: "secondary",
  active: "default",
  completed: "outline",
} as const

export default function Examples() {
  const [rows, setRows] = useState<ExampleRow[]>(initialRows)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const form = useForm<ExampleFormValues>({
    resolver: zodResolver(exampleFormSchema),
    defaultValues: {
      title: "",
      email: "",
      amount: "",
      status: "pending",
    },
  })

  const onSubmit = (values: ExampleFormValues) => {
    const newRow: ExampleRow = {
      id: Date.now().toString(),
      title: values.title,
      email: values.email,
      amount: values.amount.startsWith("$")
        ? values.amount
        : `$${values.amount}`,
      status: values.status,
    }

    setRows([newRow, ...rows])
    form.reset()
    toast.success("Item added to table")
  }

  const columns: ColumnDef<ExampleRow>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.title}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.email}</span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={statusVariant[row.original.status]}>
          {row.original.status}
        </Badge>
      ),
    },
  ]

  const table = useReactTable({
    data: rows,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Examples</h1>
        <p className="text-muted-foreground">
          Example form + table pattern you can copy in your projects.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* FORM */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Example Form</CardTitle>
            <CardDescription>
              Validated form using React Hook Form + Zod.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input placeholder="Project name" {...form.register("title")} />
                  <FieldError>
                    {form.formState.errors.title?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...form.register("email")}
                  />
                  <FieldError>
                    {form.formState.errors.email?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel>Amount</FieldLabel>
                  <Input placeholder="2400" {...form.register("amount")} />
                  <FieldError>
                    {form.formState.errors.amount?.message}
                  </FieldError>
                </Field>

                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Input
                    placeholder="pending | active | completed"
                    {...form.register("status")}
                  />
                  <FieldError>
                    {form.formState.errors.status?.message}
                  </FieldError>
                </Field>
              </FieldGroup>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit">Add to Table</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Example Table</CardTitle>
            <CardDescription>
              Table with search + pagination.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="max-w-sm"
            />

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No items yet. Add one from the form.
                      </TableCell>
                    </TableRow>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
            <DataPagination
              className="p-4"
              pageIndex={table.getState().pagination.pageIndex}
              pageCount={table.getPageCount()}
              canPreviousPage={table.getCanPreviousPage()}
              canNextPage={table.getCanNextPage()}
              totalItems={table.getFilteredRowModel().rows.length}
              pageSize={table.getState().pagination.pageSize}
              onPageChange={(page) => table.setPageIndex(page)}
              onPreviousPage={() => table.previousPage()}
              onNextPage={() => table.nextPage()}
              onFirstPage={() => table.setPageIndex(0)}
              onLastPage={() => table.setPageIndex(table.getPageCount() - 1)}
            />
        </Card>
      </div>
    </div>
  )
}