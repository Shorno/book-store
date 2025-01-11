import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {UserIcon} from "lucide-react"
import useAuthStore from "@/store/authStore"
import {Link} from "react-router"
import {useUserRole} from "@/hooks/useUserRole.tsx";
import {Role} from "@/utils/constants.ts";

export function UserProfile() {
    const {currentUser, logout} = useAuthStore();
    const role: Role = useUserRole()
    const isUser = role === "user"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="size-8">
                        <AvatarImage
                            src={currentUser?.photoURL || undefined}
                            alt={currentUser?.displayName || undefined}
                        />
                        <AvatarFallback>
                            <UserIcon/>
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                {currentUser ? (
                    <>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {currentUser.displayName || 'User'}
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    {currentUser.email || ''}
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                            </DropdownMenuItem>

                            {
                                isUser ?
                                    <DropdownMenuItem>
                                        My Orders
                                    </DropdownMenuItem>
                                    :
                                    <DropdownMenuItem>
                                        <Link to={"/admin"}>
                                            Admin Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                            }
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={logout}>
                            Log out
                        </DropdownMenuItem>
                    </>
                ) : (
                    <>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    Welcome!
                                </p>
                                <p className="text-xs leading-none text-muted-foreground">
                                    <Link className={"underline"} to={"/login"}>Sign in</Link> to access all features
                                </p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Profile
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfile;