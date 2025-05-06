import {useState} from "react";
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
import {login as loginApi} from "@/api/auth/login";
import {useAuth} from "@/context/authContext.tsx";

type LoginDrawerProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const LoginDrawer: React.FC<LoginDrawerProps> = ({open, setOpen}) => {
    const {login} = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) return;

        setLoading(true);
        setErrorMsg("");

        try {
            const res = await loginApi({username, password});
            login(res.data.token);
            setOpen(false);
        } catch (err: any) {
            setErrorMsg(err?.response?.data?.message || "Giriş sırasında hata oluştu.");
        } finally {
            setLoading(false);
        }
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
                            {errorMsg && (
                                <p className="mt-2 text-sm text-red-500">{errorMsg}</p>
                            )}
                        </div>
                        <DrawerFooter>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Yükleniyor" : "Giriş Yap"}
                            </Button>
                            <DrawerClose asChild>
                                <Button disabled={loading} variant="outline" type="button">İptal</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default LoginDrawer;