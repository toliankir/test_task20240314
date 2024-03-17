import { useContext } from 'react'
import { appContext } from '../app.context';
import { AppContextType } from '../types/app-context.type';
import { getApiUrl } from '../helpers/get-api-url';
import { getAuthHeader } from '../helpers/get-auth-header';
import { AuthUserData } from '../types/auth-user-data';
import { RefreshAuthUserData } from '../types/refresh-auth-user-data';

function App() {
  const { user, setUser } = useContext<AppContextType>(appContext);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HandleUpdateRefreshToken = async (e: any) => {
    e.preventDefault();

    if (!user.authData) {
      return;
    }

    const authRequest = await fetch(`${getApiUrl()}/auth/refresh`, {
      method: "GET",
      headers: {
        ...getAuthHeader(user.authData.refreshToken)
      }
    });

    if (authRequest.status >= 300) {
      return;
    }

    const authResponse: RefreshAuthUserData = await authRequest.json();

    const newAuthData: AuthUserData = {
      id: user.authData.id,
      token: authResponse.token,
      refreshToken: user.authData.refreshToken,
    };

    setUser({
      authData: newAuthData,
      userData: user.userData
    })
  }

  const HandleLogout = () => {
    setUser({})
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <h1 className="uppercase font-bold px-3 text-purple-500 text-xl">Current user</h1>
        <div className="w-1/2 border-b-2">
          <p className="text-purple-500 my-3 font-semibold">Id: <span className="text-black">{user.userData?.id || ""}</span></p>
          <p className="text-purple-500 my-3">Name: <span className="text-black">{user.userData?.name || ""}</span></p>
          <p className="text-purple-500 my-3">Email: <span className="text-black">{user.userData?.email || ""}</span></p>
          <p className="text-purple-500 my-3">Phone: <span className="text-black">{user.userData?.phone || ""}</span></p>
          <p className="text-purple-500 my-3">Created: <span className="text-black">{user.userData?.createdAt || ""}</span></p>
        </div>
        <div className="w-1/2">
          <p className="text-purple-500 my-3 break-all">Token: <span className="text-black">{user.authData?.token || ""}</span></p>
          <p className="text-purple-500 my-3 break-all">Refresh token: <span className="text-black">{user.authData?.refreshToken || ""}</span></p>
        </div>
        {user.authData
          ? <div className="flex w-1/2 justify-around">
              <p
                onClick={HandleUpdateRefreshToken} 
                className="bg-purple-500 hover:bg-purple-800 text-white hover:cursor-pointer inline-block px-5 py-2.5 font-semibold rounded-lg">Update refresh token</p>
              <p
                onClick={HandleLogout} 
                className="bg-purple-500 hover:bg-purple-800 text-white hover:cursor-pointer inline-block px-5 py-2.5 font-semibold rounded-lg">Logout</p>
            </div>
          : ""}
      </div>
    </>
  )
}

export default App
