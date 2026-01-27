"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coffee, Lock } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/wholesale/portal")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-2xl text-brand-purple mb-6">
            <Coffee className="h-8 w-8" />
            <span>Sweet Beans</span>
          </Link>
          <h2 className="text-3xl font-bold text-coffee-dark">Wholesale Partner Login</h2>
          <p className="mt-2 text-coffee-medium">
            Enter your credentials to access the wholesale portal.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg border border-coffee-light/20">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="cafe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/contact?subject=Wholesale Portal Password Reset" className="text-xs text-brand-purple hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="text-center">
          <p className="text-coffee-medium text-sm">
            Not a wholesale partner yet?{" "}
            <Link href="/wholesale/apply" className="text-brand-purple font-semibold hover:underline">
              Apply for an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
