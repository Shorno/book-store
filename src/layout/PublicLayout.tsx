import {Outlet} from "react-router";
import {Navbar} from "@/components/Navbar.tsx";

export default function PublicLayout() {
    return (
        <>
            <Navbar/>
            <div className={"min-h-screen"}>
                <Outlet/>
            </div>
            footer
        </>
    )
}