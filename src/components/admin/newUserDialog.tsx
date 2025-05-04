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
    FormControl,
    FormDescription,
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
import { useState } from "react";
import {useAdminCreateNewUser} from "@/hooks/admin/useAdminCreateNewUser.ts";
import {convertToBytes, SizeUnit} from "@/lib/byteConverterHelper.ts";

type Props = {
    open: boolean;
    onClose: () => void;
};

const formSchema = z.object({
    name: z.string().min(1, "İsim zorunludur."),
    username: z.string().min(1, "Kullanıcı adı zorunludur."),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır."),
    max_upload_size: z
        .union([z.coerce.number().min(0, "Geçerli bir sayı girin."), z.literal(null)])
        .optional(),
    size_unit: z.enum(["B", "KB", "MB", "GB"] as const),
    role: z.enum(["user", "admin"], {
        required_error: "Rol seçimi zorunludur.",
    }),
});

export function NewUserDialog({ open, onClose }: Props) {
    const { mutate, isPending } = useAdminCreateNewUser();
    const [sizeUnit, setSizeUnit] = useState<SizeUnit>("MB");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            max_upload_size: 100,
            size_unit: "MB",
            role: "user",
        },
    });

    const queryClient = useQueryClient();

    const handleUnitChange = (newUnit: SizeUnit) => {
        setSizeUnit(newUnit);
        form.setValue("size_unit", newUnit);
    };

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const roleAsNumber = values.role === "admin" ? 1 : 0;

        // Convert the upload size to bytes before sending to server
        const uploadSizeInBytes = convertToBytes(values.max_upload_size, values.size_unit as SizeUnit);

        mutate({
            userName: values.username,
            displayName: values.name,
            password: values.password,
            maxUploadSize: uploadSizeInBytes,
            role: roleAsNumber
        }, {
            onSuccess: () => {
                toast.success("Kullanıcı başarıyla oluşturuldu.");
                queryClient.invalidateQueries({
                    queryKey: ["adminUsers"]
                }).then(() => {
                    onClose();
                    form.reset(); // Reset form after successful submission
                });
            },
            onError: (error) => {
                toast.error("Kullanıcı oluşturulurken bir hata oluştu.");
                console.error("Error creating user:", error);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={"max-h-[90vh] max-w-[100vh] overflow-y-auto"}>
                <DialogHeader>
                    <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
                    <DialogDescription>
                        Yeni bir kullanıcı oluşturmak için gerekli bilgileri girin.
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
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Şifre en az 6 karakter olmalıdır.
                                    </FormDescription>
                                    <FormMessage />
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
                            <Button disabled={isPending} type="submit">
                                {isPending ? "Oluşturuluyor..." : "Kullanıcı Oluştur"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}