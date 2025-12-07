'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks"
import { fetchCurrentUser } from "@/lib/redux/slices/authSlice"
import { WaitlistDialog } from "@/components/waitlist-dialog"

export default function OnboardingPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { user, loading, token } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
        if (!user) {
            dispatch(fetchCurrentUser())
        } else if (user.has_access) {
            router.push("/dashboard")
        }
    } else {
        // Not logged in, redirect to signup or login
        router.push("/signup")
    }
  }, [token, user, dispatch, router])

  if (loading || (token && !user)) {
    return (
      <div className="flex h-svh items-center justify-center">
        <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-muted-foreground text-sm">Checking access...</p>
        </div>
      </div>
    )
  }

  // If user is loaded and no access, show dialog
  return (
    <div className="min-h-svh bg-background relative">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />
        <WaitlistDialog open={true} />
    </div>
  )
}
