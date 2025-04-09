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
import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function BookingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfTickets: 1,
    transactionId: "",
    passType: "normal"
  })

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast.error("Payment time expired. Please refresh the page to try again.");
    }
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const calculateTotal = () => {
    const basePrice = formData.passType === "vip" ? 4000 : 3000;
    return basePrice * formData.numberOfTickets;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "numberOfTickets") {
      const numValue = parseInt(value);
      if (numValue > 0) {
        setFormData(prev => ({ ...prev, [name]: numValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handlePassTypeChange = (value: string) => {
    setFormData(prev => ({ ...prev, passType: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (timeLeft === 0) {
      toast.error("Payment time expired. Please refresh the page to try again.");
      return;
    }

    if (!formData.transactionId) {
      toast.error("Please enter the transaction ID");
      return;
    }

    setLoading(true)
    setError('')

    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`Server responded with status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        setShowAlert(true);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
        console.error('Registration error:', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast.error(`Failed to connect to server. Please check if the server is running.`);
    } finally {
      setLoading(false);
    }
  }

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-cyber-pink">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="cyber-input text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-cyber-pink">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="cyber-input text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-cyber-pink">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="cyber-input text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numberOfTickets" className="text-cyber-pink">Number of Tickets</Label>
                    <Input
                      id="numberOfTickets"
                      name="numberOfTickets"
                      type="number"
                      min="1"
                      required
                      value={formData.numberOfTickets}
                      onChange={handleInputChange}
                      className="cyber-input text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-cyber-pink">Pass Type</Label>
                    <RadioGroup 
                      value={formData.passType} 
                      onValueChange={handlePassTypeChange}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="normal" 
                          id="normal"
                          className="border-cyber-pink text-cyber-pink data-[state=checked]:bg-cyber-pink"
                        />
                        <Label htmlFor="normal" className="text-white">Normal Pass - ₹3,000</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem 
                          value="vip" 
                          id="vip"
                          className="border-cyber-pink text-cyber-pink data-[state=checked]:bg-cyber-pink"
                        />
                        <Label htmlFor="vip" className="text-white">VIP Pass - ₹4,000</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* QR Code and Timer Section */}
                  <div className="mt-8 space-y-4 border border-cyber-pink rounded-lg p-6 bg-cyber-darkBg/50">
                    <div className="flex flex-col items-center">
                      <div className="text-center mb-4">
                        <div className="text-xl font-bold cyber-gradient-text mb-2">
                          Total Amount: ₹{calculateTotal().toLocaleString()}
                        </div>
                        <p className="text-cyber-blue">Make sure to pay the exact amount to this QR</p>
                      </div>

                      {/* QR Code */}
                      <img 
                        src="/images/upi-qr.jpg" 
                        alt="UPI QR Code" 
                        className="w-64 h-64 mb-4 bg-white p-2 rounded-lg"
                      />
                      
                      {/* Timer */}
                      <div className="w-full max-w-xs mb-2">
                        <div className="flex justify-between text-sm text-cyber-blue mb-1">
                          <span>Time Remaining:</span>
                          <span className="font-bold">{formatTime(timeLeft)}</span>
                        </div>
                        <div className="w-full h-2 bg-cyber-mediumBg rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-cyber-pink transition-all duration-1000"
                            style={{ width: `${(timeLeft / 300) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* UPI ID */}
                      <div className="mt-4 text-center">
                        <p className="text-cyber-blue text-sm">UPI ID: rithvikdofficial@okaxis</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionId" className="text-cyber-pink">UPI Transaction ID</Label>
                    <Input
                      id="transactionId"
                      name="transactionId"
                      required
                      value={formData.transactionId}
                      onChange={handleInputChange}
                      className="cyber-input text-white"
                      placeholder="Enter your UPI transaction ID"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <p className="mb-4 text-sm text-cyber-blue">
                    By clicking "Get Ticket" you agree to our <Link href="/terms" className="text-cyber-pink hover:underline">Terms and Conditions</Link>
                  </p>
                  <Button 
                    type="submit" 
                    className="w-full cyber-button"
                    disabled={loading || timeLeft === 0}
                  >
                    {loading ? 'Processing...' : timeLeft === 0 ? 'Time Expired' : 'Get Ticket'}
                  </Button>
                  {error && <p className="mt-4 text-red-500">{error}</p>}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent className="bg-cyber-mediumBg border-cyber-pink">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-cyber-pink">Registration Successful!</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              Thank you for registering! Please note that it might take 2-3 hours to verify your payment and send the ticket to your email. Make sure to check your spam folder.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={() => router.push('/')}
              className="bg-cyber-pink hover:bg-cyber-pink/80"
            >
              Back to Home
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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

