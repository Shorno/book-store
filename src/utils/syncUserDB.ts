import {creteUserInDB} from "@/api/users.ts";
import {DBUser} from "@/store/authStore.ts";
import {User} from "firebase/auth";

export const syncUserToDB = async (user: User, role: 'user' | 'admin' | 'superAdmin' = 'user') => {
    try {
        const dbUser: DBUser = {
            firebaseUID: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || '',
            role,
        };
        await creteUserInDB(dbUser);
    } catch (error) {
        console.error("Error syncing user to DB:", error);
    }
};
