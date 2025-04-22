import * as React from "react"
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    flexRender,
    RowData, ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

declare module '@tanstack/react-table' {
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'text' | 'range' | 'select'
    }
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {JSX} from "react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

type IncomingFile = {
    from: string
    title: string
    date: string
    status: string
}

const data: IncomingFile[] = [
    {
        from: "rosewilliam@fangold.com",
        title: "nostrud reprehenderit ea",
        date: "2018-04-01T12:16:27.000-03:00",
        status: "downloaded"
    },
    {
        from: "sylviaberger@flotonic.com",
        title: "enim quis non",
        date: "2016-03-01T06:15:29.000-02:00",
        status: "waiting"
    },
    {
        from: "rhondabarron@anarco.com",
        title: "duis mollit quis",
        date: "2018-07-02T12:42:09.000-03:00",
        status: "downloaded"
    },
    {
        from: "vancelindsay@zeam.com",
        title: "sint Lorem sunt",
        date: "2015-08-11T05:23:20.000-03:00",
        status: "downloaded"
    },
    {
        from: "priscillawiley@cytrex.com",
        title: "enim ad occaecat",
        date: "2017-03-21T12:13:08.000-03:00",
        status: "waiting"
    },
    {
        from: "quinnburks@konnect.com",
        title: "laboris nulla nisi",
        date: "2023-12-01T08:41:18.000-03:00",
        status: "downloaded"
    },
    {
        from: "brigittelawrence@neteria.com",
        title: "et anim deserunt",
        date: "2021-07-31T04:14:52.000-03:00",
        status: "not downloaded"
    },
    {
        from: "eatonestes@decratex.com",
        title: "est in dolore",
        date: "2022-04-20T08:56:45.000-03:00",
        status: "downloaded"
    },
    {
        from: "rachaelchandler@accusage.com",
        title: "enim occaecat elit",
        date: "2018-01-14T02:53:48.000-03:00",
        status: "not downloaded"
    },
    {
        from: "wagnerbruce@lexicondo.com",
        title: "commodo sunt esse",
        date: "2020-01-14T10:09:00.000-03:00",
        status: "waiting"
    },
    {
        from: "dominiquedavid@cytrak.com",
        title: "ipsum officia eiusmod",
        date: "2019-07-20T06:19:42.000-03:00",
        status: "downloaded"
    },
    {
        from: "bonniegross@earbang.com",
        title: "reprehenderit nulla dolor",
        date: "2017-12-13T07:27:14.000-03:00",
        status: "not downloaded"
    },
    {
        from: "elenabrewer@singavera.com",
        title: "minim voluptate non",
        date: "2024-02-23T02:16:29.000-03:00",
        status: "waiting"
    },
    {
        from: "berthalloyd@quonk.com",
        title: "do irure consectetur",
        date: "2024-07-04T06:30:02.000-03:00",
        status: "waiting"
    },
    {
        from: "lupechan@schoolio.com",
        title: "laboris aute officia",
        date: "2016-04-04T09:22:46.000-03:00",
        status: "waiting"
    },
    {
        from: "margerymason@otherside.com",
        title: "excepteur ullamco fugiat",
        date: "2018-07-20T02:19:22.000-03:00",
        status: "waiting"
    },
    {
        from: "velasquezgillespie@micronaut.com",
        title: "adipisicing laborum voluptate",
        date: "2021-04-08T09:26:32.000-03:00",
        status: "downloaded"
    },
    {
        from: "knoxmurray@letpro.com",
        title: "consequat pariatur reprehenderit",
        date: "2016-03-27T02:24:56.000-03:00",
        status: "downloaded"
    },
    {
        from: "margueritegilbert@frolix.com",
        title: "sit et eiusmod",
        date: "2015-09-05T06:55:03.000-03:00",
        status: "waiting"
    },
    {
        from: "shafferkramer@zoid.com",
        title: "elit ex reprehenderit",
        date: "2020-08-22T11:35:33.000-03:00",
        status: "not downloaded"
    },
    {
        from: "esperanzabryant@orbixtar.com",
        title: "reprehenderit laborum sit",
        date: "2016-05-22T01:32:22.000-03:00",
        status: "waiting"
    },
    {
        from: "thorntonsharpe@quotezart.com",
        title: "tempor exercitation occaecat",
        date: "2015-07-20T07:02:08.000-03:00",
        status: "not downloaded"
    },
    {
        from: "sellersphelps@utarian.com",
        title: "consequat veniam et",
        date: "2016-03-02T12:07:48.000-02:00",
        status: "not downloaded"
    },
    {
        from: "wolfrich@portica.com",
        title: "eu velit laborum",
        date: "2022-02-12T03:26:07.000-03:00",
        status: "downloaded"
    },
    {
        from: "connieweaver@zinca.com",
        title: "excepteur qui dolor",
        date: "2019-11-03T04:00:23.000-03:00",
        status: "downloaded"
    },
    {
        from: "robbiepetty@navir.com",
        title: "id do minim",
        date: "2015-12-31T04:20:19.000-02:00",
        status: "waiting"
    },
    {
        from: "landrypickett@sustenza.com",
        title: "laboris fugiat ex",
        date: "2015-12-18T09:33:52.000-02:00",
        status: "downloaded"
    },
    {
        from: "dawsoncox@genmom.com",
        title: "officia commodo sint",
        date: "2019-01-04T12:07:48.000-03:00",
        status: "not downloaded"
    },
    {
        from: "vickielee@eclipto.com",
        title: "nulla sunt pariatur",
        date: "2022-08-16T11:06:22.000-03:00",
        status: "not downloaded"
    },
    {
        from: "clarkevelez@zillatide.com",
        title: "eiusmod esse do",
        date: "2023-03-24T01:22:38.000-03:00",
        status: "downloaded"
    },
    {
        from: "wrightkane@bisba.com",
        title: "culpa esse ullamco",
        date: "2014-01-03T06:19:22.000-02:00",
        status: "not downloaded"
    },
    {
        from: "casandralowe@hawkster.com",
        title: "sint laboris laboris",
        date: "2022-07-19T03:12:40.000-03:00",
        status: "downloaded"
    },
    {
        from: "farmermaldonado@biflex.com",
        title: "est occaecat ea",
        date: "2022-02-13T07:28:19.000-03:00",
        status: "not downloaded"
    },
    {
        from: "powerswoodward@edecine.com",
        title: "consectetur enim exercitation",
        date: "2021-12-03T09:47:46.000-03:00",
        status: "not downloaded"
    },
    {
        from: "figueroariddle@verbus.com",
        title: "voluptate ea ad",
        date: "2018-08-30T09:48:39.000-03:00",
        status: "downloaded"
    },
    {
        from: "greenequinn@roboid.com",
        title: "fugiat ad laboris",
        date: "2017-06-28T04:03:04.000-03:00",
        status: "waiting"
    },
    {
        from: "concepciontodd@comtrak.com",
        title: "consectetur voluptate mollit",
        date: "2021-02-06T07:31:36.000-03:00",
        status: "not downloaded"
    },
    {
        from: "suzettewelch@vixo.com",
        title: "nisi ad incididunt",
        date: "2022-03-01T04:14:58.000-03:00",
        status: "downloaded"
    },
    {
        from: "mckeesanders@zillacom.com",
        title: "do qui minim",
        date: "2024-08-20T03:29:41.000-03:00",
        status: "downloaded"
    },
    {
        from: "karinashepherd@rameon.com",
        title: "tempor nulla sit",
        date: "2018-06-09T06:32:20.000-03:00",
        status: "waiting"
    },
    {
        from: "lakeishawatson@jetsilk.com",
        title: "deserunt sunt consequat",
        date: "2019-08-05T11:22:58.000-03:00",
        status: "waiting"
    },
    {
        from: "pollyhumphrey@locazone.com",
        title: "sunt nisi velit",
        date: "2019-01-04T12:10:16.000-03:00",
        status: "waiting"
    },
    {
        from: "vivianingram@menbrain.com",
        title: "reprehenderit magna exercitation",
        date: "2018-11-21T08:08:12.000-03:00",
        status: "waiting"
    },
    {
        from: "marlenejohns@megall.com",
        title: "nisi anim in",
        date: "2014-04-02T07:50:33.000-03:00",
        status: "not downloaded"
    },
    {
        from: "claudinetyson@cubicide.com",
        title: "consectetur est pariatur",
        date: "2022-05-17T05:07:21.000-03:00",
        status: "waiting"
    },
    {
        from: "hodgeosborne@biospan.com",
        title: "incididunt esse ullamco",
        date: "2022-08-17T01:00:23.000-03:00",
        status: "waiting"
    },
    {
        from: "jeanninemendez@quarmony.com",
        title: "consectetur et cillum",
        date: "2024-01-12T06:25:50.000-03:00",
        status: "not downloaded"
    },
    {
        from: "dollymcintyre@applideck.com",
        title: "nisi excepteur exercitation",
        date: "2022-11-13T06:44:44.000-03:00",
        status: "not downloaded"
    },
    {
        from: "tuckerpatrick@billmed.com",
        title: "culpa pariatur cillum",
        date: "2022-12-23T07:39:18.000-03:00",
        status: "downloaded"
    },
    {
        from: "ofeliajoseph@scentric.com",
        title: "esse pariatur cillum",
        date: "2016-09-12T04:28:56.000-03:00",
        status: "not downloaded"
    },
    {
        from: "fernandezvalentine@glukgluk.com",
        title: "dolore pariatur amet",
        date: "2014-01-09T05:57:13.000-02:00",
        status: "waiting"
    },
    {
        from: "wallacepark@inrt.com",
        title: "nisi culpa cillum",
        date: "2015-12-26T04:20:54.000-02:00",
        status: "waiting"
    },
    {
        from: "holliehays@dognost.com",
        title: "ut minim ex",
        date: "2015-10-18T04:26:11.000-03:00",
        status: "downloaded"
    },
    {
        from: "brockcarney@geekus.com",
        title: "qui qui consectetur",
        date: "2018-08-14T08:21:49.000-03:00",
        status: "waiting"
    },
    {
        from: "taylormichael@futurize.com",
        title: "voluptate id qui",
        date: "2022-01-04T05:58:53.000-03:00",
        status: "not downloaded"
    },
    {
        from: "leolayang@zepitope.com",
        title: "labore enim laborum",
        date: "2021-04-24T10:17:59.000-03:00",
        status: "downloaded"
    },
    {
        from: "pughryan@jasper.com",
        title: "ullamco velit ex",
        date: "2022-04-04T02:19:41.000-03:00",
        status: "downloaded"
    },
    {
        from: "roxiewhitehead@orbalix.com",
        title: "cupidatat aute nisi",
        date: "2021-11-12T09:33:44.000-03:00",
        status: "downloaded"
    },
    {
        from: "brittneygardner@boink.com",
        title: "officia nulla id",
        date: "2020-02-22T08:09:41.000-03:00",
        status: "waiting"
    },
    {
        from: "kathiestout@qualitern.com",
        title: "qui ex duis",
        date: "2020-12-10T06:39:07.000-03:00",
        status: "waiting"
    },
    {
        from: "cantrellchapman@repetwire.com",
        title: "occaecat ut proident",
        date: "2014-08-05T10:03:30.000-03:00",
        status: "waiting"
    },
    {
        from: "gilesmercer@extragen.com",
        title: "amet Lorem eiusmod",
        date: "2022-08-19T09:09:06.000-03:00",
        status: "downloaded"
    },
    {
        from: "genevajordan@biolive.com",
        title: "eu ex sunt",
        date: "2015-10-02T01:09:36.000-03:00",
        status: "downloaded"
    },
    {
        from: "juliabyers@bezal.com",
        title: "qui ipsum Lorem",
        date: "2022-05-19T06:59:20.000-03:00",
        status: "waiting"
    },
    {
        from: "austinhatfield@geofarm.com",
        title: "sit elit laboris",
        date: "2019-04-08T10:23:03.000-03:00",
        status: "waiting"
    },
    {
        from: "teresajames@shopabout.com",
        title: "ullamco sint adipisicing",
        date: "2015-07-30T11:41:31.000-03:00",
        status: "not downloaded"
    },
    {
        from: "alfredacoleman@intrawear.com",
        title: "sunt cupidatat tempor",
        date: "2021-02-07T11:46:20.000-03:00",
        status: "downloaded"
    },
    {
        from: "lloydwallace@reversus.com",
        title: "consectetur fugiat fugiat",
        date: "2016-01-12T03:51:53.000-02:00",
        status: "waiting"
    },
    {
        from: "avisblack@candecor.com",
        title: "ad reprehenderit cupidatat",
        date: "2014-05-04T05:09:14.000-03:00",
        status: "downloaded"
    },
    {
        from: "mercergill@nipaz.com",
        title: "elit cillum ea",
        date: "2024-11-17T06:28:52.000-03:00",
        status: "not downloaded"
    },
    {
        from: "dyermaxwell@automon.com",
        title: "dolore amet incididunt",
        date: "2024-04-23T09:31:05.000-03:00",
        status: "not downloaded"
    },
    {
        from: "deckerday@bedder.com",
        title: "id aliquip consequat",
        date: "2023-11-04T02:50:58.000-03:00",
        status: "waiting"
    },
    {
        from: "naomicurtis@zenolux.com",
        title: "velit quis qui",
        date: "2016-06-29T02:52:47.000-03:00",
        status: "waiting"
    },
    {
        from: "summerssweet@cujo.com",
        title: "duis aliqua Lorem",
        date: "2017-09-14T06:22:51.000-03:00",
        status: "not downloaded"
    },
    {
        from: "marissaholmes@aquoavo.com",
        title: "laborum et est",
        date: "2025-02-19T08:33:36.000-03:00",
        status: "downloaded"
    },
    {
        from: "malindakaufman@equicom.com",
        title: "ipsum incididunt incididunt",
        date: "2023-10-09T05:04:08.000-03:00",
        status: "not downloaded"
    },
    {
        from: "adamayo@conferia.com",
        title: "occaecat irure exercitation",
        date: "2017-01-11T07:59:02.000-03:00",
        status: "not downloaded"
    },
    {
        from: "ireneforeman@quadeebo.com",
        title: "cupidatat non laborum",
        date: "2022-03-09T11:54:38.000-03:00",
        status: "not downloaded"
    },
    {
        from: "brownmcconnell@apex.com",
        title: "cupidatat Lorem nostrud",
        date: "2020-12-23T03:04:56.000-03:00",
        status: "waiting"
    },
    {
        from: "stantoncooke@cyclonica.com",
        title: "commodo adipisicing ullamco",
        date: "2018-03-05T07:18:22.000-03:00",
        status: "waiting"
    },
    {
        from: "ellisonlopez@bittor.com",
        title: "excepteur ex sunt",
        date: "2024-10-21T03:50:25.000-03:00",
        status: "downloaded"
    },
    {
        from: "stricklandjensen@cubix.com",
        title: "est tempor sint",
        date: "2020-12-03T06:53:03.000-03:00",
        status: "not downloaded"
    },
    {
        from: "leonornunez@liquidoc.com",
        title: "nisi dolore qui",
        date: "2014-10-27T10:08:49.000-02:00",
        status: "not downloaded"
    },
    {
        from: "carolinaparks@orbean.com",
        title: "enim adipisicing sint",
        date: "2017-04-19T07:01:03.000-03:00",
        status: "downloaded"
    },
    {
        from: "cottonclark@aclima.com",
        title: "proident labore esse",
        date: "2021-04-18T11:31:59.000-03:00",
        status: "waiting"
    },
    {
        from: "oladawson@rockyard.com",
        title: "commodo fugiat eiusmod",
        date: "2024-12-31T04:37:51.000-03:00",
        status: "not downloaded"
    },
    {
        from: "bowmanhansen@gushkool.com",
        title: "id irure sint",
        date: "2016-04-23T02:07:47.000-03:00",
        status: "downloaded"
    },
    {
        from: "delacruzkirkland@elpro.com",
        title: "nostrud sunt tempor",
        date: "2018-07-05T10:24:38.000-03:00",
        status: "downloaded"
    },
    {
        from: "joannabuck@austech.com",
        title: "laboris veniam tempor",
        date: "2016-05-21T08:18:45.000-03:00",
        status: "waiting"
    },
    {
        from: "stuartflowers@ecosys.com",
        title: "tempor adipisicing in",
        date: "2017-08-07T11:43:25.000-03:00",
        status: "not downloaded"
    },
    {
        from: "gracieavery@ontality.com",
        title: "adipisicing ex voluptate",
        date: "2017-03-19T09:28:15.000-03:00",
        status: "downloaded"
    },
    {
        from: "nataliavazquez@combogene.com",
        title: "est irure sit",
        date: "2022-08-01T08:10:56.000-03:00",
        status: "not downloaded"
    },
    {
        from: "hazeltrujillo@daido.com",
        title: "enim ad officia",
        date: "2022-02-10T06:47:46.000-03:00",
        status: "waiting"
    },
    {
        from: "carsonmacias@norsup.com",
        title: "enim ut ex",
        date: "2014-04-03T10:38:20.000-03:00",
        status: "not downloaded"
    },
    {
        from: "jenkinsdominguez@escenta.com",
        title: "non duis reprehenderit",
        date: "2019-07-30T08:10:14.000-03:00",
        status: "not downloaded"
    },
    {
        from: "walshnorris@suremax.com",
        title: "ut tempor laboris",
        date: "2019-06-13T12:02:56.000-03:00",
        status: "waiting"
    },
    {
        from: "tishawalker@flumbo.com",
        title: "minim minim nulla",
        date: "2024-05-18T11:31:55.000-03:00",
        status: "downloaded"
    },
    {
        from: "maryannevasquez@tropoli.com",
        title: "quis officia in",
        date: "2016-10-10T10:27:21.000-03:00",
        status: "downloaded"
    },
    {
        from: "katyodom@orbin.com",
        title: "cillum qui quis",
        date: "2024-02-09T05:59:52.000-03:00",
        status: "not downloaded"
    },
    {
        from: "cassiehobbs@kangle.com",
        title: "sint do elit",
        date: "2022-11-04T01:11:25.000-03:00",
        status: "downloaded"
    }
];

const columns: ColumnDef<IncomingFile>[] = [
    {
        accessorKey: "from",
        header: "Gönderen",
        cell: ({ row }) => <div className="font-medium">{row.getValue("from")}</div>,
        meta: {
            filterVariant: 'text',
        },
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
    }
]

export default function SharedWithMeTabContent(): JSX.Element {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

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
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Gönderene göre filtrele..."
                    value={(table.getColumn("from")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("from")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border overflow-x-auto">
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
            <div className="flex justify-end space-x-2 py-4">
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
        </div>
    )
}
