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
        from: "workmanabbott@idetica.com",
        title: "in nostrud pariatur",
        date: "2024-12-24T01:25:00.000-03:00",
        status: "not downloaded"
    },
    {
        from: "caldwellmorse@musanpoly.com",
        title: "in Lorem ad",
        date: "2019-02-08T01:29:12.000-03:00",
        status: "not downloaded"
    },
    {
        from: "gwenjackson@teraprene.com",
        title: "ipsum dolor aliqua",
        date: "2015-02-27T05:40:34.000-02:00",
        status: "downloaded"
    },
    {
        from: "duranhardin@comtext.com",
        title: "culpa pariatur amet",
        date: "2015-09-11T01:23:00.000-03:00",
        status: "downloaded"
    },
    {
        from: "shawnbuchanan@greeker.com",
        title: "non labore sint",
        date: "2021-08-17T05:58:29.000-03:00",
        status: "not downloaded"
    },
    {
        from: "sharlenehuffman@yogasm.com",
        title: "deserunt ipsum voluptate",
        date: "2019-06-02T03:25:50.000-03:00",
        status: "not downloaded"
    },
    {
        from: "beckypennington@turnling.com",
        title: "et pariatur ad",
        date: "2020-08-03T03:24:01.000-03:00",
        status: "downloaded"
    },
    {
        from: "hoodburt@verton.com",
        title: "mollit occaecat culpa",
        date: "2021-06-16T07:26:52.000-03:00",
        status: "downloaded"
    },
    {
        from: "blackhurst@virva.com",
        title: "do dolore pariatur",
        date: "2023-01-24T04:17:09.000-03:00",
        status: "not downloaded"
    },
    {
        from: "nettiedickerson@tellifly.com",
        title: "ut laboris id",
        date: "2016-04-30T11:20:41.000-03:00",
        status: "downloaded"
    },
    {
        from: "ellisonmaldonado@konnect.com",
        title: "elit ipsum occaecat",
        date: "2019-11-03T11:26:06.000-03:00",
        status: "downloaded"
    },
    {
        from: "dyermeyers@soprano.com",
        title: "magna occaecat consequat",
        date: "2019-05-05T09:01:34.000-03:00",
        status: "not downloaded"
    },
    {
        from: "kelleyhowell@geekko.com",
        title: "adipisicing est magna",
        date: "2018-02-23T07:20:13.000-03:00",
        status: "downloaded"
    },
    {
        from: "collinsharvey@interfind.com",
        title: "qui ad excepteur",
        date: "2015-08-27T06:36:30.000-03:00",
        status: "downloaded"
    },
    {
        from: "tarafoster@parleynet.com",
        title: "ea non nulla",
        date: "2016-05-20T10:40:13.000-03:00",
        status: "not downloaded"
    },
    {
        from: "combshenson@apexia.com",
        title: "aliquip est est",
        date: "2018-12-08T06:00:14.000-03:00",
        status: "downloaded"
    },
    {
        from: "whitakerhughes@artworlds.com",
        title: "fugiat sunt ea",
        date: "2021-08-13T09:03:48.000-03:00",
        status: "not downloaded"
    },
    {
        from: "christinashepard@geekosis.com",
        title: "enim mollit culpa",
        date: "2019-06-28T02:06:24.000-03:00",
        status: "not downloaded"
    },
    {
        from: "gonzalesgarrison@naxdis.com",
        title: "adipisicing aliqua tempor",
        date: "2020-01-18T10:30:19.000-03:00",
        status: "not downloaded"
    },
    {
        from: "dillardwhitaker@prowaste.com",
        title: "duis deserunt pariatur",
        date: "2024-07-18T05:27:29.000-03:00",
        status: "not downloaded"
    },
    {
        from: "staciflowers@paprikut.com",
        title: "aliquip eu veniam",
        date: "2014-04-22T03:18:39.000-03:00",
        status: "not downloaded"
    },
    {
        from: "mcintyredonovan@genmex.com",
        title: "ad labore nulla",
        date: "2014-08-24T11:03:29.000-03:00",
        status: "downloaded"
    },
    {
        from: "corinnebean@extro.com",
        title: "voluptate duis velit",
        date: "2017-03-22T09:53:58.000-03:00",
        status: "downloaded"
    },
    {
        from: "jeannettehunt@kenegy.com",
        title: "adipisicing dolore sunt",
        date: "2015-01-12T09:25:39.000-02:00",
        status: "not downloaded"
    },
    {
        from: "susannabeach@sequitur.com",
        title: "excepteur aliquip quis",
        date: "2019-12-26T05:42:31.000-03:00",
        status: "not downloaded"
    },
    {
        from: "harperwagner@gaptec.com",
        title: "est adipisicing voluptate",
        date: "2023-05-10T01:47:04.000-03:00",
        status: "not downloaded"
    },
    {
        from: "luciledalton@shadease.com",
        title: "cillum elit sit",
        date: "2018-02-17T02:35:32.000-03:00",
        status: "downloaded"
    },
    {
        from: "erikabrennan@gynko.com",
        title: "occaecat laboris exercitation",
        date: "2023-12-22T07:58:31.000-03:00",
        status: "not downloaded"
    },
    {
        from: "letitiaburnett@emoltra.com",
        title: "non sunt ipsum",
        date: "2021-11-30T02:40:40.000-03:00",
        status: "downloaded"
    },
    {
        from: "hickslawrence@limage.com",
        title: "labore laborum dolor",
        date: "2019-06-11T03:44:44.000-03:00",
        status: "not downloaded"
    },
    {
        from: "desireepatrick@proxsoft.com",
        title: "velit ipsum non",
        date: "2021-10-05T02:28:01.000-03:00",
        status: "downloaded"
    },
    {
        from: "kathleenlester@emtrac.com",
        title: "et esse dolor",
        date: "2022-09-07T09:52:11.000-03:00",
        status: "not downloaded"
    },
    {
        from: "leevalencia@cognicode.com",
        title: "non labore occaecat",
        date: "2018-10-03T11:39:16.000-03:00",
        status: "not downloaded"
    },
    {
        from: "tranzimmerman@ecstasia.com",
        title: "irure elit incididunt",
        date: "2016-07-23T07:27:07.000-03:00",
        status: "downloaded"
    },
    {
        from: "tamekarandolph@ecosys.com",
        title: "in et magna",
        date: "2021-03-18T12:07:48.000-03:00",
        status: "not downloaded"
    },
    {
        from: "christiross@schoolio.com",
        title: "enim occaecat proident",
        date: "2015-07-22T06:58:41.000-03:00",
        status: "downloaded"
    },
    {
        from: "smallbray@zinca.com",
        title: "laboris ut do",
        date: "2022-10-29T05:24:28.000-03:00",
        status: "downloaded"
    },
    {
        from: "louelladiaz@kangle.com",
        title: "nulla et aute",
        date: "2016-05-14T04:08:13.000-03:00",
        status: "not downloaded"
    },
    {
        from: "dorastevenson@zidant.com",
        title: "culpa et deserunt",
        date: "2017-06-24T06:03:58.000-03:00",
        status: "downloaded"
    },
    {
        from: "inesdaniel@fiberox.com",
        title: "duis ullamco consequat",
        date: "2015-10-13T09:11:46.000-03:00",
        status: "not downloaded"
    },
    {
        from: "bergbaird@furnafix.com",
        title: "officia eiusmod dolore",
        date: "2025-03-26T11:22:26.000-03:00",
        status: "not downloaded"
    },
    {
        from: "velmamorrison@intrawear.com",
        title: "nulla irure sit",
        date: "2019-08-09T06:25:55.000-03:00",
        status: "not downloaded"
    },
    {
        from: "zelmameyer@yurture.com",
        title: "tempor voluptate deserunt",
        date: "2019-08-15T08:47:00.000-03:00",
        status: "downloaded"
    },
    {
        from: "genarowland@polarium.com",
        title: "non anim eiusmod",
        date: "2018-07-14T04:52:20.000-03:00",
        status: "not downloaded"
    },
    {
        from: "garzabowen@zeam.com",
        title: "nisi velit aute",
        date: "2017-10-23T03:43:58.000-03:00",
        status: "downloaded"
    },
    {
        from: "ernacarter@geekular.com",
        title: "minim minim ex",
        date: "2016-02-29T07:51:07.000-02:00",
        status: "not downloaded"
    },
    {
        from: "halliehines@urbanshee.com",
        title: "elit aliqua esse",
        date: "2019-04-26T05:35:58.000-03:00",
        status: "not downloaded"
    },
    {
        from: "ramonawoodward@dragbot.com",
        title: "quis laborum fugiat",
        date: "2021-04-18T04:40:01.000-03:00",
        status: "downloaded"
    },
    {
        from: "underwoodbolton@utarian.com",
        title: "reprehenderit ex ad",
        date: "2014-03-03T11:30:20.000-02:00",
        status: "downloaded"
    },
    {
        from: "mosleyknowles@providco.com",
        title: "eiusmod sunt ad",
        date: "2022-06-10T02:13:41.000-03:00",
        status: "not downloaded"
    },
    {
        from: "weaverrodgers@ebidco.com",
        title: "amet in eiusmod",
        date: "2016-06-03T08:55:39.000-03:00",
        status: "downloaded"
    },
    {
        from: "ramirezrojas@comveyer.com",
        title: "mollit est labore",
        date: "2020-06-01T10:01:55.000-03:00",
        status: "not downloaded"
    },
    {
        from: "waltoncooke@songbird.com",
        title: "non amet excepteur",
        date: "2020-12-11T02:56:49.000-03:00",
        status: "not downloaded"
    },
    {
        from: "edithreid@duflex.com",
        title: "pariatur elit ad",
        date: "2021-08-13T08:15:04.000-03:00",
        status: "downloaded"
    },
    {
        from: "julianablackburn@frosnex.com",
        title: "ad labore nulla",
        date: "2018-10-11T10:25:44.000-03:00",
        status: "downloaded"
    },
    {
        from: "durhamcarrillo@ultrasure.com",
        title: "sit consectetur ut",
        date: "2025-01-02T03:50:34.000-03:00",
        status: "not downloaded"
    },
    {
        from: "staceycasey@inear.com",
        title: "exercitation nostrud nostrud",
        date: "2021-11-18T12:55:47.000-03:00",
        status: "not downloaded"
    },
    {
        from: "deniseworkman@confrenzy.com",
        title: "ad sunt aliqua",
        date: "2017-09-01T04:06:08.000-03:00",
        status: "downloaded"
    },
    {
        from: "heleneholloway@peticular.com",
        title: "velit consectetur mollit",
        date: "2017-07-26T03:14:05.000-03:00",
        status: "not downloaded"
    },
    {
        from: "jamesbentley@telpod.com",
        title: "sit deserunt do",
        date: "2020-02-18T08:16:02.000-03:00",
        status: "not downloaded"
    },
    {
        from: "hartmanray@senmao.com",
        title: "eu pariatur mollit",
        date: "2014-11-30T11:01:46.000-02:00",
        status: "not downloaded"
    },
    {
        from: "cantrellle@tingles.com",
        title: "aliqua qui eu",
        date: "2022-03-12T07:51:00.000-03:00",
        status: "not downloaded"
    },
    {
        from: "fitzgeraldwright@comtrek.com",
        title: "ullamco magna nisi",
        date: "2025-02-03T09:47:52.000-03:00",
        status: "not downloaded"
    },
    {
        from: "alishafuentes@gadtron.com",
        title: "non in proident",
        date: "2021-06-02T11:06:27.000-03:00",
        status: "not downloaded"
    },
    {
        from: "karynmercer@entality.com",
        title: "dolore excepteur excepteur",
        date: "2019-03-23T04:08:47.000-03:00",
        status: "downloaded"
    },
    {
        from: "starkmorales@cytrek.com",
        title: "quis Lorem esse",
        date: "2021-10-03T02:30:45.000-03:00",
        status: "not downloaded"
    },
    {
        from: "mckinneyalvarez@kyagoro.com",
        title: "laborum magna cupidatat",
        date: "2017-11-27T05:09:35.000-03:00",
        status: "downloaded"
    },
    {
        from: "evecummings@datagen.com",
        title: "nulla in aute",
        date: "2022-07-01T07:01:13.000-03:00",
        status: "not downloaded"
    },
    {
        from: "antonialogan@apextri.com",
        title: "ut ut consectetur",
        date: "2020-01-21T12:04:25.000-03:00",
        status: "downloaded"
    },
    {
        from: "levinemiles@tetratrex.com",
        title: "nulla sint nisi",
        date: "2024-04-02T03:30:39.000-03:00",
        status: "downloaded"
    },
    {
        from: "dorotheaevans@dreamia.com",
        title: "commodo dolore magna",
        date: "2016-11-14T03:16:10.000-03:00",
        status: "downloaded"
    },
    {
        from: "boydbarrera@capscreen.com",
        title: "nulla veniam aliqua",
        date: "2025-03-30T09:03:17.000-03:00",
        status: "not downloaded"
    },
    {
        from: "briannasantos@glukgluk.com",
        title: "veniam sit aliquip",
        date: "2023-08-21T01:11:28.000-03:00",
        status: "downloaded"
    },
    {
        from: "lindsaytodd@stralum.com",
        title: "aute ut ex",
        date: "2014-10-03T09:33:16.000-03:00",
        status: "not downloaded"
    },
    {
        from: "murieljohnston@prosely.com",
        title: "proident consectetur pariatur",
        date: "2024-12-08T04:36:01.000-03:00",
        status: "downloaded"
    },
    {
        from: "benjamingonzalez@overfork.com",
        title: "proident ut nulla",
        date: "2020-06-03T06:21:36.000-03:00",
        status: "downloaded"
    },
    {
        from: "holmangray@nurali.com",
        title: "magna minim laboris",
        date: "2023-08-25T05:47:25.000-03:00",
        status: "not downloaded"
    },
    {
        from: "gooddonaldson@sustenza.com",
        title: "quis dolore velit",
        date: "2014-06-21T08:18:34.000-03:00",
        status: "not downloaded"
    },
    {
        from: "mcneilcastaneda@ezentia.com",
        title: "ullamco exercitation sint",
        date: "2024-11-06T09:18:41.000-03:00",
        status: "downloaded"
    },
    {
        from: "lenorebowman@zanilla.com",
        title: "esse duis velit",
        date: "2021-10-22T04:04:14.000-03:00",
        status: "downloaded"
    },
    {
        from: "hubbardburch@idealis.com",
        title: "adipisicing voluptate excepteur",
        date: "2015-01-02T09:59:19.000-02:00",
        status: "not downloaded"
    },
    {
        from: "laurelherrera@centree.com",
        title: "minim cillum anim",
        date: "2015-08-21T01:47:15.000-03:00",
        status: "not downloaded"
    },
    {
        from: "rojasnewton@katakana.com",
        title: "excepteur labore aliquip",
        date: "2021-06-09T05:01:15.000-03:00",
        status: "downloaded"
    },
    {
        from: "knappmckee@anivet.com",
        title: "et ea nisi",
        date: "2018-02-21T03:19:33.000-03:00",
        status: "not downloaded"
    },
    {
        from: "powerswillis@keeg.com",
        title: "enim commodo Lorem",
        date: "2018-10-05T08:02:27.000-03:00",
        status: "not downloaded"
    },
    {
        from: "reidlynn@zboo.com",
        title: "duis ad do",
        date: "2016-03-07T05:54:25.000-02:00",
        status: "not downloaded"
    },
    {
        from: "mullinshewitt@bulljuice.com",
        title: "et in anim",
        date: "2014-06-25T12:12:30.000-03:00",
        status: "not downloaded"
    },
    {
        from: "kinneygates@acium.com",
        title: "duis ad ad",
        date: "2014-06-03T04:22:06.000-03:00",
        status: "not downloaded"
    },
    {
        from: "allisonowen@tripsch.com",
        title: "duis aliquip culpa",
        date: "2014-02-13T01:15:27.000-02:00",
        status: "not downloaded"
    },
    {
        from: "terrasummers@songlines.com",
        title: "officia proident ullamco",
        date: "2021-02-27T04:53:05.000-03:00",
        status: "downloaded"
    },
    {
        from: "dodsonmcfadden@portica.com",
        title: "sit et commodo",
        date: "2014-12-21T05:15:59.000-02:00",
        status: "not downloaded"
    },
    {
        from: "mclaughlinhull@atomica.com",
        title: "sunt consectetur elit",
        date: "2024-03-26T05:20:30.000-03:00",
        status: "downloaded"
    },
    {
        from: "cherryrichards@zialactic.com",
        title: "do duis commodo",
        date: "2018-02-19T01:48:15.000-03:00",
        status: "downloaded"
    },
    {
        from: "gayrich@boink.com",
        title: "Lorem cillum proident",
        date: "2025-01-05T12:16:30.000-03:00",
        status: "not downloaded"
    },
    {
        from: "lyonsgordon@xymonk.com",
        title: "mollit ad sint",
        date: "2020-01-02T08:36:20.000-03:00",
        status: "downloaded"
    },
    {
        from: "eliseestrada@cormoran.com",
        title: "aliquip non aute",
        date: "2019-12-25T11:05:05.000-03:00",
        status: "not downloaded"
    },
    {
        from: "lancasterbright@quizka.com",
        title: "eiusmod laborum cupidatat",
        date: "2014-02-13T12:45:59.000-02:00",
        status: "not downloaded"
    },
    {
        from: "howardmccoy@nitracyr.com",
        title: "voluptate elit nulla",
        date: "2022-04-26T02:35:11.000-03:00",
        status: "not downloaded"
    },
    {
        from: "grayhenderson@pearlesex.com",
        title: "elit do anim",
        date: "2021-01-09T11:58:36.000-03:00",
        status: "not downloaded"
    },
    {
        from: "carpentermacdonald@zaya.com",
        title: "exercitation et magna",
        date: "2025-01-21T03:58:00.000-03:00",
        status: "downloaded"
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
                <Button size="sm" onClick={handleDownload}>
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
    )
});

export default SharedWithMeTabContent;
