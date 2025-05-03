import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog.tsx"
import {useAdminDeleteShare} from "@/hooks/admin/useAdminDeleteShare.ts";
import {toast} from "sonner";
import {useQueryClient} from "@tanstack/react-query";

type DeleteAlertDialogProps = {
    open: boolean;
    onClose: () => void;
    selectedShareId: number
}

const AdminDeleteShareAlertDialog = ({open, onClose, selectedShareId}:DeleteAlertDialogProps) => {
    const { mutate, isPending } = useAdminDeleteShare();
    const queryClient = useQueryClient();

    return (
        <AlertDialog open={open} onOpenChange={onClose} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Silmek istediğinizden emin misiniz ?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            onClose()
                        }}>İptal</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            mutate({
                                shareId: selectedShareId
                            },
                                {
                                    onSuccess: () => {
                                        toast.success("Başarıyla silindi.");
                                        queryClient.invalidateQueries({
                                            queryKey: ["adminFiles"]
                                        }).then(() => {
                                            onClose()
                                        })
                                    }
                                }
                            )
                        }}
                        disabled={isPending}
                    >{
                        isPending ? "Yükleniyor" : "Devam et"
                    }</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AdminDeleteShareAlertDialog;