import {axiosSecure} from "@/api/axiosConfig.js";

export const generateJWT = async (email: string | null) => {
    console.log(email)
    const response = await axiosSecure.post("/auth/jwt", {email});
    return response.data;
}