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
import { UserSelect } from "@/components/userSelect.tsx"
import {useSendFiles} from "@/hooks/useSendFiles.ts";
import Spinner from "@/components/spinner.tsx";
import {toast} from "sonner";
import ShareLinkDialog from "@/components/shareLinkDialog.tsx";

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
    files: File[]
}

const SendFilesDialog: React.FC<SendFilesDialogProps> = ({ open, setOpen, files }) => {
    const { mutate: sendFiles, isPending, isError, error } = useSendFiles();
    const [downloadLink, setDownloadLink] = useState<string | null>(null);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState("")
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [duration, setDuration] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || !message.trim()) {
            alert("Başlık ve mesaj zorunludur.")
            return
        }

        sendFiles(
            {
                title: title,
                message: message,
                files: files
            },
            {
                onSuccess: (resData) => {
                    setOpen(false);

                    if (resData.data?.downloadLink) {
                        setDownloadLink(resData.data.downloadLink);
                        setShowLinkModal(true);
                    } else {
                        toast.success(resData.message);
                    }
                }

            }
        )

    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Dosya Gönder</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="grid gap-4 py-4 w-full">
                        <UserSelect value={selectedUser} onChange={setSelectedUser} />

                        <div className="grid gap-2">
                            <Label htmlFor="title">Başlık</Label>
                            <Input
                                id="title"
                                placeholder="Başlık"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="message">Mesaj</Label>
                            <Textarea
                                id="message"
                                placeholder="Mesajınızı yazın..."
                                className="min-h-[100px] max-h-[150px] resize-y break-all"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>

                        {/*
                        <div className="grid gap-2">
                            <Label>Süre</Label>
                            <Select value={duration} onValueChange={setDuration}>
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
                        </div>*/}

                        <DialogFooter>
                            {isError && (
                                <p className="mt-2 text-sm text-red-500">
                                    {(error as any)?.response?.data?.message || "Giriş sırasında bir hata oluştu."}
                                </p>
                            )}
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <Spinner /> : "Gönder"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>


            <ShareLinkDialog
                showLinkModal={showLinkModal}
                setShowLinkModal={setShowLinkModal}
                downloadLink={downloadLink ?? ""}
            />
        </>
    )
}

export default SendFilesDialog