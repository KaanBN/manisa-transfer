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
import {useAdminCreateNewUser} from "@/hooks/admin/useAdminCreateNewUser.ts";
import {useQueryClient} from "@tanstack/react-query";

type Props = {
    open: boolean;
    onClose: () => void;
};

const formSchema = z.object({
    name: z.string().min(1, "İsim zorunludur."),
    username: z.string().min(1, "Kullanıcı adı zorunludur."),
    password: z.string().min(1, "Şifre zorunludur."),
    max_upload_size: z
        .union([z.coerce.number().min(0, "Geçerli bir sayı girin."), z.literal(null)])
        .optional(),
    role: z.enum(["user", "admin"], {
        required_error: "Rol seçimi zorunludur.",
    }),
});

export function NewUserDialog({ open, onClose }: Props) {
    const { mutate, isPending} = useAdminCreateNewUser();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            max_upload_size: undefined,
            role: undefined,
        },
    });

    const queryClient = useQueryClient();

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log("Form values:", values);
        //onClose();

        const roleAsNumber = values.role === "admin" ? 1 : 0;

        mutate({
            userName: values.username,
            displayName: values.name,
            password: values.password,
            maxUploadSize: values.max_upload_size,
            role: roleAsNumber
        },{
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["adminUsers"]
                }).then(() => {onClose();})

            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={"max-h-[90vh] overflow-y-auto"}>
                <DialogHeader>
                    <DialogTitle>Yeni Kullanıcı</DialogTitle>
                    <DialogDescription>
                        Yeni kullanıcı eklemek için gerekli alanları doldurun.
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
                                        <Input placeholder="Yeni Kullanıcı" {...field} />
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
                                        <Input placeholder="yeni_kullanici" {...field} />
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
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type={"password"}
                                                placeholder="••••••••"
                                                className="pr-10"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="max_upload_size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maksimum Yükleme Boyutu (byte)</FormLabel>
                                    <FormDescription>Boş bırakılırsa sunucudaki değer verilecektir.</FormDescription>
                                    <FormControl>
                                        <Input type="number" placeholder="100" {...field} value={field.value ?? undefined} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Rol</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
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

export default NewUserDialog;