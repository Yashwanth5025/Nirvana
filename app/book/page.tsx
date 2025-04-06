"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function BookingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cyber-darkBg text-white">
      <Navbar />
      <main className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="mb-6 inline-flex items-center text-cyber-pink hover:text-cyber-blue">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <Card className="mx-auto max-w-3xl cyber-card">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl cyber-gradient-text">RSVP to Our Party</CardTitle>
              <CardDescription className="text-cyber-blue">
                Fill out the form below to reserve your spot at our next epic house party
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-cyber-pink">
                      Full Name
                    </label>
                    <Input id="name" placeholder="John Doe" required className="cyber-input" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-cyber-pink">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" required className="cyber-input" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-cyber-pink">
                      Phone Number
                    </label>
                    <Input id="phone" placeholder="(123) 456-7890" required className="cyber-input" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="guests" className="text-sm font-medium text-cyber-pink">
                      Number of Guests
                    </label>
                    <Input id="guests" type="number" min="1" placeholder="50" required className="cyber-input" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-cyber-pink">Event Date</label>
                    <DatePickerDemo />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="event-type" className="text-sm font-medium text-cyber-pink">
                      Event Type
                    </label>
                    <Select>
                      <SelectTrigger id="event-type" className="cyber-input">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent className="bg-cyber-mediumBg border border-cyber-purple text-white">
                        <SelectItem value="birthday" className="focus:bg-cyber-purple focus:text-white">
                          Birthday Party
                        </SelectItem>
                        <SelectItem value="graduation" className="focus:bg-cyber-purple focus:text-white">
                          Graduation Party
                        </SelectItem>
                        <SelectItem value="housewarming" className="focus:bg-cyber-purple focus:text-white">
                          Housewarming
                        </SelectItem>
                        <SelectItem value="holiday" className="focus:bg-cyber-purple focus:text-white">
                          Holiday Party
                        </SelectItem>
                        <SelectItem value="other" className="focus:bg-cyber-purple focus:text-white">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium text-cyber-pink">
                    Event Location
                  </label>
                  <Input id="location" placeholder="Full address" required className="cyber-input" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="details" className="text-sm font-medium text-cyber-pink">
                    Additional Details
                  </label>
                  <Textarea
                    id="details"
                    placeholder="Tell us more about your event, special requirements, theme ideas, etc."
                    rows={4}
                    className="cyber-input"
                  />
                </div>

                <Button type="submit" className="w-full cyber-button">
                  Submit RSVP
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function DatePickerDemo() {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="w-full justify-start text-left font-normal cyber-input">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-cyber-mediumBg border border-cyber-purple">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="bg-cyber-mediumBg text-white"
        />
      </PopoverContent>
    </Popover>
  )
}

