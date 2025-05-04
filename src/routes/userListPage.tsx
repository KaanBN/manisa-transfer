import {useEffect, useState} from "react";
import {DetailedUserModel} from "@/models/admin/detailedUserModel.ts";
import {ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import * as React from "react";
import {useDebounce} from "@/hooks/useDebounce.ts";
import {useAdminListUser} from "@/hooks/admin/useAdminListUser.ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MoreHorizontal, UserPlus} from "lucide-react";
import Spinner from "@/components/spinner.tsx";
import AdminTabDiv from "@/components/admin/adminTabCard.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import UpdateUserDialog from "@/components/admin/updateUserDialog.tsx";
import {toast} from "sonner";
import NewUserDialog from "@/components/admin/newUserDialog.tsx";

const UserListPage = () => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<DetailedUserModel | null>(null);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const handleUpdateUser = (user: DetailedUserModel) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const previousDebouncedRef = React.useRef<string | undefined>(undefined);

    const userNameFilter = columnFilters.find((f) => f.id === "userName")?.value as string | undefined;
    const debouncedUserName = useDebounce(userNameFilter, 500);

    const { data, isPending, isError, error, isPlaceholderData } = useAdminListUser({
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

    const columns = React.useMemo<ColumnDef<DetailedUserModel>[]>(() => [
        {
            accessorKey: "displayName",
            header: "Görünen Ad",
            cell: ({ row }) => <div className="font-medium">{row.getValue("displayName")}</div>,
        },
        {
            accessorKey: "userName",
            header: "Kullanıcı Adı",
            cell: ({ row }) => <div className="font-medium">{row.getValue("userName")}</div>,
        },
        {
            accessorKey: "maxUploadSize",
            header: "Max Yükleme Kapasitesi",
            cell: ({ row }) => <div className="font-medium">{row.getValue("maxUploadSize")} bayt</div>,
        },
        {
            accessorKey: "role",
            header: "Rol",
            cell: ({ row }) => {
                const encodedRole = row.getValue("role");
                var role = "";
                switch (encodedRole) {
                    case 1:
                        role = "Admin";
                        break;
                    default:
                        role = "Kullanıcı";
                        break;
                }
                return (<div className="font-medium">{role}</div>);
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => handleUpdateUser(user)}
                            >
                                Kullanıcıyı Güncelle
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], []);

    const table = useReactTable<DetailedUserModel>({
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
            <AdminTabDiv>
                <div className="flex items-center justify-center h-full">
                    <Spinner color={"#ff00ff"} />
                    <span className={"ml-2"}>Yükleniyor...</span>
                </div>
            </AdminTabDiv>
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
            <div className={"flex flex-col sm:flex-row w-full justify-between"}>
                <Input
                    placeholder="Kullanıcı adına göre filtrele..."
                    value={userNameFilter ?? ""}
                    onChange={(event) =>
                        table.getColumn("userName")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <Button onClick={()=>{setNewUserDialogOpen(true)}}>
                    <UserPlus/>
                    Yeni Kullanıcı
                </Button>
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

            {selectedUser && (
                <UpdateUserDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    selectedUser={selectedUser}
                />
            )}

            <NewUserDialog
                open={newUserDialogOpen}
                onClose={() => setNewUserDialogOpen(false)}
            />
        </AdminTabDiv>
    );
}

export default UserListPage;