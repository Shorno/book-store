import {BrowserRouter, Routes, Route} from "react-router";
import PublicLayout from "@/layout/PublicLayout.tsx";
import Home from "@/pages/Home.tsx";
import AdminLayout from "@/layout/AdminLayput.tsx";
import Dashboard from "@/pages/Dashboard/Dashboard.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<PublicLayout/>}>
                        <Route index element={<Home/>}/>
                    </Route>
                    <Route path={"/dashboard"} element={<AdminLayout/>}>
                        <Route index element={<Dashboard/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App
