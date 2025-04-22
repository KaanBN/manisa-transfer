import { useUser } from "@/queries/auth";
import {Button} from "@/components/ui/button.tsx";

const Navbar: React.FC = () => {
    const user = useUser();

    return (
        <nav>
            <div className="navbar-container">
                <div className="navbar-actions">
                    {
                        user ? (
                            <div className="user-info-container">
                                <span className="text-[#353535] font-medium">{user.username}</span>

                                <img
                                    src={user.profileImage}
                                    alt="User Avatar"
                                    className="user-avatar"
                                />
                            </div>
                        ) : (
                            <Button onClick={() => {console.log('clicked')}}>
                                Button
                            </Button>
                        )
                    }
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
