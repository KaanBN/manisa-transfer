import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl, FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { DetailedUserModel } from "@/models/admin/detailedUserModel.ts";
import { useEffect, useState } from "react";
import { useAdminUpdateUser } from "@/hooks/admin/useAdminUpdateUser.ts";
import {
    convertBetweenUnits,
    convertFromBytes,
    convertToBytes,
    getBestUnit,
    SizeUnit
} from "@/lib/byteConverterHelper.ts";

type Props = {
    open: boolean;
    onClose: () => void;
    selectedUser: DetailedUserModel;
};

const formSchema = z.object({
    name: z.string().min(1, "İsim zorunludur."),
    username: z.string().min(1, "Kullanıcı adı zorunludur."),
    password: z.string().optional(),
    max_upload_size: z
        .union([z.coerce.number().min(0, "Geçerli bir sayı girin."), z.literal(null)])
        .optional(),
    size_unit: z.enum(["B", "KB", "MB", "GB", "TB"] as const),
    role: z.enum(["user", "admin"], {
        required_error: "Rol seçimi zorunludur.",
    }),
});

export function UpdateUserDialog({ open, onClose, selectedUser }: Props) {
    const { mutate, isPending } = useAdminUpdateUser();
    const [sizeUnit, setSizeUnit] = useState<SizeUnit>("MB");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            password: undefined,
            max_upload_size: undefined,
            size_unit: "MB",
            role: undefined,
        },
    });

    const queryClient = useQueryClient();

    useEffect(() => {
        if (selectedUser) {
            const bestUnit = selectedUser.maxUploadSize
                ? getBestUnit(selectedUser.maxUploadSize)
                : "MB";

            setSizeUnit(bestUnit);

            form.reset({
                name: selectedUser.displayName,
                username: selectedUser.userName,
                password: undefined,
                max_upload_size: convertFromBytes(selectedUser.maxUploadSize, bestUnit),
                size_unit: bestUnit,
                role: selectedUser.role === 1 ? "admin" : "user",
            });
        }
    }, [selectedUser, form]);

    const handleUnitChange = (newUnit: SizeUnit) => {
        const currentValue = form.getValues("max_upload_size");
        const currentUnit = form.getValues("size_unit") as SizeUnit;

        if (currentValue !== undefined && currentValue !== null) {
            const newValue = convertBetweenUnits(currentValue, currentUnit, newUnit);
            form.setValue("max_upload_size", newValue);
        }

        form.setValue("size_unit", newUnit);
        setSizeUnit(newUnit);
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const roleAsNumber = values.role === "admin" ? 1 : 0;

        const uploadSizeInBytes = convertToBytes(values.max_upload_size, values.size_unit as SizeUnit);

        mutate({
            id: selectedUser.id,
            userName: values.username,
            displayName: values.name,
            password: values.password || undefined,
            maxUploadSize: uploadSizeInBytes,
            role: roleAsNumber
        }, {
            onSuccess: () => {
                toast.success("Kullanıcı başarıyla güncellendi.");
                queryClient.invalidateQueries({
                    queryKey: ["adminUsers"]
                }).then(() => { onClose(); });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={"max-h-[90vh] max-w-[100vh] overflow-y-auto"}>
                <DialogHeader>
                    <DialogTitle>Kullanıcı Düzenle</DialogTitle>
                    <DialogDescription>
                        Kullanıcı bilgilerini güncellemek için gerekli alanları düzenleyin.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>İsim</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Kullanıcı İsmi" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Kullanıcı Adı</FormLabel>
                                    <FormControl>
                                        <Input placeholder="kullanici_adi" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Şifre</FormLabel>
                                    <FormDescription>
                                        Değiştirmek istemiyorsanız boş bırakın.
                                    </FormDescription>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={"password"}
                                                placeholder="••••••••"
                                                className="pr-10"
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="max_upload_size"
                                render={({ field }) => (
                                    <FormItem className="flex-grow">
                                        <FormLabel>Maksimum Yükleme Boyutu</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="100"
                                                {...field}
                                                value={field.value ?? undefined}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="size_unit"
                                render={({ field }) => (
                                    <FormItem className="w-24">
                                        <FormLabel>Birim</FormLabel>
                                        <Select
                                            onValueChange={(value) => handleUnitChange(value as SizeUnit)}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={sizeUnit} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="B">B</SelectItem>
                                                <SelectItem value="KB">KB</SelectItem>
                                                <SelectItem value="MB">MB</SelectItem>
                                                <SelectItem value="GB">GB</SelectItem>
                                                <SelectItem value="TB">TB</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rol</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Rol Seçin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="user">Kullanıcı</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="mt-4">
                            <Button disabled={isPending} type="submit">{isPending ? "Yükleniyor" : "Kaydet"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}