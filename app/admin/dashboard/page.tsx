"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { ProgramsManager } from "@/components/admin/programs-manager"
import { AnnouncementsManager } from "@/components/admin/announcements-manager"
import { LeadershipManager } from "@/components/admin/leadership-manager"
import { ArchivesManager } from "@/components/admin/archives-manager"
import { HomepageManager } from "@/components/admin/homepage-manager"

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/admin")
      } else {
        setUser(user)
      }
    }
    getUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin")
  }

  if (!user) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="homepage" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="homepage">Homepage</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
            <TabsTrigger value="archives">Archives</TabsTrigger>
          </TabsList>

          <TabsContent value="homepage">
            <HomepageManager />
          </TabsContent>

          <TabsContent value="programs">
            <ProgramsManager />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsManager />
          </TabsContent>

          <TabsContent value="leadership">
            <LeadershipManager />
          </TabsContent>

          <TabsContent value="archives">
            <ArchivesManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}