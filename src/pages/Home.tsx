import {useQuery} from "@tanstack/react-query";
import {getUsers} from "@/api/users.ts";
import {DBUser} from "@/store/authStore.ts";

export default function Home() {
    const {data: users, isLoading, isError} = useQuery({
        queryKey: ["users"],
        queryFn: getUsers
    })


    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error fetching users</p>


    return (
        <>
            {users.data?.map((user: DBUser) => (
                <div key={user.email}>
                    <div className={"py-2"}>
                        <h1>{user.displayName}</h1>
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                    </div>
                </div>
            ))}
        </>
    )
}