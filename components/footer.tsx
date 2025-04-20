import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="cyber-footer py-12 text-cyber-blue">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4">
              <img src="/images/nirvana-logo.png" alt="Nirvana" className="h-16 w-auto" />
            </div>
            <p className="mb-4 text-cyber-blue">
              We host the most epic house parties in town. Join us for unforgettable nights of music, dancing, and good
              vibes.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-6 w-6 transition-colors text-cyber-blue hover:text-cyber-pink" />
              </Link>
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6 transition-colors text-cyber-blue hover:text-cyber-pink" />
              </Link>
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-6 w-6 transition-colors text-cyber-blue hover:text-cyber-pink" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-cyber-pink">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-cyber-blue hover:text-cyber-pink">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#events" className="text-cyber-blue hover:text-cyber-pink">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-cyber-blue hover:text-cyber-pink">
                  Book an Event
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-cyber-pink">Contact Us</h3>
            <p className="text-cyber-blue">Email: info@nirvana.com</p>
            <a 
              href="https://www.instagram.com/nirvana.productionss/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-cyber-blue hover:text-cyber-pink transition-colors"
            >
              Instagram: @nirvana.productionss
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-cyber-purple pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Nirvana Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

