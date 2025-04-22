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

type LoginDrawerProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const LoginDrawer: React.FC<LoginDrawerProps> = ({ open, setOpen }) => {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Giriş Yap</DrawerTitle>
                        <DrawerDescription>Hesabınıza giriş yapın.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4">

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full mb-2 px-3 py-2 border rounded"
                        />
                        <input
                            type="password"
                            placeholder="Şifre"
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <DrawerFooter>
                        <Button onClick={() => console.log("Login logic")}>Giriş Yap</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">İptal</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default LoginDrawer;
