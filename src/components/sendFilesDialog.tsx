import {useState} from "react"
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Button} from "@/components/ui/button"
import {UserSelect} from "@/components/userSelect.tsx"
import {useSendFiles} from "@/hooks/useSendFiles.ts";
import Spinner from "@/components/spinner.tsx";
import {toast} from "sonner";
import ShareLinkDialog from "@/components/shareLinkDialog.tsx";
import {UserModel} from "@/models/userModel.ts";
import {useAuth} from "@/context/authContext.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";

import {Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Progress} from "@/components/ui/progress.tsx";

type SendFilesDialogProps = {
    open: boolean
    setOpen: (open: boolean) => void
    files: File[]
    setFiles: (files: File[]) => void
}

const durations = [
    {label: "1 Gün", value: "1"},
    {label: "2 Gün", value: "2"},
    {label: "3 Gün", value: "3"},
    {label: "1 Hafta", value: "7"},
    {label: "1 Ay", value: "30"}
];

const formSchema = z.object({
    title: z.string().min(1, "Başlık zorunludur."),
    message: z.string().min(1, "Mesaj zorunludur."),
    duration: z.string().min(1, "Süre seçimi zorunludur.")
});

type FormSchema = z.infer<typeof formSchema>

const SendFilesDialog: React.FC<SendFilesDialogProps> = ({open, setOpen, files, setFiles}) => {
    const {mutate: sendFiles, isPending} = useSendFiles();
    const {isAuthenticated} = useAuth();

    const [downloadLink, setDownloadLink] = useState<string | null>(null);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserModel | undefined>();
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            message: "",
            duration: "1"
        }
    });

    const handleSubmit = (values: FormSchema) => {
        if (!files.length) {
            toast.error("Dosya seçilmedi.");
            return;
        }

        sendFiles({
            title: values.title,
            message: values.message,
            files: files,
            receiverId: selectedUser?.id,
            onProgress: (e) => setUploadProgress(e),
            expireOption: values.duration
        }, {
            onSuccess: (resData) => {
                if (resData.data?.downloadLink) {
                    setDownloadLink(resData.data.downloadLink);
                    setShowLinkModal(true);
                } else {
                    toast.success(resData.message);
                }

                form.reset();
                setSelectedUser(undefined);
                setUploadProgress(0);
                setOpen(false);
                setFiles([]);
            }
        });
    };

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

                    {uploadProgress === 100 && isPending && (
                        <div className="w-full py-2">
                            <Label>İşleniyor</Label>
                        </div>
                    )}

                    {!isPending && (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-4 py-4 w-full">
                                {isAuthenticated && (
                                    <UserSelect value={selectedUser} onChange={setSelectedUser}/>
                                )}

                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Başlık</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Başlık" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Mesaj</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Mesajınızı yazın..."
                                                    className="min-h-[100px] max-h-[150px] resize-y break-all"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                {isAuthenticated && (
                                    <FormField
                                        control={form.control}
                                        name="duration"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Süre</FormLabel>
                                                <FormControl>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Saklanacak süre"/>
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
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                )}

                                <DialogFooter>
                                    <Button type="submit" disabled={isPending}>
                                        {isPending ? <Spinner/> : "Gönder"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    )}
                </DialogContent>
            </Dialog>

            <ShareLinkDialog
                showLinkModal={showLinkModal}
                setShowLinkModal={setShowLinkModal}
                downloadLink={downloadLink ?? ""}
            />
        </>
    );
};

export default SendFilesDialog;