import * as React from "react"
import {forwardRef, useEffect, useImperativeHandle, useState} from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"
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
import {ArrowDown, ArrowUp, ArrowUpDown, Download} from "lucide-react";
import {useDebounce} from "@/hooks/useDebounce.ts";
import {toast} from "sonner";
import {TextColumnFilter} from "@/components/textColumnFilter.tsx";
import {MonthYearRangePicker} from "@/components/monthYearDatePicker.tsx";
import TwoFactorDialog from "@/components/twoFactorDialog.tsx";

type SharedByMeTabContentProps = {
    onDataReady?: () => void;
};

const SharedByMeTabContent = forwardRef<PaginationHandle, SharedByMeTabContentProps>(({onDataReady}, ref) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const previousDebouncedRef = React.useRef<string | undefined>(undefined);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [singleDownloadFileIds, setSingleDownloadFileIds] = useState<string[]>([]);
    const [showDownloadDialog, setShowDownloadDialog] = useState(false);
    const [showTwoFaDialog, setShowTwoFaDialog] = useState(false);
    const [selectedShare, setSelectedShare] = useState<ShareModel>();


    const userNameFilter = columnFilters.find((f) => f.id === "userName")?.value as string | undefined;
    const debouncedUserName = useDebounce(userNameFilter, 500);

    const titleFilter = columnFilters.find((f) => f.id === "title")?.value as string | undefined;
    const debouncedTitle = useDebounce(titleFilter, 500);

    const uploadTimeFilter = columnFilters.find((f) => f.id === "uploadTime")?.value as {
        from: string;
        to: string;
    } | undefined;
    const debouncedUploadTime = useDebounce(uploadTimeFilter, 100);

    const sortBy = sorting[0]?.id;
    const sortOrder = sorting[0]?.desc ? "desc" : "asc";

    const {data, isPending, isError, error, isPlaceholderData} = useListSent({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        fromTime: debouncedUploadTime?.from,
        toTime: debouncedUploadTime?.to,
        title: debouncedTitle?.trim() ? debouncedTitle : undefined,
        username: debouncedUserName?.trim() ? debouncedUserName : undefined,
        sortBy: sortBy,
        sortOrder: sortOrder,
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

    const {mutate: downloadMutate, isPending: downloadPending} = useDownloadFile();

    const columns = React.useMemo<ColumnDef<ShareModel>[]>(() => [
        {
            accessorKey: "userName",
            header: ({}) => (
                <TextColumnFilter
                    columnId="userName"
                    label="Alan"
                    value={userNameFilter}
                    onChange={(val) =>
                        setColumnFilters((prev) => {
                            const others = prev.filter((f) => f.id !== "userName");
                            return [...others, { id: "userName", value: val }];
                        })
                    }
                />
            ),            cell: ({row}) => <div className="font-medium">{row.getValue("userName")}</div>,
        },
        {
            accessorKey: "title",
            header: ({}) => (
                <TextColumnFilter
                    columnId="title"
                    label="Başlık"
                    value={titleFilter}
                    onChange={(val) =>
                        setColumnFilters((prev) => {
                            const others = prev.filter((f) => f.id !== "title");
                            return [...others, { id: "title", value: val }];
                        })
                    }
                />
            ),
            cell: ({row}) => <div>{row.getValue("title")}</div>,
        },
        {
            accessorKey: "uploadTime",
            header: ({column}) => {
                return (
                    <MonthYearRangePicker
                        onCallback={(dateRange)=>{
                            table.getColumn("uploadTime")?.setFilterValue(dateRange)
                        }}
                        sortDirection={column.getIsSorted()}
                        onSortChange={() => {
                            column.toggleSorting();
                        }}
                    />

                )
            },
            cell: ({row}) => {
                const rawDate = row.getValue("uploadTime") as string;
                const formatted = format(new Date(rawDate), "d MMMM yyyy, HH:mm", {
                    locale: tr,
                });
                return <div>{formatted}</div>;
            },
        },
        {
            accessorKey: "expireTime",
            enableSorting: true,
            header: ({ column }) => {
                const sort = column.getIsSorted();
                return (
                    <Button
                        variant="ghost"
                        className="p-0 flex items-center gap-1"
                        onClick={() => column.toggleSorting()}
                    >
                        Kalan Zaman
                        {sort === "asc" && <ArrowUp className="w-4 h-4" />}
                        {sort === "desc" && <ArrowDown className="w-4 h-4" />}
                        {!sort &&  <ArrowUpDown className="w-4 h-4" />}
                    </Button>
                );
            },
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
            enableSorting: true,
            header: ({ column }) => {
                const sort = column.getIsSorted();
                return (
                    <Button
                        variant="ghost"
                        className="p-0 flex items-center gap-1"
                        onClick={() => column.toggleSorting()}
                    >
                        Durum
                        {sort === "asc" && <ArrowUp className="w-4 h-4" />}
                        {sort === "desc" && <ArrowDown className="w-4 h-4" />}
                        {!sort &&  <ArrowUpDown className="w-4 h-4" />}
                    </Button>
                );
            },
            cell: ({row}) => {
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
            cell: ({row}) => {
                const rowData = row.original;

                const handleDownloadClick = () => {
                    const shareFileIds = rowData.files.map((f) => f.id);

                    if (shareFileIds.length === 0) return;

                    if (shareFileIds.length === 1) {
                        setSingleDownloadFileIds(shareFileIds);
                        setShowTwoFaDialog(true);
                    } else {
                        setSelectedShare(rowData);
                        setShowDownloadDialog(true);
                    }
                };

                const isExpired = new Date(rowData.expireTime).getTime() < Date.now()

                return (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDownloadClick}
                        disabled={downloadPending || isExpired}
                    >
                        {downloadPending ? (
                            <Label>{downloadProgress}%</Label>
                        ) : (
                            <Download/>
                        )}
                    </Button>
                );
            }
        }
    ], [setSelectedShare, setShowDownloadDialog, downloadMutate]);

    const table = useReactTable({
        data: data?.data ?? [],
        columns,
        manualPagination: true,
        manualFiltering: true,
        manualSorting: true,
        pageCount: Math.ceil((data?.totalRowCount ?? 0) / pagination.pageSize),
        state: {
            pagination,
            columnFilters,
            sorting,
        },
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
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
        <>
            {
                showTwoFaDialog && (
                    <TwoFactorDialog
                        open={showTwoFaDialog}
                        onSuccess={(token: string) => {
                            downloadMutate({
                                twoFaCode: token,
                                shareFileIdList: singleDownloadFileIds,
                                onDownloadProgress: setDownloadProgress,
                            });
                            setShowTwoFaDialog(false);
                        }}
                        onCancel={() => setShowTwoFaDialog(false)}
                    />

                )
            }
            {
                selectedShare && (
                    <DownloadFilesDialog
                        fileList={selectedShare.files}
                        showFileListModal={showDownloadDialog}
                        setShowFileListModal={setShowDownloadDialog}
                        downloadable={new Date(selectedShare.expireTime).getTime() > Date.now()}
                    />
                )
            }
            <div className="w-full h-full flex flex-col">
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
            </div>
        </>
    );
});

export default SharedByMeTabContent;