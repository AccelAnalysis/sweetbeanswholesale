"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Coffee, Store, Truck, Send, Briefcase } from "lucide-react"
import { submitToGoogleSheet, SubmissionData } from "@/lib/api"

interface ApplicationFormProps {
  defaultType?: "wholesale" | "inquiry" | "join_team"
}

export function ApplicationForm({ defaultType = "wholesale" }: ApplicationFormProps) {
  const [formType, setFormType] = useState<"wholesale" | "inquiry" | "join_team">(defaultType)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Collect form data
    const formData = new FormData(e.target as HTMLFormElement)
    const data: Record<string, unknown> = Object.fromEntries(formData.entries())
    
    // Add type and handle arrays (checkboxes)
    let submissionType = 'inquiry';
    if (formType === 'wholesale') submissionType = 'application';
    if (formType === 'join_team') submissionType = 'join_team';
    
    data.type = submissionType
    
    if (formType === 'wholesale') {
      // Handle sample checkboxes manually
      const samples = Array.from((e.target as HTMLFormElement).querySelectorAll('input[name="samples"]:checked'))
        .map((input) => (input as HTMLInputElement).value)
      data.samples = samples
    }

    try {
      await submitToGoogleSheet(data as unknown as SubmissionData)
      
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error(error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg max-w-lg text-center space-y-6 border border-coffee-light/20 mx-auto">
        <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-coffee-dark">Request Received!</h1>
        <p className="text-coffee-medium text-lg">
          Thanks for your interest in Sweet Beans. Our team will review your application and get back to you within 24-48 hours.
        </p>
        <p className="text-sm text-coffee-medium">
          Keep an eye on your email for next steps and shipping info for your samples.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Return to Form
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-center gap-4 p-1 bg-white rounded-lg border border-coffee-light/20 w-fit mx-auto">
        <button
          onClick={() => setFormType("wholesale")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            formType === "wholesale"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-coffee-medium hover:bg-coffee-light/10"
          }`}
        >
          Wholesale Application
        </button>
        <button
          onClick={() => setFormType("inquiry")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            formType === "inquiry"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-coffee-medium hover:bg-coffee-light/10"
          }`}
        >
          General Inquiry
        </button>
        <button
          onClick={() => setFormType("join_team")}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            formType === "join_team"
              ? "bg-brand-purple text-white shadow-sm"
              : "text-coffee-medium hover:bg-coffee-light/10"
          }`}
        >
          Join Team
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-coffee-light/20 overflow-hidden">
        <div className="bg-coffee-dark p-6 text-white flex gap-4 items-center">
          {formType === "wholesale" && (
            <>
              <Store className="h-6 w-6 text-brand-purple-light" />
              <div>
                <h2 className="font-bold text-lg">New Account Application</h2>
                <p className="text-white/80 text-sm">Tell us about your business coffee needs.</p>
              </div>
            </>
          )}
          {formType === "inquiry" && (
            <>
               <Coffee className="h-6 w-6 text-brand-purple-light" />
               <div>
                <h2 className="font-bold text-lg">General Contact Form</h2>
                <p className="text-white/80 text-sm">Questions about training, events, or specific beans?</p>
              </div>
            </>
          )}
          {formType === "join_team" && (
            <>
               <Briefcase className="h-6 w-6 text-brand-purple-light" />
               <div>
                <h2 className="font-bold text-lg">Join Our Team</h2>
                <p className="text-white/80 text-sm">Apply for a position at our roastery or cafe.</p>
              </div>
            </>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-coffee-dark border-b border-coffee-light/20 pb-2">
              Contact Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="contactName" placeholder="Jane Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="(757) 555-0123" required />
              </div>
            </div>
          </div>

          {/* Business Info Section - Only for Wholesale */}
          {formType === "wholesale" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-coffee-dark border-b border-coffee-light/20 pb-2">
                Business Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input id="businessName" name="businessName" placeholder="Sweet Beans Cafe" required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <select 
                    id="businessType"
                    name="businessType"
                    className="flex h-10 w-full rounded-md border border-coffee-light/30 bg-white px-3 py-2 text-sm text-coffee-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                    required
                  >
                    <option value="">Select type...</option>
                    <option value="cafe">Cafe / Coffee Shop</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="office">Office / Corporate</option>
                    <option value="bakery">Bakery</option>
                    <option value="church">Church / Non-profit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Shipping Address</Label>
                  <Input id="address" name="address" placeholder="123 Main St, Hampton, VA 23666" required />
                </div>
              </div>
            </div>
          )}

          {/* Coffee Needs Section - Only for Wholesale */}
          {formType === "wholesale" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-coffee-dark border-b border-coffee-light/20 pb-2">
                Coffee Needs
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label htmlFor="volume">Estimated Weekly Volume (lbs)</Label>
                  <select 
                    id="volume"
                    name="volume"
                    className="flex h-10 w-full rounded-md border border-coffee-light/30 bg-white px-3 py-2 text-sm text-coffee-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                  >
                    <option value="0-10">0 - 10 lbs</option>
                    <option value="10-25">10 - 25 lbs</option>
                    <option value="25-50">25 - 50 lbs</option>
                    <option value="50+">50+ lbs</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="equipment">Current Equipment (Espresso/Brewer)</Label>
                  <Input id="equipment" name="equipment" placeholder="e.g. La Marzocco, Fetco..." />
                </div>
              </div>
              
              <div className="space-y-3 pt-2">
                <Label>Sample Preferences (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {["Espresso Blend", "Medium Drip", "Light Roast", "Dark Roast", "Decaf"].map((item) => (
                    <label key={item} className="flex items-center space-x-2 text-sm text-coffee-medium cursor-pointer">
                      <input type="checkbox" name="samples" value={item} className="rounded border-coffee-light text-brand-purple focus:ring-brand-purple" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Job Application Section - Only for Join Team */}
          {formType === "join_team" && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-coffee-dark border-b border-coffee-light/20 pb-2">
                Application Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="position">Position of Interest</Label>
                  <select 
                    id="position"
                    name="position"
                    className="flex h-10 w-full rounded-md border border-coffee-light/30 bg-white px-3 py-2 text-sm text-coffee-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple"
                    required
                  >
                    <option value="">Select position...</option>
                    <option value="barista">Barista</option>
                    <option value="kitchen">Kitchen / Prep</option>
                    <option value="roaster">Roaster / Production</option>
                    <option value="driver">Delivery Driver</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input id="availability" name="availability" placeholder="e.g. Full-time, Weekends, Mornings" required />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="resumeLink">Link to Resume / Portfolio (Optional)</Label>
                  <Input id="resumeLink" name="resumeLink" placeholder="Google Drive, LinkedIn, or personal site URL" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="experience">Relevant Experience</Label>
                  <Textarea 
                    id="experience" 
                    name="experience" 
                    placeholder="Tell us about your coffee or hospitality experience..." 
                    className="min-h-[100px]"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Message Section */}
          <div className="space-y-2">
            <Label htmlFor="message">
              {formType === "wholesale" ? "Additional Notes or Questions" : "How can we help?"}
            </Label>
            <Textarea 
              id="message" 
              name={formType === "wholesale" ? "notes" : "message"}
              placeholder={formType === "wholesale" ? "Tell us about your coffee program goals..." : "I'm interested in..."}
              className="min-h-[120px]"
            />
          </div>

          <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? "Sending..." : (formType === "wholesale" ? "Submit Application" : formType === "join_team" ? "Submit Application" : "Send Inquiry")}
          </Button>
          
          <p className="text-xs text-coffee-medium text-center md:text-left">
            By submitting this form, you agree to receive email communications from Sweet Beans.
          </p>

        </form>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 text-center">
        <div className="p-4 bg-white rounded-lg border border-coffee-light/10">
          <Truck className="h-6 w-6 text-brand-purple mx-auto mb-2" />
          <h3 className="font-bold text-coffee-dark">Fast Delivery</h3>
          <p className="text-sm text-coffee-medium">Orders ship within 3-5 business days.</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-coffee-light/10">
          <Coffee className="h-6 w-6 text-brand-purple mx-auto mb-2" />
          <h3 className="font-bold text-coffee-dark">Fresh Roasted</h3>
          <p className="text-sm text-coffee-medium">Roasted in small batches in Hampton, VA.</p>
        </div>
        <div className="p-4 bg-white rounded-lg border border-coffee-light/10">
          <Store className="h-6 w-6 text-brand-purple mx-auto mb-2" />
          <h3 className="font-bold text-coffee-dark">Low Minimums</h3>
          <p className="text-sm text-coffee-medium">Start with just 10lbs per order.</p>
        </div>
      </div>
    </div>
  )
}
