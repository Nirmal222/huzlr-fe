'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/lib/redux/hooks"
import { verifyAccessCode } from "@/lib/redux/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Lock, ExternalLink } from "lucide-react"

export function WaitlistDialog({ open = true }: { open?: boolean }) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [accessCode, setAccessCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const resultAction = await dispatch(verifyAccessCode(accessCode))
      if (verifyAccessCode.fulfilled.match(resultAction)) {
        router.push("/dashboard")
      } else {
        setError(resultAction.payload as string || "Invalid access code")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const waitlistUrl = process.env.NEXT_PUBLIC_WAITLIST_FORM_URL || "#"

  return (
    <Dialog open={open}>
      <DialogContent showCloseButton={false} onInteractOutside={(e) => e.preventDefault()} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to Huzlr</DialogTitle>
          <DialogDescription>
            We are currently in early access. Please enter your access code or join the waitlist.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="access-code" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="access-code">Access Code</TabsTrigger>
            <TabsTrigger value="waitlist">Join Waitlist</TabsTrigger>
          </TabsList>
          <TabsContent value="access-code" className="space-y-4 py-4">
            <form onSubmit={handleVerify} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Input
                  placeholder="Enter your access code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className={error ? "border-red-500" : ""}
                />
                {error && <span className="text-sm text-red-500">{error}</span>}
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Verifying..." : "Verify Access"} <Lock className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="waitlist" className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
              <p className="text-muted-foreground">
                Join our waitlist to get early access to Huzlr. We'll notify you as soon as a spot opens up.
              </p>
              <Button onClick={() => window.open(waitlistUrl, '_blank')} className="w-full">
                Go to Waitlist Form <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
