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
import {IncomingFile} from "@/types/incomingFile.ts";
import {PaginationHandle} from "@/types/paginationHandle.ts";

const data: IncomingFile[] = [
        {
            "from": "İbrahim Şimşek",
            "title": "2025 Yılı Stratejik Plan Taslağı",
            "date": "2024-12-24T01:25:00.000-03:00",
            "status": "not downloaded"
        },
        {
            "from": "Gamze Polat",
            "title": "İlçe Genelinde Yeşil Alan Artırımı Raporu",
            "date": "2019-02-08T01:29:12.000-03:00",
            "status": "not downloaded"
        },
        {
            "from": "Hakan Koşar",
            "title": "Sosyal Hizmetler Müdürlüğü 2015 Yılı Değerlendirme",
            "date": "2015-02-27T05:40:34.000-02:00",
            "status": "downloaded"
        },
        {
            "from": "Merve Tunç",
            "title": "İç Kontrol Süreçleri Geliştirme Planı",
            "date": "2015-09-11T01:23:00.000-03:00",
            "status": "downloaded"
        },
        {
            "from": "Kenan Sarı",
            "title": "2021 Yılı Afet Yönetimi Hazırlık Programı",
            "date": "2021-08-17T05:58:29.000-03:00",
            "status": "not downloaded"
        },
        {
            "from": "Seda Bayraktar",
            "title": "İlçe Genelinde Atık Yönetimi Uygulamaları",
            "date": "2019-06-02T03:25:50.000-03:00",
            "status": "not downloaded"
        },
        {
            "from": "Okan Erdem",
            "title": "Zabıta Müdürlüğü 2020 Yılı Faaliyet Raporu",
            "date": "2020-08-03T03:24:01.000-03:00",
            "status": "downloaded"
        },
        {
            "from": "Aylin Keskin",
            "title": "Belediye Bilgi İşlem Altyapı Güncellemesi",
            "date": "2021-06-16T07:26:52.000-03:00",
            "status": "downloaded"
        },
        {
            "from": "Yusuf Güneş",
            "title": "Emlak ve İstimlak Müdürlüğü İhale Dosyası",
            "date": "2023-01-24T04:17:09.000-03:00",
            "status": "not downloaded"
        },
        {
            "from": "Esra Kılıç",
            "title": "2016 Yılı İçin Su ve Kanalizasyon Proje Planları",
            "date": "2016-04-30T11:20:41.000-03:00",
            "status": "downloaded"
        }
    ];

const columns: ColumnDef<IncomingFile>[] = [
    {
        accessorKey: "from",
        header: "Gönderen",
        cell: ({ row }) => <div className="font-medium">{row.getValue("from")}</div>,
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

const SharedWithMeTabContent = forwardRef<PaginationHandle>((_, ref) => {
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
                    placeholder="Gönderene göre filtrele..."
                    value={(table.getColumn("from")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("from")?.setFilterValue(event.target.value)
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

export default SharedWithMeTabContent;
