"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Link from "next/link"

export type Meeting = {
    id: string
    user: string
    email: string
    minutes: number
    date: string
    info: string
}

const data: Meeting[] = [
    { id: "1", user: "John", email: "john@example.com", minutes: 30, date: "2023-06-01", info: "Meeting details 1" },
    { id: "2", user: "Alice", email: "alice@example.com", minutes: 45, date: "2023-06-02", info: "Meeting details 2" },
    { id: "3", user: "Bob", email: "bob@example.com", minutes: 60, date: "2023-06-03", info: "Meeting details 3" },
    { id: "4", user: "Carol", email: "carol@example.com", minutes: 25, date: "2023-06-04", info: "Meeting details 4" },
    { id: "5", user: "Dave", email: "dave@example.com", minutes: 90, date: "2023-06-05", info: "Meeting details 5" },
]

const formatMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
}

export const columns: ColumnDef<Meeting>[] = [
    { id: "serial", header: "S.No", cell: ({ row }) => row.index + 1, enableSorting: false, enableHiding: false },
    { accessorKey: "user", header: "User", cell: ({ row }) => <div className="capitalize">{row.getValue("user")}</div> },
    { accessorKey: "email", header: "Email", cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div> },
    { accessorKey: "minutes", header: () => <div className="text-right">Minutes</div>, cell: ({ row }) => <div className="text-right font-medium">{formatMinutes(row.getValue("minutes"))}</div> },
    { accessorKey: "date", header: "Date", cell: ({ row }) => <div>{row.getValue("date")}</div> },
    {
        accessorKey: "info",
        header: "Info",
        cell: ({ row }) => {
            const id = row.original.id
            return (
                <Link href={`/meeting/${id}`} className="text-blue-500 cursor-pointer hover:underline">
                    View Details
                </Link>
            )
        },
    },
]

export function DataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const [filterField, setFilterField] = React.useState("email")

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        table.getColumn(filterField)?.setFilterValue(event.target.value)
    }

    const handleFilterFieldChange = (value: string) => {
        setFilterField(value)
        table.getColumn(value)?.setFilterValue("")
    }

    return (
        <div className="w-[80vw] border-b-2 max-w-4xl mx-auto py-3.5">
            <div className="flex items-center m-4">
                <Input
                    placeholder={`Filter by ${filterField}...`}
                    value={(table.getColumn(filterField)?.getFilterValue() as string) ?? ""}
                    onChange={handleFilterChange}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Filter by <ChevronDown className="ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                            checked={filterField === "email"}
                            onCheckedChange={() => handleFilterFieldChange("email")}
                        >
                            Email
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={filterField === "user"}
                            onCheckedChange={() => handleFilterFieldChange("user")}
                        >
                            User
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                            checked={filterField === "date"}
                            onCheckedChange={() => handleFilterFieldChange("date")}
                        >
                            Date
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border border-gray-300 shadow-md overflow-hidden">
                <Table>
                    <TableHeader className="text-white">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="bg-blue-900 py-3 px-4 text-left font-semibold">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row, index) => (
                                <TableRow
                                    key={row.id}
                                    className={index % 2 === 0 ? "bg-blue-100" : "bg-white hover:bg-gray-50"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-3 px-4 text-sm text-gray-600">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2 p-2 gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="mr-2"
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
