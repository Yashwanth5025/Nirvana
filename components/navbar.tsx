"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export default function Navbar() {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 cyber-header">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <img src="/images/nirvana-logo.png" alt="Nirvana" className="h-10 w-auto" />
        </Link>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-cyber-pink hover:text-cyber-blue"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {isMenuOpen && (
              <div className="absolute left-0 top-16 z-50 w-full bg-cyber-darkBg p-4 shadow-md border-b border-cyber-purple">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="/#about"
                    className="text-cyber-blue hover:text-cyber-pink"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/#events"
                    className="text-cyber-blue hover:text-cyber-pink"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Events
                  </Link>
                  <Link
                    href="/book"
                    className="text-cyber-blue hover:text-cyber-pink"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    RSVP
                  </Link>
                  <Link href="/book">
                    <Button className="w-full cyber-button">RSVP Now</Button>
                  </Link>
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center space-x-8">
            <nav className="flex space-x-8">
              <Link href="/#about" className="text-cyber-blue hover:text-cyber-pink">
                About
              </Link>
              <Link href="/#events" className="text-cyber-blue hover:text-cyber-pink">
                Events
              </Link>
            </nav>
            <Link href="/book">
              <Button className="cyber-button">RSVP Now</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}

