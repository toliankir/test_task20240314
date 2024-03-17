import { useContext, useState } from "react";
import { appContext } from "../app.context";
import { getApiUrl } from "../helpers/get-api-url"
import { getAuthHeader } from "../helpers/get-auth-header"
import { AuthUserData } from "../types/auth-user-data";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(appContext);
  const [error, setError] = useState("")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HandleSingIn = async (e: any) => {
    e.preventDefault();

    const body = {
      username: email,
      password
    };

    const authRequest = await fetch(`${getApiUrl()}/auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (authRequest.status >= 300) {
      const errorResponse = await authRequest.json();
      setError(`${authRequest.status } ${authRequest.statusText}: ${Array.isArray(errorResponse.message) ? errorResponse.message.join(', ') : errorResponse.message}`);
      return;
    }

    const authResponse: AuthUserData = await authRequest.json();

    const userDataRequest = await fetch(`${getApiUrl()}/users/${authResponse.id}`, {
      method: "GET",
      headers: {
        ...getAuthHeader(authResponse.token)
      }
    });

    if (userDataRequest.status >= 300) {
      const errorResponse = await userDataRequest.json();
      setError(`${userDataRequest.status } ${userDataRequest.statusText}: ${Array.isArray(errorResponse.message) ? errorResponse.message.join(', ') : errorResponse.message}`);
      return;
    }
    const userDataResponse = await userDataRequest.json();

    setUser({
      authData: authResponse,
      userData: userDataResponse
    });

    
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <h1 className="uppercase font-bold px-3 text-purple-500 text-xl">Sign in</h1>
        <form className="w-1/3">
          <div className="my-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="test@mail.com" required />
          </div>

          <div className="my-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="password" required />
          </div>

          <div className="text-center mt-5 mb-2">
            <p onClick={HandleSingIn} className="bg-purple-500 hover:bg-purple-800 text-white hover:cursor-pointer inline-block px-5 py-2.5 font-semibold rounded-lg">Sign in</p>
          </div>
        </form>
        {error
        ? <div className="w-1/3 text-red-600 font-semibold">
          { error }
        </div>
        : ""}
      </div>
    </>
  )
}

export default Signin
