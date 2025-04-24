import * as React from "react"
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    flexRender,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx"
import { Input } from "@/components/ui/input.tsx"
import {JSX} from "react";

type SharedFile = {
    fileName: string
    sentTo: string
    description: string
}

const data: SharedFile[] = [
    {
        fileName: "id.png",
        sentTo: "vanessaortega@imageflow.com",
        description: "Voluptate quis adipisicing elit aliqua."
    },
    {
        fileName: "sunt.pdf",
        sentTo: "bairdmartin@dancity.com",
        description: "Nostrud in magna esse adipisicing officia enim magna proident ea dolor."
    },
    {
        fileName: "nulla.pdf",
        sentTo: "marisolmcdonald@snowpoke.com",
        description: "Id deserunt quis ea cillum ipsum exercitation commodo officia aliqua non."
    },
    {
        fileName: "consequat.pdf",
        sentTo: "toniahodge@netagy.com",
        description: "Ea culpa ipsum magna cupidatat consequat."
    },
    {
        fileName: "deserunt.pdf",
        sentTo: "minnievasquez@xoggle.com",
        description: "Anim irure nulla deserunt nulla duis consequat consequat minim anim sit magna incididunt sit."
    },
    {
        fileName: "commodo.pdf",
        sentTo: "gomezmckenzie@softmicro.com",
        description: "Reprehenderit adipisicing veniam amet in tempor dolor."
    },
    {
        fileName: "occaecat.pdf",
        sentTo: "garzajohnson@codact.com",
        description: "Tempor non qui ut commodo ex sit."
    },
    {
        fileName: "officia.png",
        sentTo: "minervapowell@extremo.com",
        description: "Anim et magna enim irure ipsum cillum fugiat nostrud et do eu."
    },
    {
        fileName: "non.png",
        sentTo: "gracerich@genesynk.com",
        description: "Et consequat enim magna eiusmod minim."
    },
    {
        fileName: "qui.png",
        sentTo: "carryates@musix.com",
        description: "Quis ipsum Lorem qui cillum esse consequat proident."
    },
    {
        fileName: "velit.png",
        sentTo: "violatran@keeg.com",
        description: "Consectetur sit nostrud elit laboris."
    },
    {
        fileName: "laboris.pdf",
        sentTo: "bethanyodonnell@inquala.com",
        description: "Qui ipsum eu adipisicing cupidatat adipisicing dolor eu."
    },
    {
        fileName: "id.png",
        sentTo: "millicenttate@apex.com",
        description: "Voluptate velit deserunt laborum proident veniam aliqua velit in in cupidatat id enim."
    },
    {
        fileName: "voluptate.pdf",
        sentTo: "keybowman@zensure.com",
        description: "Reprehenderit proident do ipsum sunt laboris excepteur irure deserunt velit dolore anim reprehenderit do."
    },
    {
        fileName: "qui.pdf",
        sentTo: "pagekline@pearlessa.com",
        description: "Nulla esse dolore ea duis."
    },
    {
        fileName: "esse.pdf",
        sentTo: "cecileball@skinserve.com",
        description: "Officia dolore officia id deserunt Lorem commodo labore dolor in aliquip qui excepteur."
    },
    {
        fileName: "nisi.png",
        sentTo: "altheawall@speedbolt.com",
        description: "Laborum ut exercitation mollit et irure veniam aliquip sunt cupidatat ullamco nulla."
    },
    {
        fileName: "qui.pdf",
        sentTo: "headwalter@micronaut.com",
        description: "Dolor do pariatur ea enim ullamco reprehenderit anim sunt voluptate est eu mollit occaecat."
    },
    {
        fileName: "pariatur.pdf",
        sentTo: "lindsaymoon@miracula.com",
        description: "Consectetur est esse enim deserunt eu officia occaecat laboris aute eu pariatur amet aliquip in."
    },
    {
        fileName: "laborum.pdf",
        sentTo: "cainflowers@enersol.com",
        description: "In anim in magna ex adipisicing magna id commodo nostrud nisi esse."
    },
    {
        fileName: "est.png",
        sentTo: "mileshead@moltonic.com",
        description: "Reprehenderit consectetur eu ad velit eu voluptate reprehenderit laborum."
    },
    {
        fileName: "ad.pdf",
        sentTo: "aishavelasquez@junipoor.com",
        description: "Aliquip laboris ut laboris Lorem."
    },
    {
        fileName: "veniam.pdf",
        sentTo: "jolenearnold@combot.com",
        description: "Consectetur sint laborum dolore anim exercitation ad adipisicing sunt qui."
    },
    {
        fileName: "sit.pdf",
        sentTo: "summerssalinas@ovolo.com",
        description: "Ut qui voluptate Lorem voluptate excepteur duis tempor ea consequat irure do anim."
    },
    {
        fileName: "irure.pdf",
        sentTo: "markspoole@quonata.com",
        description: "Veniam magna enim officia excepteur consequat aliquip magna fugiat in fugiat cupidatat amet non."
    },
    {
        fileName: "veniam.pdf",
        sentTo: "ruthieneal@calcula.com",
        description: "Magna id ullamco aliqua ea occaecat eu ad irure ex nisi magna ex sit."
    },
    {
        fileName: "qui.pdf",
        sentTo: "estherochoa@kangle.com",
        description: "Adipisicing do nisi elit amet eiusmod sunt sint.Adipisicing do nisi elit amet eiusmod sunt sint.Adipisicing do nisi elit amet eiusmod sunt sint.Adipisicing do nisi elit amet eiusmod sunt sint.s"
    },
    {
        fileName: "Lorem.pdf",
        sentTo: "michaelconley@digirang.com",
        description: "Velit et dolor pariatur non eiusmod officia laboris aliquip adipisicing dolore."
    },
    {
        fileName: "aliquip.png",
        sentTo: "abbykerr@zuvy.com",
        description: "Laborum voluptate et nulla excepteur mollit ut ad tempor in."
    },
    {
        fileName: "anim.pdf",
        sentTo: "guysuarez@boink.com",
        description: "Ea fugiat eu velit ea nostrud nisi do dolor esse qui."
    },
    {
        fileName: "occaecat.png",
        sentTo: "rodriqueztrujillo@papricut.com",
        description: "Aute mollit anim duis ullamco aliquip aute amet ullamco sit qui pariatur elit."
    },
    {
        fileName: "elit.png",
        sentTo: "dyermerrill@digigen.com",
        description: "Elit irure laboris pariatur consectetur ex adipisicing cillum eu incididunt ad."
    },
    {
        fileName: "reprehenderit.pdf",
        sentTo: "hestercarver@puria.com",
        description: "Eiusmod voluptate incididunt ex ipsum dolor occaecat deserunt duis laboris minim ipsum magna cillum."
    },
    {
        fileName: "laboris.pdf",
        sentTo: "wildaday@eternis.com",
        description: "Laborum consequat nulla fugiat minim exercitation elit excepteur et eiusmod."
    },
    {
        fileName: "eiusmod.pdf",
        sentTo: "mcleodhendrix@marqet.com",
        description: "Nulla sint irure tempor deserunt voluptate Lorem consequat eu in culpa aliqua aliquip."
    },
    {
        fileName: "ea.pdf",
        sentTo: "inamccormick@kegular.com",
        description: "Proident adipisicing amet laborum irure amet pariatur aliqua fugiat exercitation fugiat ipsum ut."
    },
    {
        fileName: "fugiat.png",
        sentTo: "fultonray@bunga.com",
        description: "Nulla veniam ad nisi adipisicing duis magna sint."
    },
    {
        fileName: "id.pdf",
        sentTo: "adkinshoffman@tubesys.com",
        description: "Ex et eu ullamco culpa ullamco officia do voluptate sit irure ex consectetur in cillum."
    },
    {
        fileName: "nostrud.pdf",
        sentTo: "maryannwagner@zepitope.com",
        description: "Veniam consectetur amet pariatur duis ut ut enim et magna nulla qui cillum."
    },
    {
        fileName: "exercitation.pdf",
        sentTo: "samanthamolina@besto.com",
        description: "Mollit in id magna elit."
    },
    {
        fileName: "occaecat.pdf",
        sentTo: "guthriecraig@assurity.com",
        description: "Aliqua qui anim nisi excepteur dolor adipisicing ad reprehenderit nisi eiusmod do."
    },
    {
        fileName: "aute.png",
        sentTo: "churchfisher@thredz.com",
        description: "Culpa ex irure pariatur eu ipsum consequat ipsum est nostrud reprehenderit exercitation velit labore."
    },
    {
        fileName: "excepteur.pdf",
        sentTo: "maddoxrosario@niquent.com",
        description: "Laboris anim fugiat consequat elit sunt amet cillum duis dolore duis eiusmod."
    },
    {
        fileName: "excepteur.pdf",
        sentTo: "vancelangley@netbook.com",
        description: "Dolore dolore ut nisi velit labore eu pariatur anim eiusmod sint."
    },
    {
        fileName: "do.pdf",
        sentTo: "steelesmith@comfirm.com",
        description: "Id deserunt minim id ut veniam ipsum."
    },
    {
        fileName: "sunt.png",
        sentTo: "ashleymaynard@rodemco.com",
        description: "Est incididunt eiusmod duis ex amet minim velit consequat nisi nulla eiusmod."
    },
    {
        fileName: "elit.pdf",
        sentTo: "carrollkey@quailcom.com",
        description: "Minim reprehenderit laboris incididunt minim velit."
    },
    {
        fileName: "id.png",
        sentTo: "doloreslloyd@zanymax.com",
        description: "Fugiat excepteur ad officia ipsum."
    },
    {
        fileName: "commodo.pdf",
        sentTo: "hansenhebert@infotrips.com",
        description: "Irure occaecat consectetur occaecat ipsum."
    },
    {
        fileName: "cillum.pdf",
        sentTo: "woodsstone@assistia.com",
        description: "Veniam id voluptate officia mollit ex tempor tempor nostrud excepteur laborum adipisicing exercitation in ad."
    },
    {
        fileName: "anim.png",
        sentTo: "jimenezhays@tingles.com",
        description: "Cupidatat enim est irure fugiat magna mollit."
    },
    {
        fileName: "mollit.pdf",
        sentTo: "langmartinez@kyagoro.com",
        description: "Magna consequat sit ullamco Lorem enim non est irure."
    },
    {
        fileName: "ullamco.png",
        sentTo: "mariettacalhoun@buzzness.com",
        description: "Voluptate tempor dolore anim laborum sunt amet magna Lorem laboris exercitation dolore eu nisi."
    },
    {
        fileName: "sunt.pdf",
        sentTo: "talleymcbride@twiggery.com",
        description: "Esse aliquip et aliqua id eu voluptate anim."
    },
    {
        fileName: "magna.pdf",
        sentTo: "rosiechase@pathways.com",
        description: "Duis culpa nulla velit cillum consectetur aliqua ipsum dolore reprehenderit esse eu."
    },
    {
        fileName: "cillum.pdf",
        sentTo: "bernicebriggs@roboid.com",
        description: "Excepteur et veniam mollit reprehenderit officia ut tempor."
    },
    {
        fileName: "excepteur.pdf",
        sentTo: "stellagilbert@unia.com",
        description: "Eiusmod veniam exercitation irure quis excepteur laboris reprehenderit excepteur excepteur aliquip."
    },
    {
        fileName: "enim.png",
        sentTo: "porterwilkinson@quadeebo.com",
        description: "Minim Lorem sunt laboris minim deserunt irure magna nostrud qui veniam."
    },
    {
        fileName: "exercitation.pdf",
        sentTo: "rossmitchell@entality.com",
        description: "Aliquip nisi labore ullamco mollit magna amet."
    },
    {
        fileName: "eiusmod.pdf",
        sentTo: "elisabethbarr@dentrex.com",
        description: "Nisi ut qui reprehenderit eu ad aliquip in dolore."
    },
    {
        fileName: "eu.pdf",
        sentTo: "saundersforbes@eplosion.com",
        description: "Tempor tempor sunt tempor reprehenderit reprehenderit aliquip elit minim sint elit do laboris sunt."
    },
    {
        fileName: "esse.png",
        sentTo: "dixiebeck@visalia.com",
        description: "Aliquip in aliquip reprehenderit velit veniam elit consequat commodo ad esse."
    },
    {
        fileName: "commodo.pdf",
        sentTo: "leonabonner@comtrail.com",
        description: "Cupidatat Lorem enim duis eu excepteur cillum do exercitation deserunt laboris Lorem."
    },
    {
        fileName: "officia.pdf",
        sentTo: "henrymurray@lexicondo.com",
        description: "Eiusmod mollit esse sint voluptate occaecat minim sit laboris id in est labore culpa enim."
    },
    {
        fileName: "sit.pdf",
        sentTo: "christianwelch@talendula.com",
        description: "Consequat irure amet esse elit labore cillum id in ullamco sunt ipsum."
    },
    {
        fileName: "duis.pdf",
        sentTo: "housesharpe@orbixtar.com",
        description: "Aliquip quis nostrud sint esse commodo nulla nisi mollit eiusmod in."
    },
    {
        fileName: "cupidatat.png",
        sentTo: "taylorpena@emergent.com",
        description: "Lorem excepteur eu incididunt laboris excepteur aliquip fugiat minim duis Lorem reprehenderit minim irure ullamco."
    },
    {
        fileName: "in.pdf",
        sentTo: "lucaswaller@exostream.com",
        description: "Ullamco et ut eiusmod dolor quis proident aute fugiat excepteur elit est amet incididunt eu."
    },
    {
        fileName: "eu.pdf",
        sentTo: "briggsfox@entroflex.com",
        description: "Est velit consequat nulla in incididunt laborum veniam exercitation exercitation quis duis mollit voluptate culpa."
    },
    {
        fileName: "duis.png",
        sentTo: "jamesknox@insurety.com",
        description: "Fugiat ullamco fugiat proident et elit culpa enim fugiat sunt minim enim."
    },
    {
        fileName: "sint.pdf",
        sentTo: "carolegutierrez@overfork.com",
        description: "Aute velit aliqua eiusmod irure veniam cillum ut id adipisicing voluptate cupidatat."
    },
    {
        fileName: "eu.png",
        sentTo: "foxgaines@dreamia.com",
        description: "Veniam nisi aute labore magna enim exercitation in minim aute et est eiusmod ad enim."
    },
    {
        fileName: "quis.png",
        sentTo: "tanishakramer@immunics.com",
        description: "Velit eiusmod minim laborum laboris pariatur proident do tempor commodo occaecat eu."
    },
    {
        fileName: "duis.png",
        sentTo: "ethellevy@norsul.com",
        description: "Incididunt est incididunt voluptate do incididunt est exercitation id consectetur sunt."
    },
    {
        fileName: "irure.pdf",
        sentTo: "concettapage@confrenzy.com",
        description: "In veniam eiusmod anim consequat ipsum tempor incididunt ullamco culpa ex."
    },
    {
        fileName: "magna.png",
        sentTo: "cottonwoodard@flumbo.com",
        description: "Aute labore aliqua commodo tempor magna quis eu magna qui amet magna amet eiusmod do."
    },
    {
        fileName: "eiusmod.pdf",
        sentTo: "tysongarrison@zappix.com",
        description: "Magna dolore commodo excepteur eiusmod proident fugiat dolor ex labore enim reprehenderit incididunt."
    },
    {
        fileName: "fugiat.png",
        sentTo: "everettcochran@otherside.com",
        description: "Ut exercitation duis aliqua duis ex proident duis sint sit veniam labore tempor."
    },
    {
        fileName: "nulla.png",
        sentTo: "sherifrench@zoarere.com",
        description: "Eiusmod tempor dolore officia velit est nulla."
    },
    {
        fileName: "amet.png",
        sentTo: "leannedawson@vendblend.com",
        description: "Ipsum ea consectetur dolor Lorem enim qui cupidatat ullamco laboris."
    },
    {
        fileName: "mollit.pdf",
        sentTo: "rayweber@shopabout.com",
        description: "Ipsum eiusmod amet proident commodo officia minim occaecat officia ex consequat nisi."
    },
    {
        fileName: "magna.pdf",
        sentTo: "blevinswatts@cincyr.com",
        description: "Tempor irure duis amet sint aute consequat pariatur."
    },
    {
        fileName: "elit.pdf",
        sentTo: "faithcabrera@hivedom.com",
        description: "Duis ut irure amet reprehenderit consequat qui adipisicing deserunt quis adipisicing laboris Lorem elit."
    },
    {
        fileName: "laboris.png",
        sentTo: "chenjones@asimiline.com",
        description: "Minim adipisicing ex nostrud aliquip ipsum reprehenderit aliqua nisi ullamco laboris proident minim proident reprehenderit."
    },
    {
        fileName: "dolor.png",
        sentTo: "fowlercase@stockpost.com",
        description: "Officia voluptate veniam mollit mollit deserunt dolore ad."
    },
    {
        fileName: "dolor.pdf",
        sentTo: "fostersanford@tourmania.com",
        description: "Incididunt anim qui dolore nostrud nisi amet deserunt."
    },
    {
        fileName: "ad.png",
        sentTo: "ermahansen@isonus.com",
        description: "Qui do eiusmod non magna cillum reprehenderit exercitation aute deserunt proident qui."
    },
    {
        fileName: "anim.png",
        sentTo: "pattonmcconnell@handshake.com",
        description: "Fugiat occaecat veniam ea occaecat."
    },
    {
        fileName: "labore.png",
        sentTo: "marshratliff@empirica.com",
        description: "Anim dolore ea ex amet mollit ad voluptate excepteur et mollit aute laborum."
    },
    {
        fileName: "non.pdf",
        sentTo: "stacycaldwell@oronoko.com",
        description: "Ullamco ex excepteur nisi voluptate velit."
    },
    {
        fileName: "dolor.png",
        sentTo: "drakeleach@stelaecor.com",
        description: "Excepteur aliqua sunt minim anim consectetur."
    },
    {
        fileName: "nisi.png",
        sentTo: "butlerferrell@zidant.com",
        description: "Ea commodo nulla minim irure aliquip voluptate eu Lorem."
    },
    {
        fileName: "culpa.png",
        sentTo: "hobbsbeasley@moreganic.com",
        description: "Ut sint enim est dolor proident mollit fugiat culpa cillum sint aliqua."
    },
    {
        fileName: "dolore.pdf",
        sentTo: "barnettbartlett@ginkogene.com",
        description: "Dolor consectetur dolor Lorem fugiat pariatur voluptate enim fugiat duis eu exercitation."
    },
    {
        fileName: "fugiat.png",
        sentTo: "katherynpalmer@securia.com",
        description: "Non eiusmod deserunt culpa est do officia labore occaecat."
    },
    {
        fileName: "adipisicing.pdf",
        sentTo: "hutchinsonpowers@recritube.com",
        description: "Laborum eiusmod duis nisi aute in."
    },
    {
        fileName: "proident.pdf",
        sentTo: "leemorris@namegen.com",
        description: "Ipsum elit esse sit nulla reprehenderit veniam officia adipisicing dolor proident nulla commodo elit eu."
    },
    {
        fileName: "et.pdf",
        sentTo: "valenciasnow@geekol.com",
        description: "Eu magna duis id labore officia est deserunt laboris do ut proident aliqua."
    },
    {
        fileName: "sunt.pdf",
        sentTo: "hensleyhinton@animalia.com",
        description: "Labore ad velit qui eu."
    },
    {
        fileName: "do.pdf",
        sentTo: "juliasteele@bitendrex.com",
        description: "Sunt esse ullamco cillum qui ea proident anim ut cupidatat labore."
    }
];

const columns: ColumnDef<SharedFile>[] = [
    {
        accessorKey: "fileName",
        header: "Dosya Adı",
        cell: ({ row }) => <div className="font-medium">{row.getValue("fileName")}</div>,
    },
    {
        accessorKey: "sentTo",
        header: "Gönderilen",
        cell: ({ row }) => <div>{row.getValue("sentTo")}</div>,
    },
    {
        accessorKey: "description",
        header: "Açıklama",
        cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
]

export default function SharedByMeTabContent(): JSX.Element {
    const [filter, setFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {},
    })

    return (
        <div className="w-full h-full flex flex-col">
            <div className="py-4">
                <Input
                    placeholder="Dosya adına göre filtrele..."
                    value={filter}
                    onChange={(event) => setFilter(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="flex-1 overflow-auto rounded-md border">
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
                                        <TableCell key={cell.id} className="align-top px-4 py-2">
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
}
