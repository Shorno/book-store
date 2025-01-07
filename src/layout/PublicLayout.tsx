import {Outlet} from "react-router";

export default function PublicLayout() {
    return (
        <>
            navbar
            <div className={"min-h-screen"}>
                <Outlet/>
            </div>
            footer
        </>
    )
}