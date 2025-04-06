import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, ArrowRight, Music, Users, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-cyber-darkBg">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-party.jpg"
              alt="Party background"
              fill
              className="object-cover brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-cyber-darkBg/70 via-transparent to-cyber-darkBg"></div>
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center px-4 py-32 text-center text-white md:py-48">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl cyber-gradient-text">
              Welcome to Nirvana
            </h1>
            <p className="mb-8 max-w-md text-lg md:max-w-xl md:text-xl text-cyber-blue">
              Experience the ultimate nightlife destination where music, energy, and unforgettable moments come together.
            </p>
            <Link href="/book">
              <Button size="lg" className="cyber-button">
                RSVP Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 cyber-gradient-text text-center">Upcoming Events</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* House Party Event */}
            <Card className="bg-cyber-darkBg border-cyber-pink hover:border-cyber-blue transition-colors overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/party1.jpg"
                  alt="House Party"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl cyber-gradient-text">House Party</CardTitle>
                <CardDescription className="text-cyber-blue">
                  Join us for an epic night of music, dancing, and good vibes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-cyber-blue">
                    <Music className="mr-2 h-5 w-5" />
                    <span>Live DJ Performance</span>
                  </div>
                  <div className="flex items-center text-cyber-blue">
                    <Users className="mr-2 h-5 w-5" />
                    <span>Limited Entry</span>
                  </div>
                  <div className="flex items-center text-cyber-blue">
                    <Building className="mr-2 h-5 w-5" />
                    <span>Exclusive Venue</span>
                  </div>
                  <div className="pt-4">
                    <Link href="/book">
                      <Button className="w-full cyber-button">
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Neon Night Event (Disabled) */}
            <Card className="bg-cyber-darkBg border-cyber-pink opacity-75 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/party2.jpg"
                  alt="Neon Night"
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl cyber-gradient-text">Neon Night</CardTitle>
                <CardDescription className="text-cyber-blue">
                  A futuristic night of neon lights and electronic beats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-cyber-blue">
                    <Music className="mr-2 h-5 w-5" />
                    <span>Electronic Music</span>
                  </div>
                  <div className="flex items-center text-cyber-blue">
                    <Users className="mr-2 h-5 w-5" />
                    <span>VIP Access</span>
                  </div>
                  <div className="flex items-center text-cyber-blue">
                    <Building className="mr-2 h-5 w-5" />
                    <span>Special Venue</span>
                  </div>
                  <div className="pt-4">
                    <Button className="w-full cyber-button cursor-not-allowed opacity-50" disabled>
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 cyber-gradient-text text-center">OUR SERVICES</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Private Parties */}
            <Card className="bg-cyber-darkBg border-cyber-pink min-h-[300px] p-6">
              <div className="flex flex-col items-center text-center">
                <Users className="h-12 w-12 text-cyber-pink mb-4" />
                <h3 className="text-xl font-bold cyber-gradient-text mb-2">PRIVATE PARTIES</h3>
                <p className="text-cyber-blue">
                  Host your exclusive events in our premium venues with customized experiences and dedicated staff.
                </p>
              </div>
            </Card>

            {/* Music Festivals */}
            <Card className="bg-cyber-darkBg border-cyber-pink min-h-[300px] p-6">
              <div className="flex flex-col items-center text-center">
                <Music className="h-12 w-12 text-cyber-pink mb-4" />
                <h3 className="text-xl font-bold cyber-gradient-text mb-2">MUSIC FESTIVALS</h3>
                <p className="text-cyber-blue">
                  Experience the biggest music festivals with world-class artists and state-of-the-art sound systems.
                </p>
              </div>
            </Card>

            {/* Corporate Events */}
            <Card className="bg-cyber-darkBg border-cyber-pink min-h-[300px] p-6">
              <div className="flex flex-col items-center text-center">
                <Building className="h-12 w-12 text-cyber-pink mb-4" />
                <h3 className="text-xl font-bold cyber-gradient-text mb-2">CORPORATE EVENTS</h3>
                <p className="text-cyber-blue">
                  Professional venues and services for your corporate meetings, conferences, and team building events.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

