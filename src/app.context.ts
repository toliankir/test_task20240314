import { createContext } from 'react';
import { User } from './types/user';

export const appContext = createContext({
    user: {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setUser: (_user: User) => {}
});
