import {DBUser} from "@/store/authStore.ts";
import {axiosPublic} from "@/api/axiosConfig.ts";


export const creteUserInDB = async (user: DBUser) => {
    const response = await axiosPublic.post('/users', user);
    return response.data;
}

export const getUsers = async () => {
    const response = await axiosPublic.get("/users");
    return response.data;
}

export const getRoleByEmail = async (email? :string) => {
    const response = await axiosPublic.get(`/users`,{
        params : {email}
    });
    return response.data;
}

// export const getUserRole = async (email: string) => {
//     if (!email){
//         console.error("No email provided");
//     }
//     const response = await axiosPublic.get(`/users/role/${email}`);
//     return response.data;
// }