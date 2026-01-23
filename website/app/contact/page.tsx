import { ApplicationForm } from "@/components/application-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-coffee-dark">Contact Us</h1>
          <p className="text-xl text-coffee-medium max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>
        <ApplicationForm defaultType="inquiry" />
      </div>
    </div>
  )
}
