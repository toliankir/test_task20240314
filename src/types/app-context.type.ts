import { User } from "./user";

export interface AppContextType {
    user: User,
    setUser: (user: User) => void
}
