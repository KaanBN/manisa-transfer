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
import {forwardRef, useImperativeHandle} from "react";
import { SharedFile } from "@/types/sharedFile";
import {Button} from "@/components/ui/button.tsx";
import {format} from "date-fns";
import {tr} from "date-fns/locale";
import {Download} from "lucide-react";
import {PaginationHandle} from "@/types/paginationHandle.ts";

const data: SharedFile[] = [
    {
        "to": "Ahmet Yılmaz",
        "title": "2022 Yılı Mali Hizmetler Müdürlüğü Faaliyet Raporu",
        "date": "2022-04-10T02:21:48-03:00",
        "status": "not downloaded"
    },
    {
        "to": "Ayşe Demir",
        "title": "Şehir İmar Planı Revizyonu Hakkında Bilgilendirme",
        "date": "2021-05-29T06:35:17-03:00",
        "status": "not downloaded"
    },
    {
        "to": "Mehmet Kaya",
        "title": "Sosyal Yardım Başvuruları 2020 Yılı Değerlendirme Raporu",
        "date": "2020-02-19T01:01:34-03:00",
        "status": "downloaded"
    },
    {
        "to": "Fatma Şahin",
        "title": "Park ve Bahçeler Müdürlüğü Ağaçlandırma Projesi Sonuçları",
        "date": "2023-08-10T11:57:37-03:00",
        "status": "downloaded"
    },
    {
        "to": "Emre Çelik",
        "title": "Çevre Temizlik Çalışmaları Yıllık Raporu",
        "date": "2023-06-06T03:37:00-03:00",
        "status": "downloaded"
    },
    {
        "to": "Zeynep Aydın",
        "title": "Yaz Dönemi Kültür ve Sanat Etkinlik Programı",
        "date": "2022-11-28T01:27:07-03:00",
        "status": "downloaded"
    },
    {
        "to": "Burak Koç",
        "title": "İlçe Geneli Asfalt Yenileme Çalışmaları Planı",
        "date": "2020-12-25T02:32:09-03:00",
        "status": "downloaded"
    },
    {
        "to": "Elif Özkan",
        "title": "Yeni Hizmete Açılan Sosyal Tesisler Listesi",
        "date": "2022-03-16T12:22:52-03:00",
        "status": "not downloaded"
    },
    {
        "to": "Mustafa Arslan",
        "title": "2024 Kış Mevsimi Karla Mücadele Eylem Planı",
        "date": "2024-11-06T07:45:54-03:00",
        "status": "downloaded"
    },
    {
        "to": "Selin Yıldız",
        "title": "2022 Yılı İç Denetim Faaliyet Raporu",
        "date": "2022-07-12T04:01:36-03:00",
        "status": "not downloaded"
    }
];

const columns: ColumnDef<SharedFile>[] = [
    {
        accessorKey: "to",
        header: "Gönderilen",
        cell: ({ row }) => <div className="font-medium">{row.getValue("to")}</div>,
    },
    {
        accessorKey: "title",
        header: "Başlık",
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
        accessorKey: "date",
        header: "Gönderim Zamanı",
        cell: ({ row }) => {
            const rawDate = row.getValue("date") as string;
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

const SharedByMeTabContent = forwardRef<PaginationHandle>((_, ref) => {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
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

    return (
        <div className="w-full h-full flex flex-col">
            <div className="py-4">
                <Input
                    placeholder="Gönderilene göre filtrele..."
                    value={(table.getColumn("to")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("to")?.setFilterValue(event.target.value)
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
    )
});

export default SharedByMeTabContent
