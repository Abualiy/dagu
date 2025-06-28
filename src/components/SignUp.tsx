'use client'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import userRegister from "@/lib/signup"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export function SignUp() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [show, setShow] = useState(false)
    const router = useRouter()


    const handleChange = (name: string, value: string) => {
        setUserData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleRegister = async () => {
        setLoading(true)
        const { name, email, password } = userData;

        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            setLoading(false)
            return;
        }

        if (password.length < 6) {
            setError("Passwords have to more that 6 characters.");
            setLoading(false)
            return;

        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            setLoading(false)
            return;
        }

        const signup = await userRegister(email, password, name)
        if (signup) {
            setError(signup)
            setLoading(false)
            return
        }

        setError('')
        setLoading(false)
        toast("Registration successful! Please Verify your email.");
        router.push('/login')

    };

    return (
        <Card className="w-full max-w-xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-xl p-6">
            <CardHeader>
                <CardTitle>Signup to start sharing Habbos</CardTitle>
                <CardDescription>If you have an account <Link href={'/login'} className="hover:underline text-black">Login to Dagu</Link></CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Full name</Label>
                            <Input
                                id="name"
                                type="name"
                                placeholder="Johan Piter"
                                value={userData.name}
                                onChange={(text) => handleChange('name', text.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={userData.email}
                                onChange={(text) => handleChange('email', text.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                type={show ? 'text' : "password"}
                                value={userData.password}
                                onChange={(text) => handleChange('password', text.target.value)}
                                required />
                            <span
                                className="hover:cursor-pointer w-fit"
                                onClick={() => setShow(!show)}
                            >
                                {show ? 'Hide password' : 'Show Password'}
                            </span>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Confirm Password</Label>
                            <Input id="password" type={show ? 'text' : "password"} value={confirmPassword}
                                onChange={(text) => setConfirmPassword(text.target.value)} required />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full hover:cursor-pointer" onClick={handleRegister}>
                    {loading ? 'Start Sharing your Habbo...' : 'Start Sharing your Habbo'}
                </Button>
                <p className="text-red-700">{error}</p>
            </CardFooter>
        </Card>
    )
}
