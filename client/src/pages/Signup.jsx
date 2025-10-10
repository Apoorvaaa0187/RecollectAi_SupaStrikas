import { Link } from "react-router-dom"
import addUser from "../utils/signup.js"

export default function SignUp() {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 p-4">
                <div className="bg-zinc-700 p-8 rounded-lg shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold text-center mb-6 text-white">Sign Up</h2>
                    <form onSubmit={addUser} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold mb-2">Username:</label>
                            <input type="tetx" id="username" name="username" required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email:</label>
                            <input type="email" id="email" name="email" required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold mb-2">Password:</label>
                            <input type="password" id="password" name="password" required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                        </div>
                        <button type="submit"
                            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                                Sign Up
                        </button>
                        <p className="text-center text-white text-sm mt-4">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600 font-semibold">Login</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}