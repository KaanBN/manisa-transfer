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

                        <Input
                            type="email"
                            placeholder="Email"
                            className="mb-4"
                        />

                        <Input
                            type="password"
                            placeholder="Şifre"
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
