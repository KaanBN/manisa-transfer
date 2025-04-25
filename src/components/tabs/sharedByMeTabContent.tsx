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
        to: "oneillbranch@pyramax.com",
        title: "Consectetur Lorem sunt elit eu velit laboris aliquip et dolor enim fugiat sunt tempor.",
        date: "2022-04-10T02:21:48-03:00",
        status: "not downloaded"
    },
    {
        to: "oliverwebb@isologia.com",
        title: "Officia culpa cillum occaecat mollit amet labore dolor.",
        date: "2021-05-29T06:35:17-03:00",
        status: "not downloaded"
    },
    {
        to: "mckenziemiddleton@comverges.com",
        title: "Pariatur quis adipisicing cillum exercitation pariatur.",
        date: "2020-02-19T01:01:34-03:00",
        status: "downloaded"
    },
    {
        to: "gatesstrong@temorak.com",
        title: "Do ipsum sit laboris est adipisicing non dolore elit dolor ea.",
        date: "2023-08-10T11:57:37-03:00",
        status: "downloaded"
    },
    {
        to: "laurieblake@gadtron.com",
        title: "Adipisicing consectetur occaecat anim do.",
        date: "2023-06-06T03:37:00-03:00",
        status: "downloaded"
    },
    {
        to: "imeldahowell@ziggles.com",
        title: "Quis velit commodo dolor anim.",
        date: "2022-11-28T01:27:07-03:00",
        status: "downloaded"
    },
    {
        to: "harveyharrington@optyk.com",
        title: "Et quis sunt aute esse cupidatat adipisicing sunt aliqua eiusmod anim laboris nulla id.",
        date: "2020-12-25T02:32:09-03:00",
        status: "downloaded"
    },
    {
        to: "mauraserrano@freakin.com",
        title: "Dolor reprehenderit officia quis ex irure.",
        date: "2022-03-16T12:22:52-03:00",
        status: "not downloaded"
    },
    {
        to: "cookdunn@centree.com",
        title: "Anim deserunt ex commodo deserunt est sit cillum eiusmod ex ipsum.",
        date: "2024-11-06T07:45:54-03:00",
        status: "downloaded"
    },
    {
        to: "odomlandry@kozgene.com",
        title: "Aliqua culpa quis adipisicing velit ipsum commodo minim aliqua sint sint cillum.",
        date: "2022-07-12T04:01:36-03:00",
        status: "not downloaded"
    },
    {
        to: "dodsonguy@tropolis.com",
        title: "Amet sunt anim quis duis esse est culpa cillum et eiusmod id ea non ut.",
        date: "2025-01-20T10:48:30-03:00",
        status: "not downloaded"
    },
    {
        to: "jeanniewhitley@ludak.com",
        title: "Commodo deserunt labore aliquip velit voluptate enim enim non.",
        date: "2025-02-03T04:51:44-03:00",
        status: "not downloaded"
    },
    {
        to: "tamarasherman@earbang.com",
        title: "Reprehenderit sint nostrud excepteur id qui.",
        date: "2020-09-25T10:47:36-03:00",
        status: "downloaded"
    },
    {
        to: "mcleodbarr@papricut.com",
        title: "Tempor proident eu do et cupidatat quis cillum amet est.",
        date: "2020-04-21T12:08:45-03:00",
        status: "not downloaded"
    },
    {
        to: "eloisehess@coash.com",
        title: "Amet tempor laboris id ipsum dolore.",
        date: "2024-04-07T03:06:48-03:00",
        status: "downloaded"
    },
    {
        to: "karinknowles@prosely.com",
        title: "Velit proident elit dolore ad sunt esse.",
        date: "2023-07-19T10:30:17-03:00",
        status: "downloaded"
    },
    {
        to: "isabellehaney@pholio.com",
        title: "Ipsum aute proident cillum laborum ad nulla quis nostrud cupidatat sit reprehenderit consequat velit nisi.",
        date: "2023-02-04T01:01:11-03:00",
        status: "not downloaded"
    },
    {
        to: "hammondmckenzie@fiberox.com",
        title: "Culpa veniam ipsum ad ut.",
        date: "2021-04-05T03:52:57-03:00",
        status: "downloaded"
    },
    {
        to: "fitzgeraldwhitehead@beadzza.com",
        title: "Sit quis magna commodo incididunt sunt ut labore esse est occaecat nostrud deserunt eu ex.",
        date: "2023-08-27T05:22:17-03:00",
        status: "downloaded"
    },
    {
        to: "carolineanderson@parleynet.com",
        title: "Officia culpa ipsum esse voluptate labore cillum mollit laborum pariatur ex anim ipsum esse.",
        date: "2022-07-29T04:00:03-03:00",
        status: "not downloaded"
    },
    {
        to: "westpennington@geekmosis.com",
        title: "Cupidatat sit cupidatat pariatur veniam eiusmod cupidatat ad qui laborum enim duis ipsum.",
        date: "2022-10-18T12:18:55-03:00",
        status: "downloaded"
    },
    {
        to: "taylorhamilton@filodyne.com",
        title: "Occaecat reprehenderit adipisicing duis aute nisi culpa nulla nisi id ipsum nostrud Lorem quis.",
        date: "2025-03-02T05:36:48-03:00",
        status: "downloaded"
    },
    {
        to: "addiecooper@uncorp.com",
        title: "Ea quis labore aliquip eu Lorem id culpa esse.",
        date: "2022-03-07T10:02:52-03:00",
        status: "downloaded"
    },
    {
        to: "cherifrank@spherix.com",
        title: "Sunt aliqua consequat magna pariatur veniam consequat labore magna exercitation tempor id consectetur.",
        date: "2023-09-17T12:25:36-03:00",
        status: "downloaded"
    },
    {
        to: "hansonkemp@otherway.com",
        title: "Irure consectetur sint ex magna.",
        date: "2020-02-18T08:46:39-03:00",
        status: "downloaded"
    },
    {
        to: "merrillweeks@terascape.com",
        title: "Eu sunt irure fugiat minim in ex sunt excepteur ut amet occaecat ex laborum qui.",
        date: "2020-05-18T03:33:29-03:00",
        status: "downloaded"
    },
    {
        to: "margiesalas@retrack.com",
        title: "Sint non nulla mollit eiusmod ex eiusmod quis aute pariatur fugiat aliquip labore.",
        date: "2024-11-25T11:16:54-03:00",
        status: "downloaded"
    },
    {
        to: "wendysanford@verbus.com",
        title: "Ut Lorem tempor eu exercitation ea Lorem.",
        date: "2021-04-06T04:56:01-03:00",
        status: "not downloaded"
    },
    {
        to: "fletcherjarvis@zaphire.com",
        title: "Amet quis commodo labore labore eu exercitation anim consectetur nisi consectetur commodo officia Lorem anim.",
        date: "2021-10-14T06:24:43-03:00",
        status: "not downloaded"
    },
    {
        to: "effieclements@interfind.com",
        title: "Aliqua ex excepteur ipsum nisi quis.",
        date: "2024-03-11T10:25:18-03:00",
        status: "downloaded"
    },
    {
        to: "bobbiebrown@norsup.com",
        title: "Lorem aliquip officia consectetur id cillum eiusmod nisi proident adipisicing.",
        date: "2022-07-02T10:34:45-03:00",
        status: "downloaded"
    },
    {
        to: "gingercompton@acusage.com",
        title: "Velit consequat cillum culpa eu sint eu minim.",
        date: "2023-09-03T01:25:08-03:00",
        status: "not downloaded"
    },
    {
        to: "forbeshunter@peticular.com",
        title: "Elit excepteur amet magna cupidatat cillum anim eiusmod anim deserunt non minim.",
        date: "2024-07-08T07:39:35-03:00",
        status: "not downloaded"
    },
    {
        to: "vinsondoyle@mixers.com",
        title: "Laboris adipisicing commodo amet consequat est dolor ad do officia do tempor.",
        date: "2021-02-12T05:30:25-03:00",
        status: "downloaded"
    },
    {
        to: "perezgarza@illumity.com",
        title: "Esse culpa reprehenderit eiusmod pariatur ipsum cillum esse dolor officia sint.",
        date: "2020-03-25T04:01:02-03:00",
        status: "not downloaded"
    },
    {
        to: "alyssapollard@chorizon.com",
        title: "Anim quis cillum et qui nostrud officia magna occaecat culpa esse.",
        date: "2022-07-05T01:32:15-03:00",
        status: "not downloaded"
    },
    {
        to: "elliottvaughan@decratex.com",
        title: "Labore sint aute ullamco ipsum aliqua excepteur aliqua laborum irure consectetur laboris sunt veniam.",
        date: "2021-02-02T12:13:55-03:00",
        status: "downloaded"
    },
    {
        to: "altheazamora@norali.com",
        title: "Nulla deserunt exercitation do cupidatat Lorem nisi deserunt magna ullamco amet officia elit.",
        date: "2024-08-26T03:53:12-03:00",
        status: "downloaded"
    },
    {
        to: "waltermoran@insuron.com",
        title: "Culpa adipisicing irure minim aute quis cillum.",
        date: "2023-09-20T02:33:58-03:00",
        status: "not downloaded"
    },
    {
        to: "jangibbs@zillactic.com",
        title: "Pariatur dolore eiusmod eiusmod excepteur excepteur duis laboris id irure.",
        date: "2020-07-03T09:43:20-03:00",
        status: "not downloaded"
    },
    {
        to: "pittmanandrews@quintity.com",
        title: "Ex aliquip sint aliquip minim exercitation elit enim laborum non.",
        date: "2021-09-06T12:51:26-03:00",
        status: "downloaded"
    },
    {
        to: "bonnertanner@isologix.com",
        title: "Laboris aliqua consectetur voluptate Lorem aute.",
        date: "2023-08-24T10:32:07-03:00",
        status: "not downloaded"
    },
    {
        to: "katharineanthony@utara.com",
        title: "Occaecat sint fugiat laboris sint velit magna anim.",
        date: "2020-09-16T12:05:54-03:00",
        status: "downloaded"
    },
    {
        to: "margomay@medifax.com",
        title: "Sit duis velit veniam elit fugiat nulla tempor amet sunt.",
        date: "2023-11-10T05:14:39-03:00",
        status: "not downloaded"
    },
    {
        to: "woodsayers@vendblend.com",
        title: "Ad ea ullamco aliquip nisi officia esse occaecat irure.",
        date: "2024-02-20T12:41:58-03:00",
        status: "not downloaded"
    },
    {
        to: "sweetoconnor@medmex.com",
        title: "Labore Lorem eu officia adipisicing non esse est non proident.",
        date: "2023-05-25T05:41:35-03:00",
        status: "downloaded"
    },
    {
        to: "graciestevens@aquoavo.com",
        title: "Duis labore minim sunt incididunt aliqua dolore voluptate magna adipisicing enim.",
        date: "2021-03-09T12:05:26-03:00",
        status: "downloaded"
    },
    {
        to: "colettefinley@cosmetex.com",
        title: "Labore laboris irure ad excepteur excepteur cupidatat in laborum sunt qui pariatur mollit voluptate.",
        date: "2022-09-16T01:16:53-03:00",
        status: "not downloaded"
    },
    {
        to: "kristinegrimes@nebulean.com",
        title: "Pariatur aliquip ut adipisicing pariatur velit consequat minim labore magna ex do et.",
        date: "2024-09-25T04:25:42-03:00",
        status: "downloaded"
    },
    {
        to: "charlottesheppard@unisure.com",
        title: "Cupidatat elit est dolore ea mollit non aute.",
        date: "2022-04-19T03:31:11-03:00",
        status: "downloaded"
    },
    {
        to: "crystalcase@exoteric.com",
        title: "Ea magna dolore eiusmod amet aliquip consectetur anim labore consectetur enim ex do sit culpa.",
        date: "2020-04-04T07:52:33-03:00",
        status: "not downloaded"
    },
    {
        to: "augustaholland@homelux.com",
        title: "Esse commodo amet ad in ea.",
        date: "2022-07-17T11:50:45-03:00",
        status: "not downloaded"
    },
    {
        to: "dellabernard@snacktion.com",
        title: "Elit elit ut cupidatat mollit nostrud sunt adipisicing nisi excepteur laboris ipsum incididunt.",
        date: "2023-12-02T10:10:48-03:00",
        status: "downloaded"
    },
    {
        to: "huntfrancis@amril.com",
        title: "Id ut magna mollit amet aute consequat excepteur tempor adipisicing sunt irure aute id qui.",
        date: "2020-10-28T12:05:47-03:00",
        status: "not downloaded"
    },
    {
        to: "hensonberg@neteria.com",
        title: "Veniam cupidatat qui laborum commodo exercitation officia.",
        date: "2022-08-11T11:52:09-03:00",
        status: "not downloaded"
    },
    {
        to: "hydemontgomery@supportal.com",
        title: "Aliquip exercitation minim do non eiusmod eiusmod laboris ex aliqua dolor sint.",
        date: "2021-12-30T05:36:52-03:00",
        status: "downloaded"
    },
    {
        to: "pottsbrock@uneeq.com",
        title: "Pariatur amet nostrud adipisicing culpa.",
        date: "2024-02-14T12:37:11-03:00",
        status: "not downloaded"
    },
    {
        to: "headwilkins@brainquil.com",
        title: "Lorem adipisicing consectetur nulla ut.",
        date: "2024-03-18T05:14:53-03:00",
        status: "not downloaded"
    },
    {
        to: "angelinarandolph@xumonk.com",
        title: "Voluptate minim elit anim esse consectetur quis tempor eu labore mollit reprehenderit.",
        date: "2022-05-14T07:03:56-03:00",
        status: "downloaded"
    },
    {
        to: "beardroman@inventure.com",
        title: "Non tempor ipsum id sit quis laboris anim.",
        date: "2020-03-25T06:07:48-03:00",
        status: "downloaded"
    },
    {
        to: "wigginsfloyd@ecraze.com",
        title: "In eu eu aliquip adipisicing irure.",
        date: "2024-12-03T09:04:51-03:00",
        status: "not downloaded"
    },
    {
        to: "feliciaoliver@aquasseur.com",
        title: "Sint dolor consectetur duis ea tempor ipsum magna id eiusmod ea ullamco aute mollit est.",
        date: "2021-12-13T01:33:54-03:00",
        status: "downloaded"
    },
    {
        to: "ryanwhite@centuria.com",
        title: "Eiusmod ipsum do dolor laborum ad ea ipsum.",
        date: "2022-03-28T01:49:42-03:00",
        status: "not downloaded"
    },
    {
        to: "hintonmccoy@hyplex.com",
        title: "Esse dolor nostrud non velit nisi minim.",
        date: "2021-11-01T08:04:42-03:00",
        status: "downloaded"
    },
    {
        to: "tonyapruitt@naxdis.com",
        title: "Sint ad officia nisi labore occaecat duis incididunt magna labore velit irure.",
        date: "2021-07-03T07:07:07-03:00",
        status: "not downloaded"
    },
    {
        to: "briggsdalton@zentia.com",
        title: "Sunt duis non quis eu.",
        date: "2024-09-27T05:10:41-03:00",
        status: "not downloaded"
    },
    {
        to: "conradcleveland@eclipto.com",
        title: "Labore et in amet reprehenderit sunt labore ut do dolore officia sunt nisi reprehenderit.",
        date: "2024-06-08T02:38:54-03:00",
        status: "not downloaded"
    },
    {
        to: "hardymcdonald@ronelon.com",
        title: "Fugiat dolor exercitation aliqua ad cillum ex.",
        date: "2020-02-03T06:15:54-03:00",
        status: "downloaded"
    },
    {
        to: "lizziefrederick@valreda.com",
        title: "Sunt veniam quis minim sunt ex tempor reprehenderit adipisicing.",
        date: "2021-12-04T12:30:33-03:00",
        status: "not downloaded"
    },
    {
        to: "vancekaufman@ceprene.com",
        title: "Tempor elit in ullamco laborum voluptate consequat proident fugiat magna quis laborum elit.",
        date: "2024-03-09T02:00:29-03:00",
        status: "downloaded"
    },
    {
        to: "wadedyer@zillacon.com",
        title: "Est consequat tempor amet sit excepteur sit voluptate.",
        date: "2025-02-24T12:01:55-03:00",
        status: "not downloaded"
    },
    {
        to: "nancyduran@recognia.com",
        title: "Consequat minim ad dolore magna excepteur deserunt reprehenderit incididunt.",
        date: "2022-10-06T10:58:21-03:00",
        status: "downloaded"
    },
    {
        to: "maddoxvillarreal@insource.com",
        title: "Fugiat ea ut enim proident laboris consectetur irure.",
        date: "2024-04-13T11:02:09-03:00",
        status: "downloaded"
    },
    {
        to: "pennyerickson@sealoud.com",
        title: "Tempor cillum aute irure occaecat tempor ut.",
        date: "2022-04-11T09:06:46-03:00",
        status: "not downloaded"
    },
    {
        to: "deanaalford@besto.com",
        title: "Pariatur officia reprehenderit aute nostrud laborum ut quis deserunt exercitation nostrud excepteur.",
        date: "2024-12-25T01:48:09-03:00",
        status: "not downloaded"
    },
    {
        to: "karlaworkman@quizka.com",
        title: "Veniam exercitation sint magna proident enim nisi consequat et in.",
        date: "2024-11-11T12:51:45-03:00",
        status: "downloaded"
    },
    {
        to: "bowersbarlow@accuprint.com",
        title: "Aliquip aliqua Lorem excepteur anim reprehenderit ex ex sunt amet tempor aliquip sit.",
        date: "2021-01-06T12:37:38-03:00",
        status: "not downloaded"
    },
    {
        to: "bowenboyle@schoolio.com",
        title: "Occaecat nostrud in aute eu ullamco culpa cupidatat exercitation pariatur Lorem aliquip.",
        date: "2023-09-18T04:51:17-03:00",
        status: "not downloaded"
    },
    {
        to: "neldashort@tubesys.com",
        title: "Ullamco elit eu ex ea.",
        date: "2021-01-31T11:48:50-03:00",
        status: "not downloaded"
    },
    {
        to: "jarvisberry@aquamate.com",
        title: "Lorem sit dolore eu laboris voluptate ad mollit occaecat id irure commodo irure ipsum ea.",
        date: "2022-12-08T07:44:13-03:00",
        status: "not downloaded"
    },
    {
        to: "tanyahuff@digique.com",
        title: "Nostrud id dolor dolore duis mollit ad excepteur sint occaecat velit eiusmod do pariatur.",
        date: "2020-12-09T09:10:31-03:00",
        status: "not downloaded"
    },
    {
        to: "moonsnyder@kyagoro.com",
        title: "Incididunt eu cupidatat incididunt excepteur in nostrud incididunt.",
        date: "2021-10-16T07:06:20-03:00",
        status: "not downloaded"
    },
    {
        to: "tillmandecker@daido.com",
        title: "Ea enim aute ut do eu adipisicing anim sunt ipsum.",
        date: "2022-03-06T05:27:55-03:00",
        status: "not downloaded"
    },
    {
        to: "bridgeslewis@ersum.com",
        title: "Cillum reprehenderit quis laborum sint consequat fugiat excepteur incididunt.",
        date: "2023-03-30T05:07:59-03:00",
        status: "downloaded"
    },
    {
        to: "ladonnadudley@navir.com",
        title: "Duis eiusmod est sit voluptate nostrud non tempor.",
        date: "2021-08-25T12:44:50-03:00",
        status: "downloaded"
    },
    {
        to: "cassielangley@thredz.com",
        title: "Aute culpa anim irure in velit labore dolore ullamco.",
        date: "2021-04-08T02:52:26-03:00",
        status: "not downloaded"
    },
    {
        to: "pearsoncherry@trollery.com",
        title: "Ut id ipsum enim consectetur tempor officia laborum esse.",
        date: "2022-02-20T09:10:45-03:00",
        status: "downloaded"
    },
    {
        to: "mabelstephens@malathion.com",
        title: "Amet amet voluptate labore enim proident sit velit aliquip sunt.",
        date: "2022-11-17T02:55:14-03:00",
        status: "downloaded"
    },
    {
        to: "rubycalderon@powernet.com",
        title: "Cillum eu commodo ad magna consectetur elit.",
        date: "2020-08-12T11:56:29-03:00",
        status: "not downloaded"
    },
    {
        to: "lopezarnold@solaren.com",
        title: "Laborum minim enim ex dolore incididunt esse magna irure.",
        date: "2023-12-05T10:52:19-03:00",
        status: "not downloaded"
    },
    {
        to: "carolynhogan@geostele.com",
        title: "Reprehenderit reprehenderit in elit veniam laboris cillum nisi.",
        date: "2025-01-28T10:10:55-03:00",
        status: "not downloaded"
    },
    {
        to: "cheriehardy@calcu.com",
        title: "Culpa qui dolore quis tempor incididunt labore qui deserunt ut.",
        date: "2021-06-06T07:44:23-03:00",
        status: "downloaded"
    },
    {
        to: "blakelang@enerforce.com",
        title: "Consequat ullamco irure deserunt Lorem sit occaecat labore esse dolor aliqua ea.",
        date: "2023-07-28T02:05:06-03:00",
        status: "downloaded"
    },
    {
        to: "jodiglass@marketoid.com",
        title: "Laborum Lorem magna qui magna duis velit do.",
        date: "2022-03-17T12:56:17-03:00",
        status: "not downloaded"
    },
    {
        to: "simmonsmolina@geekfarm.com",
        title: "Ex ut dolore cillum adipisicing laborum deserunt consectetur anim proident ex dolor.",
        date: "2024-06-17T08:47:01-03:00",
        status: "not downloaded"
    },
    {
        to: "lawandaburks@manglo.com",
        title: "Mollit ipsum commodo ut dolor quis proident veniam ut esse aute occaecat.",
        date: "2021-02-17T03:13:42-03:00",
        status: "not downloaded"
    },
    {
        to: "harriettfrazier@futurize.com",
        title: "Veniam sunt laboris esse occaecat.",
        date: "2021-01-13T03:02:21-03:00",
        status: "not downloaded"
    },
    {
        to: "scottgould@bezal.com",
        title: "Dolore dolore cillum do aliqua ut laboris aliqua.",
        date: "2024-07-26T08:18:34-03:00",
        status: "not downloaded"
    },
    {
        to: "danaspencer@isodrive.com",
        title: "Ullamco occaecat nulla laborum nisi eu nulla amet ut do reprehenderit ullamco occaecat id esse.",
        date: "2020-05-29T03:02:10-03:00",
        status: "downloaded"
    },
    {
        to: "mariettafarmer@zytrex.com",
        title: "Ad dolore in magna qui.",
        date: "2023-09-04T12:52:40-03:00",
        status: "downloaded"
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
