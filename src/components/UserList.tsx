import { useContext, useEffect, useState } from 'react'
import { appContext } from '../app.context';
import { getApiUrl } from '../helpers/get-api-url';
import { getAuthHeader } from '../helpers/get-auth-header';
import { AppContextType } from '../types/app-context.type';
import { User } from '../types/user';
import { UserData } from '../types/new-user-data';

function UserList() {
  const [users, setUsers] = useState<Array<UserData>>([]);
  const { user } = useContext<AppContextType>(appContext);

  useEffect(() => {
    (async () => {
      const token = (user as User)?.authData?.token;
      if (!token) {
        return;
      }

      const usersRequest = await fetch(`${getApiUrl()}/users`, {
        method: "GET",
        headers: {
          ...getAuthHeader(token)
        }
      });

      if (usersRequest.status >= 300) {
        return;
      }
      const users = await usersRequest.json();
      setUsers(users)
    })();
  }, []);

  return (
    <>
      <span className="uppercase font-bold text-purple-500">Users list</span>
      { user.authData
        ? ""
        : <p className="font-bold text-purple-500">Only for sing in users</p>} 
      <div>
      { users.map((e) => {
        return <div key={e.id} className="w-full sm:w-1/2 lg:w-1/3 p-2 inline-block">
        <div className="p-2 bg-gray-100 rounded flex items-start">
          <div className="p-2">
            <p className="text-sm text-purple-500 font-semibold">Id: <span>{e.id}</span></p>
            <p className="text-sm">Name: <span>{e.name}</span></p>
            <p className="text-sm">Email: <span>{e.email}</span></p>
            <p className="text-sm">Phone: <span>{e.phone || "none"}</span></p>
            <p className="text-sm">Created: <span>{e.createdAt}</span></p>
          </div>
        </div>
      </div>
      })}
      </div>
    </>
  )
}

export default UserList
