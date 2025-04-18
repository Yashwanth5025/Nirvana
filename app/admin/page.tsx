"use client"

import { useEffect, useState } from 'react'
import { Trash2, CheckCircle, XCircle } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

interface User {
  _id: string
  name: string
  email: string
  phone: string
  passType: string
  transactionId: string
  paymentVerified: boolean
  ticketVerified: boolean
  createdAt: string
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState<string | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "nirvanabackwards") {
      setIsAuthenticated(true)
      setAuthError(null)
    } else {
      setAuthError("Invalid password")
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast.error('Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return
    
    fetchUsers()
  }, [isAuthenticated])

  const handleVerifyPayment = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/verify-payment`, {
        method: 'POST'
      })
      
      if (!response.ok) {
        throw new Error('Failed to verify payment')
      }

      toast.success('Payment verified and ticket sent!')
      fetchUsers() // Refresh the list
    } catch (error) {
      console.error('Error verifying payment:', error)
      toast.error('Failed to verify payment')
    }
  }

  const handleDelete = async (userId: string) => {
    try {
      const response = await fetch(`/api/users?id=${userId}`, {
        method: 'DELETE'
      })
      
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }

      toast.success('User deleted successfully')
      fetchUsers() // Refresh the list
    } catch (error) {
      console.error('Error deleting user:', error)
      toast.error('Failed to delete user')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-cyber-pink">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-cyber-pink">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cyber-input text-white"
                placeholder="Enter admin password"
              />
            </div>
            {authError && (
              <p className="text-red-400">{authError}</p>
            )}
            <Button type="submit" className="w-full bg-cyber-pink hover:bg-cyber-pink/80">
              Login
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-cyber-darkBg">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 cyber-gradient-text">Admin Dashboard</h1>
        
        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-cyber-blue">Loading...</div>
          ) : users.length === 0 ? (
            <div className="text-center text-cyber-blue">No registrations yet</div>
          ) : (
            users.map(user => (
              <div key={user._id} className="cyber-card p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                    <p className="text-cyber-blue">Email: {user.email}</p>
                    <p className="text-cyber-blue">Phone: {user.phone}</p>
                    <p className="text-cyber-blue">Pass Type: {user.passType}</p>
                    <p className="text-cyber-blue">Transaction ID: {user.transactionId}</p>
                    <div className="flex space-x-4">
                      <p className="text-cyber-blue">
                        Payment: {user.paymentVerified ? 
                          <span className="text-green-400">Verified</span> : 
                          <span className="text-red-400">Pending</span>
                        }
                      </p>
                      <p className="text-cyber-blue">
                        Ticket: {user.ticketVerified ? 
                          <span className="text-green-400">Used</span> : 
                          <span className="text-yellow-400">Unused</span>
                        }
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!user.paymentVerified && (
                      <Button
                        onClick={() => handleVerifyPayment(user._id)}
                        className="bg-cyber-pink hover:bg-cyber-pink/80"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify Payment
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(user._id)}
                      variant="destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
} 