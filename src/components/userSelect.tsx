import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"

const users = [
    "Beth Hebert",
    "Gay Williamson",
    "Fleming Beard",
    "Case Booker",
    "Amanda Hunter",
    "Jaclyn Carlson",
    "Helga Miller",
    "Oneill Davidson",
    "Reese Pena",
    "Todd Lewis",
    "Flynn Dillard",
    "Jordan Dalton",
    "Simone Wells",
    "Glenn Reilly",
    "Stefanie Gilmore",
    "Conway Rodriquez",
    "Hodges Obrien",
    "Holly Morrow",
    "Judith Shelton",
    "Lorena Morrison",
    "Nellie Sears",
    "Shelby Lawrence",
    "Gracie Taylor",
    "Griffith Mcgowan",
    "Watts Harrington",
    "Emilia Boyd",
    "Letha Shields",
    "Raquel Pugh",
    "Lorraine Mayer",
    "Russo Cameron",
    "Britney Wilder",
    "Katie Henry",
    "Julia Simpson",
    "Moody Mccarthy",
    "Justine Gay",
    "Mejia Lynch",
    "Mercado Chavez",
    "Pitts Eaton",
    "Lelia Ortega",
    "Mallory Nicholson",
    "Jones Dudley",
    "Laura Atkins",
    "Holman Mills",
    "Therese Everett",
    "Vaughan Dorsey",
    "Mccarty Ochoa",
    "Rodriquez Rivas",
    "Hensley Marquez",
    "Pope Kline",
    "Hernandez Fields",
    "Tessa Kennedy",
    "Brooks Petty",
    "Ernestine Wiley",
    "Beverly Chase",
    "Carole Morris",
    "Mcdonald Yang",
    "Paula Murphy",
    "Burks Wilson",
    "Hayes Bullock",
    "Cathryn Schwartz",
    "Roxie Burns",
    "Marguerite Farley",
    "Ashlee Richards",
    "Brenda Reynolds",
    "Sasha Rojas",
    "Vance Owen",
    "Latoya Carr",
    "Elaine Meadows",
    "Bridges Conway",
    "Zamora Webster",
    "Lillian Hill",
    "Lynch Fox",
    "Mann Mckenzie",
    "Combs Richardson",
    "Audrey Hoover",
    "Trevino Andrews",
    "Britt Norton",
    "Lea Joyner",
    "Carpenter Lloyd",
    "Carson Daniel",
    "Snow Holloway",
    "Rogers Mckay",
    "Robbie Estes",
    "Sheri Steele",
    "Chan Woodard",
    "Ball Wilkinson",
    "Garrett Coffey",
    "Watkins Reed",
    "Coffey Grimes",
    "Walton Padilla",
    "Verna Kidd",
    "Browning Clements",
    "Waller Ferrell",
    "Dolores Vazquez",
    "Clarissa Floyd",
    "Middleton King",
    "Molly Collier",
    "Deann Lambert",
    "Teri Sharp",
    "Cross Terrell"
];

export function UserSelect({
                               value,
                               onChange,
                           }: {
    value: string
    onChange: (val: string) => void
}) {
    const [open, setOpen] = useState(false)

    return (
        <div className="grid gap-2">
            <Label>Kime Gönderilecek</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {value || "Kullanıcı seçin..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" side={"top"} className="p-0">
                    <Command className="max-h-full">
                        <CommandInput placeholder="Kullanıcı ara..." className="h-9" />
                        <CommandList className="max-h-64 overflow-auto">
                            <CommandEmpty>Kullanıcı bulunamadı.</CommandEmpty>
                            <CommandGroup>
                                {users.map((user) => (
                                    <CommandItem
                                        key={user}
                                        value={user}
                                        onSelect={(currentValue) => {
                                            onChange(currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {user}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                value === user ? "opacity-100 text-green-500" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
