import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
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
import { useDebounce } from "@/hooks/useDebounce.ts";
import { useListUser } from "@/hooks/useListUser.ts";
import { UserModel } from "@/models/userModel.ts";

export function UserSelect({
                               value,
                               onChange,
                           }: {
    value?: UserModel
    onChange: (val: UserModel) => void
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);

    const shouldFetch = debouncedSearch.length >= 3;

    const { data, isLoading } = useListUser(shouldFetch ? debouncedSearch : undefined);
    const users = data?.data || [];

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
                        {value?.displayName || "Kullanıcı seçin..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" side="top" className="p-0 w-full">
                    <Command className="max-h-full">
                        <CommandInput
                            placeholder="Kullanıcı ara (en az 3 karakter)..."
                            className="h-9"
                            value={search}
                            onValueChange={setSearch}
                        />
                        <CommandList className="max-h-64 overflow-auto">
                            {!shouldFetch ? (
                                <div className="px-4 py-2 text-sm text-muted-foreground">
                                    Aramak için en az 3 karakter girin.
                                </div>
                            ) : isLoading ? (
                                <div className="px-4 py-2 text-sm text-muted-foreground">
                                    Yükleniyor...
                                </div>
                            ) : users.length === 0 ? (
                                <div className="px-4 py-2 text-sm text-muted-foreground">
                                    Kullanıcı bulunamadı.
                                </div>
                            ) : (
                                <CommandGroup>
                                    {users.map((user: UserModel) => (
                                        <CommandItem
                                            key={user.id}
                                            value={user.displayName}
                                            onSelect={() => {
                                                onChange(user);
                                                setOpen(false);
                                            }}
                                        >
                                            {user.displayName}
                                            <Check
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    value?.id === user.id ? "opacity-100 text-green-500" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}