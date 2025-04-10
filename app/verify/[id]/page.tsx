"use client"

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { CheckCircle2, XCircle } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export default function VerifyPage() {
  const params = useParams()
  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading')
  const [userData, setUserData] = useState<any>(null)
  const [isMarkedUsed, setIsMarkedUsed] = useState(false)

  useEffect(() => {
    const verifyTicket = async () => {
      try {
        const response = await fetch(`/api/verify/${params.id}`)
        const data = await response.json()
        
        if (data.success) {
          setStatus('valid')
          setUserData(data.user)
          setIsMarkedUsed(data.user.ticketVerified)
        } else {
          setStatus('invalid')
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('invalid')
      }
    }

    verifyTicket()
  }, [params.id])

  const markTicketAsUsed = async () => {
    try {
      const response = await fetch(`/api/verify/${params.id}/mark-used`, {
        method: 'POST'
      })
      const data = await response.json()
      
      if (data.success) {
        setIsMarkedUsed(true)
      }
    } catch (error) {
      console.error('Error marking ticket as used:', error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-cyber-darkBg">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto cyber-card p-8">
          <div className="text-center">
            {status === 'loading' && (
              <div className="animate-pulse">
                <div className="h-24 w-24 rounded-full bg-cyber-purple/20 mx-auto mb-4" />
                <div className="h-4 w-32 bg-cyber-purple/20 mx-auto" />
              </div>
            )}
            
            {status === 'valid' && (
              <div className="space-y-4">
                <CheckCircle2 className="h-24 w-24 text-cyber-pink mx-auto" />
                <h1 className="text-2xl font-bold text-white">Ticket Verified!</h1>
                {userData && (
                  <div className="space-y-2 text-left mt-6 bg-cyber-mediumBg p-4 rounded-lg">
                    <p className="text-cyber-blue">Name: <span className="text-white">{userData.name}</span></p>
                    <p className="text-cyber-blue">Pass Type: <span className="text-white">{userData.passType}</span></p>
                    <p className="text-cyber-blue">Transaction ID: <span className="text-white">{userData.transactionId}</span></p>
                    <div className="mt-4">
                      {isMarkedUsed ? (
                        <div className="flex items-center justify-center space-x-2 text-cyber-green">
                          <CheckCircle2 className="h-5 w-5" />
                          <span>Ticket Used</span>
                        </div>
                      ) : (
                        <button
                          onClick={markTicketAsUsed}
                          className="w-full py-2 px-4 bg-cyber-pink text-white rounded-lg hover:bg-cyber-pink/80 transition-colors"
                        >
                          Mark Ticket as Used
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {status === 'invalid' && (
              <div className="space-y-4">
                <XCircle className="h-24 w-24 text-red-500 mx-auto" />
                <h1 className="text-2xl font-bold text-white">Invalid Ticket</h1>
                <p className="text-cyber-blue">This ticket is either invalid or has already been used.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 