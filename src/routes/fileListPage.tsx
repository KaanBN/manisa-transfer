import * as React from "react";
import {useEffect, useState} from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table";
import {DetailedShareModel} from "@/models/admin/detailedShareModel.ts";
import {useDebounce} from "@/hooks/useDebounce.ts";
import {useAdminListFile} from "@/hooks/admin/useAdminListFile.ts";
import {UserModel} from "@/models/userModel.ts";
import {format} from "date-fns";
import {tr} from "date-fns/locale";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal} from "lucide-react";
import Spinner from "@/components/spinner.tsx";
import AdminTabDiv from "@/components/admin/adminTabCard.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import AdminDeleteShareAlertDialog from "@/components/tabs/admin/adminDeleteShareAlertDialog.tsx";
import AdminDownloadFilesDialog from "@/components/admin/adminDownloadFilesDialog.tsx";
import {toast} from "sonner";
import {useDownloadShare} from "@/hooks/useDownloadShare.ts";
import {MonthYearRangePicker} from "@/components/monthYearDatePicker.tsx";
import {TextColumnFilter} from "@/components/textColumnFilter.tsx";
import TwoFactorDialog from "@/components/twoFactorDialog.tsx";

const FileListPage = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
    const [selectedShare, setSelectedShare] = useState<DetailedShareModel | null>(null);
    const [showTwoFaDialog, setShowTwoFaDialog] = useState(false);
    const [selectedShareId, setSelectedShareId] = useState<number>()

    const senderUsernameFilter = columnFilters.find((f) => f.id === "sender")?.value as string | undefined;
    const debouncedSenderUserName = useDebounce(senderUsernameFilter, 500);

    const receiverUsernameFilter = columnFilters.find((f) => f.id === "recipient")?.value as string | undefined;
    const debouncedReceiverUserName = useDebounce(receiverUsernameFilter, 500);

    const titleFilter = columnFilters.find((f) => f.id === "title")?.value as string | undefined;
    const debouncedTitle = useDebounce(titleFilter, 500);

    const uploadTimeFilter = columnFilters.find((f) => f.id === "uploadTime")?.value as {
        from: string;
        to: string;
    } | undefined;
    const debouncedUploadTime = useDebounce(uploadTimeFilter, 100);

    const sortBy = sorting[0]?.id;
    const sortOrder = sorting[0]?.desc ? "desc" : "asc";

    const {data, isPending, isError, error} = useAdminListFile({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        fromTime: debouncedUploadTime?.from,
        toTime: debouncedUploadTime?.to,
        title: debouncedTitle?.trim() ? debouncedTitle : undefined,
        senderUsername: debouncedSenderUserName,
        receiverUsername: debouncedReceiverUserName,
        sortBy: sortBy,
        sortOrder: sortOrder,
    });
    const { mutate: downloadShareMutate } = useDownloadShare();

    useEffect(() => {
        if (isError && error) {
            toast.error(error.message);
        }
    }, [isError]);

    const columns = React.useMemo<ColumnDef<DetailedShareModel>[]>(() => [
        {
            accessorKey: "sender",
            header: ({}) => (
                <TextColumnFilter
                    columnId="sender"
                    label="Gönderen"
                    value={senderUsernameFilter}
                    onChange={(val) =>
                        setColumnFilters((prev) => {
                            const others = prev.filter((f) => f.id !== "sender");
                            return [...others, { id: "sender", value: val }];
                        })
                    }
                />
            ),
            cell: ({row}) => {
                const user: UserModel = row.getValue("sender");
                return (
                    <div className="font-medium">{user.displayName}</div>
                )
            },
        },
        {
            accessorKey: "recipient",
            header: ({}) => (
                <TextColumnFilter
                    columnId="recipient"
                    label="Alan"
                    value={receiverUsernameFilter}
                    onChange={(val) =>
                        setColumnFilters((prev) => {
                            const others = prev.filter((f) => f.id !== "recipient");
                            return [...others, { id: "recipient", value: val }];
                        })
                    }
                />
            ),
            cell: ({row}) => {
                const user: UserModel = row.getValue("recipient");
                return (
                    <div className="font-medium">{user.displayName}</div>
                )
            },
        },
        {
            accessorKey: "title",
            header: ({column}) => (
                <TextColumnFilter
                    columnId="title"
                    label="Başlık"
                    value={titleFilter}
                    onChange={(val) => {
                        const others = columnFilters.filter(f => f.id !== "title");
                        setColumnFilters([...others, { id: "title", value: val }]);
                    }}
                    sortDirection={column.getIsSorted()}
                    onSortChange={() => {
                        column.toggleSorting();
                    }}
                />
            ),
            cell: ({row}) => {
                return (
                    <div className="font-medium">{row.getValue("title")}</div>
                )
            },
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
            enableHiding: false,
            cell: ({row}) => {
                const rowData = row.original;

                const handleDownloadAllClick = () => {
                    setSelectedShareId(rowData.id)
                    setShowTwoFaDialog(true);
                };

                const isExpired = new Date(rowData.expireTime).getTime() <= Date.now();

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => {
                                    setDownloadDialogOpen(true);
                                    setSelectedShare(rowData);
                                }}
                            >
                                Dosyaları Gör
                            </DropdownMenuItem>
                            {
                                rowData.recipient.id == -99 && (
                                    <DropdownMenuItem
                                        onClick={() => {
                                            navigator.clipboard.writeText(rowData.downloadLink);
                                            toast.message(
                                                <a href={rowData.downloadLink} target="_blank" rel="noopener noreferrer" className="underline">
                                                    {rowData.downloadLink}
                                                </a>
                                            );
                                        }}
                                    >
                                        İndirme Linkini kopyala
                                    </DropdownMenuItem>
                                )
                            }
                            <DropdownMenuItem
                                disabled={isExpired}
                                onClick={() => handleDownloadAllClick()}
                            >
                                İndir
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem
                                variant={"destructive"}
                                onClick={() => {
                                    setSelectedShare(rowData);
                                    setDeleteDialogOpen(true);
                                }}
                            >
                                Sil
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ], []);

    const table = useReactTable<DetailedShareModel>({
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

    if (isPending) {
        return (
            <AdminTabDiv>
                <div className="flex items-center justify-center h-full">
                    <Spinner color={"#ff00ff"}/>
                    <span className={"ml-2"}>Yükleniyor...</span>
                </div>
            </AdminTabDiv>
        );
    }

    if (isError) {
        return (
            <AdminTabDiv>
                <div className="text-center text-red-500 mt-4">
                    Bir hata oluştu: {error?.message}
                </div>
            </AdminTabDiv>
        );
    }

    return (
        <>
            {selectedShare && (
                <>
                    <AdminDeleteShareAlertDialog
                        open={deleteDialogOpen}
                        onClose={() => {
                            setDeleteDialogOpen(false);
                        }}
                        selectedShareId={selectedShare.id}
                    />
                    <AdminDownloadFilesDialog
                        fileList={selectedShare.files}
                        showFileListModal={downloadDialogOpen}
                        setShowFileListModal={setDownloadDialogOpen}
                        downloadable={new Date(selectedShare.expireTime).getTime() > Date.now()}
                    />
                </>
            )}
            {
                showTwoFaDialog && (
                    <TwoFactorDialog
                        open={showTwoFaDialog}
                        onSuccess={(token: string) => {
                            downloadShareMutate({
                                twoFaCode: token,
                                shareId: selectedShareId!
                            });
                            setShowTwoFaDialog(false);
                        }}
                        onCancel={() => setShowTwoFaDialog(false)}
                    />

                )
            }
            <AdminTabDiv>
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

                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Geri
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        İleri
                    </Button>
                </div>
            </AdminTabDiv>
        </>
    );
}

export default FileListPage;