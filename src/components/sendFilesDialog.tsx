import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {UserSelect} from "@/components/userSelect.tsx";

const durations = [
    { label: "1 Gün", value: "one_day" },
    { label: "2 Gün", value: "two_days" },
    { label: "3 Gün", value: "three_days" },
    { label: "1 Hafta", value: "one_week" },
    { label: "1 Ay", value: "one_month" },
    { label: "Süresiz", value: "indefinite" },
]

type SendFilesDialogProps = {
    open: boolean
    setOpen: (open: boolean) => void
}

const SendFilesDialog: React.FC<SendFilesDialogProps> = ({ open, setOpen }) => {
    const [password, setPassword] = useState("")
    const [selectedUser, setSelectedUser] = useState("")

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Dosya Gönder</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4 w-full">
                    <div className={"grid gap-2"}>
                        <Label htmlFor="title">Başlık</Label>
                        <Input id="title" placeholder="Başlık" />
                    </div>

                    <div className={"grid gap-2"}>
                        <Label htmlFor="message">Mesaj</Label>
                        <Textarea
                            id="message"
                            placeholder="Mesajınızı yazın..."
                            className="min-h-[100px] max-h-[150px] resize-y break-all"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:flex-1 grid gap-2">
                            <Label htmlFor="password">Şifre (opsiyonel)</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Şifre belirle..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="sm:flex-1 grid gap-2">
                            <Label>Süre</Label>
                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Saklanacak süre" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {durations.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <UserSelect value={selectedUser} onChange={setSelectedUser} />
                </div>

                <DialogFooter>
                    <Button type="submit">Gönder</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SendFilesDialog
