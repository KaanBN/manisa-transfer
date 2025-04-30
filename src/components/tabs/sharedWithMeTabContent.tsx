import * as React from "react"
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    flexRender,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import {forwardRef, useImperativeHandle} from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {Download} from "lucide-react";
import {PaginationHandle} from "@/types/paginationHandle.ts";
import {SharedFile} from "@/models/sharedFileModel.ts";
import {useListReceived} from "@/hooks/useListReceived.ts";
import Spinner from "@/components/spinner.tsx";

const columns: ColumnDef<SharedFile>[] = [
    {
        accessorKey: "userName",
        header: "Gönderen",
        cell: ({ row }) => <div className="font-medium">{row.getValue("userName")}</div>,
    },
    {
        accessorKey: "title",
        header: "Başlık",
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
        accessorKey: "uploadTimes",
        header: "Gönderim Zamanı",
        cell: ({ row }) => {
            const rawDate = row.getValue("uploadTime") as string;
            const formatted = format(new Date(rawDate), "d MMMM yyyy, HH:mm", {
                locale: tr,
            });
            return <div>{formatted}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Durum",
        cell: ({ row }) =>{
            const status = row.getValue("status") as string;
            const statusClass = status === "waiting" ? "text-yellow-500" : status === "downloaded" ? "text-green-500" : "text-red-500";
            const translatedStatus = status === "waiting" ? "Beklemede" : status === "downloaded" ? "İndirildi" : "İndirilmedi";
            return <div className={`font-medium ${statusClass}`}>{translatedStatus}</div>;
        },
    },
    {
        id: "actions",
        header: "",
        cell: ({ row }) => {
            const rowData = row.original;

            const handleDownload = () => {
                console.log(`"${rowData.title}" adlı dosya indiriliyor...`);
            };

            return (
                <Button variant={"ghost"} size="sm" onClick={handleDownload}>
                    <Download />
                </Button>
            );
        },
    }
]

const SharedWithMeTabContent = forwardRef<PaginationHandle>((_, ref) => {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const { data, isPending, isError, error } = useListReceived();

    const table = useReactTable({
        data: data?.data ?? [],
        columns,
        filterFns: {},
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    useImperativeHandle(ref, () => ({
        previousPage: () => table.previousPage(),
        nextPage: () => table.nextPage(),
        getCanNextPage: () => table.getCanNextPage(),
        getCanPreviousPage: () => table.getCanPreviousPage(),
    }));

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-full">
                <Spinner color={"#ff00ff"}/>
                <span className={"ml-2"}>Yükleniyor...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 mt-4">
                Bir hata oluştu: {error?.message}
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="py-4">
                <Input
                    placeholder="Gönderene göre filtrele..."
                    value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("userName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="flex-1 overflow-y-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                className={"hover:bg-muted bg-muted"}
                                key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={table.getAllColumns().length} className="text-center h-24">
                                    Sonuç bulunamadı.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
});

export default SharedWithMeTabContent;
