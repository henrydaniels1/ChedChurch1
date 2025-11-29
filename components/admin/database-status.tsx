"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Database } from "lucide-react"

export function DatabaseStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [message, setMessage] = useState('')

  const checkDatabase = async () => {
    setStatus('checking')
    try {
      const response = await fetch('/api/livestream')
      if (response.ok) {
        setStatus('connected')
        setMessage('Database connection successful')
      } else {
        setStatus('error')
        setMessage('Database tables may not exist')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Cannot connect to database')
    }
  }

  useEffect(() => {
    checkDatabase()
  }, [])

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="w-5 h-5" />
          Database Status
          <Badge variant={status === 'connected' ? 'default' : status === 'error' ? 'destructive' : 'secondary'}>
            {status === 'checking' ? 'Checking...' : status === 'connected' ? 'Connected' : 'Error'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          {status === 'connected' ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
          <span>{message}</span>
        </div>
        
        {status === 'error' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-2">Database Setup Required</h4>
            <p className="text-sm text-yellow-700 mb-3">
              To save changes permanently, you need to create database tables in Supabase:
            </p>
            <ol className="text-sm text-yellow-700 list-decimal list-inside space-y-1 mb-3">
              <li>Go to your Supabase dashboard</li>
              <li>Open the SQL Editor</li>
              <li>Run the SQL script from <code>scripts/setup-database.sql</code></li>
            </ol>
            <p className="text-xs text-yellow-600">
              Until then, changes will work in the admin interface but won't be saved permanently.
            </p>
          </div>
        )}
        
        <Button onClick={checkDatabase} variant="outline" size="sm">
          Recheck Status
        </Button>
      </CardContent>
    </Card>
  )
}