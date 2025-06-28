'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    if (!email || !password) {
      setError('Please enter email and password.');
      setLoading(false)
      return;
    }

    console.log(email, " ", password)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Login Failed');
      console.log("error:", error)
      setLoading(false)
      return;
    }

    if (data.session) {
      toast("Logged in successfully!")
      setLoading(false)
      router.push('/');
    }
  };

  return (
    <Card className="w-full max-w-xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg rounded-xl p-6">
      <CardHeader>
        <CardTitle>Login to share Habbos</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link href={'/signup'} className="hover:underline">Join Dagu</Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col  gap-2">
        <Button type="submit" className="w-full hover:cursor-pointer" onClick={handleLogin}>
          {loading ? ' Share your Habbo ...' : ' Share your Habbo '}
        </Button>
        <p className="text-red-700">{error}</p>

      </CardFooter>
    </Card>
  )
}
