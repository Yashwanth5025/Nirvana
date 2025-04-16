"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cyber-darkBg text-white">
      <Navbar />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link href="/book" className="mb-6 inline-flex items-center text-cyber-pink hover:text-cyber-blue">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Booking
          </Link>

          <div className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-3xl font-bold cyber-gradient-text">Terms and Conditions</h1>
            
            <div className="space-y-6 text-cyber-blue">
              <section>
                <h2 className="text-xl font-semibold text-cyber-pink mb-3">1. Ticket Purchase and Payment</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>All ticket purchases are final and non-refundable.</li>
                  <li>Payment must be made in full before the event.</li>
                  <li>Valid UPI transaction ID must be provided for verification.</li>
                  <li>Tickets are non-transferable and non-resaleable.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyber-pink mb-3">2. Event Entry</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Valid ID proof must be presented at the venue.</li>
                  <li>The management reserves the right to deny entry.</li>
                  <li>Entry is subject to security checks.</li>
                  <li>No re-entry is allowed once you leave the venue.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyber-pink mb-3">3. Event Rules</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Follow all venue rules and regulations.</li>
                  <li>No illegal substances or weapons allowed.</li>
                  <li>Respect other attendees and staff.</li>
                  <li>Photography and recording policies apply.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyber-pink mb-3">4. Cancellation Policy</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Event may be cancelled due to unforeseen circumstances.</li>
                  <li>Refund policy will be announced in case of cancellation.</li>
                  <li>Keep your transaction details for refund purposes.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-cyber-pink mb-3">5. Liability</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Attendees are responsible for their personal belongings.</li>
                  <li>The organizers are not liable for any loss or damage.</li>
                  <li>Follow safety guidelines at all times.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 