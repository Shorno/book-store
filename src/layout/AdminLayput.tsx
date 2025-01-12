import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {AppSidebar} from "@/components/sidebar/app-sidebar.tsx";
import {Link, Outlet, useLocation} from "react-router";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Separator} from "@radix-ui/react-separator";

export default function AdminLayout() {

    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const adminIndex = pathnames.indexOf('admin');
    if (adminIndex !== -1) {
        pathnames.splice(adminIndex, 1);
    }

    return (
        <>
            <SidebarProvider defaultOpen={true}>
                <AppSidebar/>
                <SidebarInset>
                    <header
                        className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1"/>
                            <Separator orientation="vertical" className="mr-2 h-4"/>
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <Link to={"/admin"}>
                                            <BreadcrumbLink>
                                                Admin Dashboard
                                            </BreadcrumbLink>
                                        </Link>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator/>
                                    {pathnames.map((name, index) => {
                                        const routeTo = `/admin/${pathnames.slice(0, index + 1).join('/')}`;
                                        const isLast = index === pathnames.length - 1;

                                        return (
                                            <BreadcrumbItem key={name}>
                                                {!isLast ? (
                                                    <Link to={routeTo}>
                                                        <BreadcrumbLink>
                                                            {name.charAt(0).toUpperCase() + name.slice(1)}
                                                        </BreadcrumbLink>
                                                        <BreadcrumbSeparator/>
                                                    </Link>
                                                ) : (
                                                    <BreadcrumbPage>
                                                        {name.charAt(0).toUpperCase() + name.slice(1)}
                                                    </BreadcrumbPage>
                                                )}
                                            </BreadcrumbItem>
                                        );
                                    })}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        <Outlet/>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}