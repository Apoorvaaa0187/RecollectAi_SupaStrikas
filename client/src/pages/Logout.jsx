import { Link } from "react-router-dom"
import logout  from "../utils/logout.js"

export default function Login() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 p-4">
                <div className="bg-zinc-700 p-8 rounded-lg shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>
                    <form onSubmit={logout} className="space-y-4">
                        <button className="bg-red-300 text-white">Logout</button>
                    </form>
                </div>
            </div>
        </>
    )
}