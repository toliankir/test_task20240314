import { useState } from "react";
import { getApiUrl } from "../helpers/get-api-url"
import { NewUserData } from "../types/user-data";

function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HandleSingUp = async (e: any) => {
    e.preventDefault();

    setError("");

    const body: NewUserData = {
      name: name,
      password: password,
      email: email,
    };

    if (phone) {
      body.phone = phone;
    }

    const authRequest = await fetch(`${getApiUrl()}/users`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (authRequest.status >= 300) {
      const errorResponse = await authRequest.json();
      setError(`${authRequest.status} ${authRequest.statusText}: ${Array.isArray(errorResponse.message) ? errorResponse.message.join(', ') : errorResponse.message}`);
      return;
    }
  }

  return (
    <>
      <div className="flex justify-center flex-col items-center">
        <h1 className="uppercase font-bold px-3 text-purple-500 text-xl">Sign up</h1>
        <form className="w-1/3">
          <div className="my-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe" required />
          </div>

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

          <div className="my-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="+380661234567" required />
          </div>

          <div className="text-center mt-5 mb-2">
            <p onClick={HandleSingUp} className="bg-purple-500 hover:bg-purple-800 text-white hover:cursor-pointer inline-block px-5 py-2.5 font-semibold rounded-lg">Create user</p>
          </div>
        </form>
        {error
          ? <div className="w-1/3 text-red-600 font-semibold">
            {error}
          </div>
          : ""}
      </div>
    </>
  )
}

export default Signup
