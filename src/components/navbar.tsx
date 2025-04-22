import { useUser } from "@/queries/auth";
import {Button} from "@/components/ui/button.tsx";
import {Menubar} from "@radix-ui/react-menubar";
import {MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "./ui/menubar";

const Navbar: React.FC = () => {
    // const user = useUser();
    const user = true;

    return (
        <nav>
            <div className="navbar-container">
                {
                    user ? (
                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger className="bg-accent text-accent-foreground">Kullanıcı Adı</MenubarTrigger>
                                <MenubarContent align={"end"}>
                                    <MenubarItem className={"text-red-400 focus:bg-red-400 focus:text-white"} onClick={() => {console.log('clicked')}}>
                                        Çıkış Yap
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    ) : (
                        <Button onClick={() => {console.log('clicked')}}>
                            Giriş Yap
                        </Button>
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;
