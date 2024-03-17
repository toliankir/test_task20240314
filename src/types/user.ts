import { AuthUserData } from "./auth-user-data";
import { UserData } from "./new-user-data";

export interface User {
    authData?: AuthUserData,
    userData?: UserData
}
