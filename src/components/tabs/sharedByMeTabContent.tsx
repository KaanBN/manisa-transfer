import * as React from "react"
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    flexRender, ColumnFiltersState, getFilteredRowModel,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx"
import { Input } from "@/components/ui/input.tsx"
import {forwardRef, useImperativeHandle, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Download} from "lucide-react";
import {PaginationHandle} from "@/types/paginationHandle.ts";
import {useListSent} from "@/hooks/useListSent.ts";
import Spinner from "@/components/spinner.tsx";
import {format} from "date-fns";
import {tr} from "date-fns/locale";
import {ShareModel} from "@/models/shareModel.ts";
import {useDownloadFile} from "@/hooks/useDownloadFile.ts";
import {ShareFileModel} from "@/models/shareFileModel.ts";
import DownloadFilesDialog from "@/components/downloadFilesDialog.tsx";
import {Label} from "@/components/ui/label.tsx";

const SharedByMeTabContent = forwardRef<PaginationHandle>((_, ref) => {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const { data, isPending, isError, error } = useListSent();
    const { mutate: downloadMutate, isPending: downloadPending } = useDownloadFile();

    const [showDialog, setShowDialog] = React.useState(false);
    const [selectedFiles, setSelectedFiles] = React.useState<ShareFileModel[]>([]);
    const [downloadProgress, setDownloadProgress] = useState<number>(0);


    const columns = React.useMemo<ColumnDef<ShareModel>[]>(() => [
        {
            accessorKey: "userName",
            header: "Gönderilen",
            cell: ({ row }) => <div className="font-medium">{row.getValue("userName")}</div>,
        },
        {
            accessorKey: "title",
            header: "Başlık",
            cell: ({ row }) => <div>{row.getValue("title")}</div>,
        },
        {
            accessorKey: "uploadTime",
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
                const status = row.getValue("status");

                let translatedStatus;
                let statusClass;

                switch (status) {
                    case 2:
                        translatedStatus = "Kısmi";
                        statusClass = "text-yellow-500";
                        break;
                    case 1:
                        translatedStatus = "İndirildi";
                        statusClass = "text-green-500";
                        break;
                    default:
                        translatedStatus = "İndirilmedi";
                        statusClass = "text-red-500";
                }

                return <div className={`font-medium ${statusClass}`}>{translatedStatus}</div>;
            },
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => {
                const rowData = row.original;

                const handleDownloadClick = () => {
                    const shareIds = rowData.files.map((f) => f.id);

                    if (shareIds.length === 0) return;

                    if (shareIds.length === 1) {
                        downloadMutate({
                            shareFileIdList: shareIds,
                            onDownloadProgress: setDownloadProgress
                        });
                    } else {
                        setSelectedFiles(rowData.files);
                        setShowDialog(true);
                    }
                };

                return (
                    <Button variant="ghost" size="sm" onClick={handleDownloadClick}>
                        {
                            downloadPending ? (<Label>{downloadProgress}%</Label>) : (<Download />)
                        }
                    </Button>
                );
            },
        }
    ], [setSelectedFiles, setShowDialog, downloadMutate]);

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
                    placeholder="Gönderilene göre filtrele..."
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

            <DownloadFilesDialog
                fileList={selectedFiles}
                showFileListModal={showDialog}
                setShowFileListModal={setShowDialog}
            />
        </div>
    )
});

export default SharedByMeTabContent
