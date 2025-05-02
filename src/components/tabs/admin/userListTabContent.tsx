import * as React from "react"
import {forwardRef, useImperativeHandle, useState} from "react"
import {ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, useReactTable,} from "@tanstack/react-table"

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx"
import {Input} from "@/components/ui/input.tsx"
import {PaginationHandle} from "@/types/paginationHandle.ts";
import {useListSent} from "@/hooks/useListSent.ts";
import Spinner from "@/components/spinner.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Download} from "lucide-react";
import {useDebounce} from "@/hooks/useDebounce.ts";
import {UserModel} from "@/models/userModel.ts";
import {useListUser} from "@/hooks/useListUser.ts";

type UserListTabContentProps = {
    onDataReady?: () => void;
};

const UserListTabContent = forwardRef<PaginationHandle, UserListTabContentProps>(({ onDataReady }, ref) => {
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const previousDebouncedRef = React.useRef<string | undefined>(undefined);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const userNameFilter = columnFilters.find((f) => f.id === "userName")?.value as string | undefined;
    const debouncedUserName = useDebounce(userNameFilter, 500);

    const { data, isPending, isError, error, isPlaceholderData } = useListUser({
        name: debouncedUserName,
    });

    React.useEffect(() => {
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

    React.useEffect(() => {
        if (!isPlaceholderData && !isPending && onDataReady) {
            onDataReady();
        }
    }, [data, isPlaceholderData, isPending]);

    const columns = React.useMemo<ColumnDef<UserModel>[]>(() => [
        {
            accessorKey: "userName",
            header: "Gönderilen",
            cell: ({ row }) => <div className="font-medium">{row.getValue("userName")}</div>,
        },
        {
            id: "actions",
            header: "",
            cell: ({ row }) => {
                const rowData = row.original;

                return (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {}}
                    >
                        {rowData.id}
                        <Download />
                    </Button>
                );
            }
        }
    ], []);

    const table = useReactTable<UserModel>({
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
        </div>
    );
});

export default UserListTabContent;