import * as React from "react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {DetailedUserModel} from "@/models/admin/detailedUserModel.ts";
import {useAdminUpdateUserUploadSize} from "@/hooks/admin/useAdminUpdateUserUploadSize.ts";
import {toast} from "sonner";
import {useQueryClient} from "@tanstack/react-query";

type Props = {
    open: boolean;
    onClose: () => void;
    defaultValue: number;
    selectedUser: DetailedUserModel;
};

const UpdateUploadSizeDialog = ({ open, onClose, defaultValue, selectedUser }: Props) => {
    const [value, setValue] = React.useState(defaultValue);
    const { mutate, isPending } = useAdminUpdateUserUploadSize();
    const queryClient = useQueryClient();

    React.useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    const handleSaveNewSize = (newSize: number) => {
        if (!selectedUser) return;

        mutate(
            {
                userId: selectedUser.id,
                maxUploadSize: newSize,
            },
            {
                onSuccess: () => {
                    toast.success("Yükleme kapasitesi başarıyla güncellendi.");
                    queryClient.invalidateQueries({
                        queryKey: ["adminUsers"]
                    });
                    onClose();
                },
                onError: (err: any) => {
                    toast.error(err.response.data.message);
                    console.error("Güncelleme hatası:", err);
                }
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yükleme Kapasitesini Güncelle</DialogTitle>
                </DialogHeader>
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                />
                <DialogFooter className="mt-4">
                    <Button onClick={() => handleSaveNewSize(value)}>{isPending ? "Yükleniyor" : "Kaydet"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateUploadSizeDialog;
