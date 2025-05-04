import {useState} from "react"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {UserSelect} from "@/components/userSelect.tsx"
import {useSendFiles} from "@/hooks/useSendFiles.ts";
import Spinner from "@/components/spinner.tsx";
import {toast} from "sonner";
import ShareLinkDialog from "@/components/shareLinkDialog.tsx";
import {Progress} from "./ui/progress"
import {UserModel} from "@/models/userModel.ts";
import {useAuth} from "@/context/authContext.tsx";

type SendFilesDialogProps = {
    open: boolean
    setOpen: (open: boolean) => void
    files: File[]
    setFiles: (files: File[]) => void
}

const SendFilesDialog: React.FC<SendFilesDialogProps> = ({open, setOpen, files, setFiles}) => {
    const {mutate: sendFiles, isPending} = useSendFiles();
    const {isAuthenticated} = useAuth()

    const [downloadLink, setDownloadLink] = useState<string | null>(null);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserModel | undefined>();
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    const [uploadProgress, setUploadProgress] = useState<number>(0);

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
                files: files,
                receiverId: selectedUser?.id,
                onProgress: (e) => setUploadProgress(e),
            },
            {
                onSuccess: (resData) => {
                    if (resData.data?.downloadLink) {
                        setDownloadLink(resData.data.downloadLink);
                        setShowLinkModal(true);
                    } else {
                        toast.success(resData.message);
                    }

                    setTitle("");
                    setMessage("");
                    setSelectedUser(undefined);
                    setUploadProgress(0);
                    setOpen(false);
                    setFiles([]);
                }
            }
        )
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className={"max-h-[90vh] overflow-y-auto"}>
                    <DialogHeader>
                        <DialogTitle>Dosya Gönder</DialogTitle>
                    </DialogHeader>

                    {isPending && (
                        <div className="w-full py-2">
                            <Label>Yükleme Durumu</Label>
                            <Progress value={uploadProgress} className="mt-1 h-3"/>
                            <p className="text-sm mt-1 text-muted-foreground">{uploadProgress}%</p>
                        </div>
                    )}

                    {
                        uploadProgress == 100 && isPending && (
                            <div className="w-full py-2">
                                <Label>İşleniyor</Label>
                            </div>
                        )
                    }

                    {
                        !isPending && (
                            <form onSubmit={handleSubmit} className="grid gap-4 py-4 w-full">
                                {
                                    isAuthenticated && (
                                        <UserSelect value={selectedUser} onChange={setSelectedUser}/>
                                    )
                                }

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

                                <DialogFooter>
                                    <Button type="submit" disabled={isPending}>
                                        {isPending ? <Spinner/> : "Gönder"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        )
                    }
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