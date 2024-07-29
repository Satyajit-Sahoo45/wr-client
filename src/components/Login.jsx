import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        let res = undefined
        try {
            setLoader(true)
            res = await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}login`, { email, password });

            if (res?.status === 200) {
                localStorage.setItem("ACCESS_TOKEN", res.data.access_token)
                localStorage.setItem("user", JSON.stringify(res.data.user_data))
                setLoader(false)
                navigate("/")
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            toast.success(res.data.message)
        }

    }

    return <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                    <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                        <input id="email" name="email" type="email" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                        <input id="password" name="password" type="password" autocomplete="off" required className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>

                <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loader ? "Loading..." : "Sign in"}</button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
                don't have an account?
                <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> signUp</a>
            </p>
        </div>
    </div>
}