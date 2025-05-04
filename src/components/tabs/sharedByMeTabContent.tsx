import * as React from "react"
import {forwardRef, useEffect, useImperativeHandle, useState} from "react"
import {ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"
import {Input} from "@/components/ui/input.tsx"
import {PaginationHandle} from "@/types/paginationHandle.ts";
import {useListSent} from "@/hooks/useListSent.ts";
import Spinner from "@/components/spinner.tsx";
import {ShareModel} from "@/models/shareModel.ts";
import {useDownloadFile} from "@/hooks/useDownloadFile.ts";
import DownloadFilesDialog from "@/components/downloadFilesDialog.tsx";
import {format} from "date-fns";
import {tr} from "date-fns/locale";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Download} from "lucide-react";
import {useDebounce} from "@/hooks/useDebounce.ts";
import {toast} from "sonner";

type SharedByMeTabContentProps = {
    onDataReady?: () => void;
};

const SharedByMeTabContent = forwardRef<PaginationHandle, SharedByMeTabContentProps>(({ onDataReady }, ref) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const previousDebouncedRef = React.useRef<string | undefined>(undefined);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [downloadProgress, setDownloadProgress] = useState(0)

    const userNameFilter = columnFilters.find((f) => f.id === "userName")?.value as string | undefined;
    const debouncedUserName = useDebounce(userNameFilter, 500);

    const { data, isPending, isError, error, isPlaceholderData } = useListSent({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        username: debouncedUserName,
    });

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message);
        }
    }, [error]);

    useEffect(() => {
        if (
            !isPlaceholderData &&
            previousDebouncedRef.current !== debouncedUserName
        ) {
            previousDebouncedRef.current = debouncedUserName;
            setPagination((prev) => ({
                ...prev,
                pageIndex: 0,
            }));
        }
    }, [debouncedUserName, isPlaceholderData]);

    useEffect(() => {
        if (!isPlaceholderData && !isPending && onDataReady) {
            onDataReady();
        }
    }, [data, isPlaceholderData, isPending]);

    const { mutate: downloadMutate, isPending: downloadPending } = useDownloadFile();

    const [showDialog, setShowDialog] = useState(false);
    const [selectedShare, setSelectedShare] = useState<ShareModel>();

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
            accessorKey: "expireTime",
            header: "Kalan Zaman",
            cell: ({ row }) => {
                const rawDate = row.getValue("expireTime") as string;
                const targetTime = new Date(rawDate).getTime();
                const [timeLeft, setTimeLeft] = useState(targetTime - Date.now());

                React.useEffect(() => {
                    const interval = setInterval(() => {
                        setTimeLeft(targetTime - Date.now());
                    }, 1000);

                    return () => clearInterval(interval);
                }, [targetTime]);

                if (timeLeft <= 0) return <span>Süre doldu</span>;

                const seconds = Math.floor((timeLeft / 1000) % 60);
                const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
                const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

                return (
                    <span>
                        {days > 0 && `${days}g `}
                        {hours.toString().padStart(2, "0")}:
                        {minutes.toString().padStart(2, "0")}:
                        {seconds.toString().padStart(2, "0")}
                    </span>
                );
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
                    const shareFileIds = rowData.files.map((f) => f.id);

                    if (shareFileIds.length === 0) return;

                    if (shareFileIds.length === 1) {
                        downloadMutate({
                            shareFileIdList: shareFileIds,
                            onDownloadProgress: setDownloadProgress
                        });
                    } else {
                        setSelectedShare(rowData);
                        setShowDialog(true);
                    }
                };

                return (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDownloadClick}
                    >
                        {downloadPending ? (
                            <Label>{downloadProgress}%</Label>
                        ) : (
                            <Download />
                        )}
                    </Button>
                );
            }
        }
    ], [setSelectedShare, setShowDialog, downloadMutate]);

    const table = useReactTable({
        data: data?.data ?? [],
        columns,
        manualPagination: true,
        pageCount: Math.ceil((data?.totalRowCount ?? 0) / pagination.pageSize),
        state: {
            pagination,
            columnFilters,
        },
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
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
                    value={userNameFilter ?? ""}
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
                            <TableRow key={headerGroup.id}>
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

            {
                selectedShare && (
                    <DownloadFilesDialog
                        fileList={selectedShare.files}
                        showFileListModal={showDialog}
                        setShowFileListModal={setShowDialog}
                        downloadable={new Date(selectedShare.expireTime).getTime() > Date.now()}
                    />
                )
            }
        </div>
    );
});

export default SharedByMeTabContent;