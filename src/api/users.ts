import {DBUser} from "@/store/authStore.ts";
import {axiosPublic, axiosSecure} from "@/api/axiosConfig.ts";


export const creteUserInDB = async (user: DBUser) => {
    const response = await axiosPublic.post('/users', user);
    return response.data;
}

export const getUsers = async () => {
    const response = await axiosSecure.get("/users");
    return response.data;
}

export const getRoleByEmail = async (email? :string) => {
    const response = await axiosSecure.get(`/users`,{
        params : {email}
    });
    return response.data;
}
