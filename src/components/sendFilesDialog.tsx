"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const users = [
    "Ahmet Yılmaz",
    "Zeynep Kılıç",
    "Burak Demir",
    "Elif Şahin",
    "Mehmet Yıldız",
    "Ayşe Güneş",
    "Canan Arslan",
]

const durations = ["1 gün", "3 gün", "1 hafta", "Süresiz"]

type SendFilesDialogProps = {
    open: boolean
    setOpen: (open: boolean) => void
}

const SendFilesDialog: React.FC<SendFilesDialogProps> = ({ open, setOpen }) => {
    const [search, setSearch] = useState("")
    const [selectedUsers, setSelectedUers] = useState<string[]>([])
    const [password, setPassword] = useState("")
    const [duration, setDuration] = useState("1 gün")

    const filteredUsers = users.filter((u) =>
        u.toLowerCase().includes(search.toLowerCase())
    )

    const toggleUser = (name: string) => {
        setSelectedUers((prev) =>
            prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
        )
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dosya Gönder</DialogTitle>
                    <DialogDescription>
                        Başlık, mesaj, şifre ve alıcı bilgilerini girerek dosyayı paylaş.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4 w-full">
                    <div>
                        <Label htmlFor="title" className="mb-1">Başlık</Label>
                        <Input id="title" placeholder="Dosya başlığı" />
                    </div>

                    <div>
                        <Label htmlFor="message" className="mb-1">Mesaj</Label>
                        <Textarea
                            id="message"
                            placeholder="Mesajınızı yazın..."
                            className="min-h-[100px] max-h-[150px] resize-y break-all"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:flex-1">
                            <Label htmlFor="password" className="mb-1">Şifre (opsiyonel)</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Şifre belirle..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="sm:flex-1">
                            <Label className="mb-1">Süre</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full text-left">
                                        {duration}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-full">
                                    {durations.map((item) => (
                                        <DropdownMenuItem
                                            key={item}
                                            onClick={() => setDuration(item)}
                                        >
                                            {item}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="search" className="mb-1">Kime Gönderilecek</Label>
                        <Input
                            id="search"
                            placeholder="Kullanıcı ara..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ScrollArea className="h-40 mt-2 rounded border">
                            {filteredUsers.map((name) => (
                                <div
                                    key={name}
                                    className={`cursor-pointer px-4 py-2 hover:bg-accent ${
                                        selectedUsers.includes(name) ? "bg-green-50 font-medium hover:bg-green-100" : ""
                                    }`}
                                    onClick={() => toggleUser(name)}
                                >
                                    {name}
                                    {selectedUsers.includes(name) && (
                                        <span className="ml-2 text-green-500">✓</span>
                                    )}
                                </div>
                            ))}
                            {filteredUsers.length === 0 && (
                                <div className="p-4 text-sm text-muted-foreground">
                                    Eşleşen kullanıcı bulunamadı.
                                </div>
                            )}
                        </ScrollArea>
                    </div>
                </div>

                <DialogFooter>
                    <Button type="submit">Gönder</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SendFilesDialog
