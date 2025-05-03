import * as React from "react"
import {useState} from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table.tsx"
import {useDebounce} from "@/hooks/useDebounce.ts"
import {Button} from "@/components/ui/button.tsx"
import Spinner from "@/components/spinner.tsx"
import {MoreHorizontal} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {useAdminListFile} from "@/hooks/admin/useAdminListFile.ts";
import {DetailedShareModel} from "@/models/admin/detailedShareModel.ts";
import {format} from "date-fns";
import {tr} from "date-fns/locale";
import {UserModel} from "@/models/userModel.ts";
import {Input} from "@/components/ui/input.tsx";
import AdminTabDiv from "@/components/admin/adminTabCard.tsx";
import AdminDeleteShareAlertDialog from "@/components/tabs/admin/adminDeleteShareAlertDialog.tsx";
import {useDownloadFile} from "@/hooks/useDownloadFile.ts";
import DownloadFilesDialog from "@/components/downloadFilesDialog.tsx";
import AdminDownloadFilesDialog from "@/components/admin/adminDownloadFilesDialog.tsx";

function FileListTabContent() {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });

    const previousSenderDebouncedRef = React.useRef<string | undefined>(undefined);
    const previousReceiverDebouncedRef = React.useRef<string | undefined>(undefined);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
    const [selectedShare, setSelectedShare] = useState<DetailedShareModel | null>(null);

    const senderUsernameFilter = columnFilters.find((f) => f.id === "sender")?.value as string | undefined;
    const debouncedSenderUserName = useDebounce(senderUsernameFilter, 500);

    const receiverUsernameFilter = columnFilters.find((f) => f.id === "recipient")?.value as string | undefined;
    const debouncedReceiverUserName = useDebounce(receiverUsernameFilter, 500);

    const { data, isPending, isError, error, isPlaceholderData } = useAdminListFile({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        senderUsername: debouncedSenderUserName,
        receiverUsername: debouncedReceiverUserName
    });
    const { mutate: downloadMutate, isPending: isDownloadPending } = useDownloadFile();

    React.useEffect(() => {
        if (
            !isPlaceholderData &&
            previousSenderDebouncedRef.current !== debouncedSenderUserName &&
            previousReceiverDebouncedRef.current !== debouncedReceiverUserName
        ) {
            previousSenderDebouncedRef.current = debouncedSenderUserName;
            previousReceiverDebouncedRef.current = debouncedReceiverUserName;
            setPagination((prev) => ({
                ...prev,
                pageIndex: 0,
            }));
        }
    }, [debouncedSenderUserName, debouncedReceiverUserName, isPlaceholderData]);

    const columns = React.useMemo<ColumnDef<DetailedShareModel>[]>(() => [
        {
            accessorKey: "sender",
            header: "Gönderen",
            cell: ({ row }) => {
                const user: UserModel = row.getValue("sender");
                return (
                    <div className="font-medium">{user.displayName}</div>
                )
            },
        },
        {
            accessorKey: "recipient",
            header: "Alan",
            cell: ({ row }) => {
                const user: UserModel = row.getValue("recipient");
                return (
                    <div className="font-medium">{user.displayName}</div>
                )
            },
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
            enableHiding: false,
            cell: ({ row }) => {
                const rowData = row.original;

                const handleDownloadAllClick = () => {
                    const shareFileIds = rowData.files.map((f) => f.id);

                    downloadMutate({
                        shareFileIdList: shareFileIds,
                    });
                };

                const isExpired = new Date(rowData.expireTime).getTime() <= Date.now();

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
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
        pageCount: Math.ceil((data?.totalRowCount ?? 0) / pagination.pageSize),
        state: {
            pagination,
            columnFilters,
        },
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isPending) {
        return (
            <div className="flex items-center justify-center h-full">
                <Spinner color={"#ff00ff"} />
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
        <AdminTabDiv>
            <div className="pb-2 gap-2 flex flex-col md:flex-row">
                <Input
                    placeholder="Gönderene göre filtrele..."
                    value={senderUsernameFilter ?? ""}
                    onChange={(event) =>
                        table.getColumn("sender")?.setFilterValue(event.target.value)
                    }
                    className="w-full"
                />
                <Input
                    placeholder="Alana göre filtrele..."
                    value={receiverUsernameFilter ?? ""}
                    onChange={(event) =>
                        table.getColumn("recipient")?.setFilterValue(event.target.value)
                    }
                    className="w-full"
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
        </AdminTabDiv>
    );
}

export default FileListTabContent;