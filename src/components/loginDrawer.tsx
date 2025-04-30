import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useLogin} from "@/hooks/useLogin.ts";
import Spinner from "@/components/spinner.tsx";
import {useState} from "react";

type LoginDrawerProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const LoginDrawer: React.FC<LoginDrawerProps> = ({ open, setOpen }) => {
    const { mutate: login, isPending, isError, error } = useLogin();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) return;
        login(
            { username, password },
            {
                onSuccess: () => {
                    setOpen(false);
                }
            }
        );
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Giriş Yap</DrawerTitle>
                        <DrawerDescription>Hesabınıza giriş yapın.</DrawerDescription>
                    </DrawerHeader>
                    <form onSubmit={handleLogin}>
                        <div className="p-4">
                            <Input
                                placeholder="Kullanıcı Adı"
                                className="mb-4"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <Input
                                type="password"
                                placeholder="Şifre"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {isError && (
                                <p className="mt-2 text-sm text-red-500">
                                    {(error as any)?.response?.data?.message || "Giriş sırasında bir hata oluştu."}
                                </p>
                            )}
                        </div>
                        <DrawerFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? <Spinner /> : "Giriş Yap"}
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline" type="button">İptal</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default LoginDrawer;