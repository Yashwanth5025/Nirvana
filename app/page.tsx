import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Home() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Summer Bash",
      date: "June 15, 2025",
      time: "8:00 PM - 2:00 AM",
      location: "Sunset Villa, Los Angeles",
      image: "/images/party1.jpg",
    },
    {
      id: 2,
      title: "Neon Night",
      date: "July 10, 2025",
      time: "9:00 PM - 3:00 AM",
      location: "Urban Loft, New York",
      image: "/images/party2.jpg",
    },
    {
      id: 3,
      title: "Beach Party",
      date: "August 5, 2025",
      time: "4:00 PM - 12:00 AM",
      location: "Ocean View, Miami",
      image: "/images/party3.jpg",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-cyber-darkBg text-white">
      <Navbar />
      <main className="flex-1">
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
            <p className="mb-8 max-w-md text-lg md:max-w-xl md:text-xl">
              Join us for the most epic house parties with amazing music, people, and unforgettable experiences
            </p>
            <Link href="/book">
              <Button size="lg" className="cyber-button">
                RSVP Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="cyber-section py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl cyber-gradient-text">About Nirvana</h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="flex items-center justify-center">
                <Image
                  src="/images/nirvana-logo.png"
                  alt="About Nirvana"
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="mb-4 text-lg text-cyber-blue">
                  Nirvana is all about creating the ultimate house party experience. We don't host parties for others -
                  we ARE the party!
                </p>
                <p className="mb-4 text-lg text-cyber-blue">
                  Founded in 2020, we've thrown over 50 legendary parties that have become the talk of the town,
                  bringing together music lovers and party enthusiasts.
                </p>
                <p className="text-lg text-cyber-blue">
                  Our team of passionate DJs, artists, and organizers are dedicated to creating an atmosphere where
                  everyone feels welcome and the vibes are always immaculate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section id="events" className="bg-cyber-mediumBg py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl cyber-gradient-text">Upcoming Events</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="cyber-card overflow-hidden transition-transform hover:scale-105">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={600}
                    height={400}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-cyber-pink">{event.title}</h3>
                    <div className="mb-2 flex items-center text-cyber-blue">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="mb-2 flex items-center text-cyber-blue">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="mb-4 flex items-center text-cyber-blue">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <Link href="/book">
                      <Button className="w-full cyber-button">Book Now</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cyber-gradient-bg py-16 text-white md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Join Our Next Epic Party?</h2>
            <p className="mb-8 mx-auto max-w-2xl text-lg">
              Don't miss out on the best night of your life. RSVP now to secure your spot!
            </p>
            <Link href="/book">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-cyber-purple"
              >
                RSVP Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

