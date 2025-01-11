import {BrowserRouter, Routes, Route} from "react-router";
import PublicLayout from "@/layout/PublicLayout.tsx";
import Home from "@/pages/Home.tsx";
import AdminLayout from "@/layout/AdminLayput.tsx";
import Dashboard from "@/pages/Dashboard/Dashboard.tsx";
import LoginPage from "@/pages/Auth/Login.tsx";
import Signup from "@/pages/Auth/Signup.tsx";
import {Toaster} from "react-hot-toast";

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<PublicLayout/>}>
                        <Route index element={<Home/>}/>
                    </Route>
                    <Route path={"/admin"} element={<AdminLayout/>}>
                        <Route index element={<Dashboard/>}/>
                    </Route>
                    <Route path={"/login"} element={<LoginPage/>}/>
                    <Route path={"/signup"} element={<Signup/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster position={"top-center"}/>
        </>
    )
}

export default App
