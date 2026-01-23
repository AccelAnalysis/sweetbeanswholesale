import { ApplicationForm } from "@/components/application-form"

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-coffee-dark">Wholesale Application</h1>
          <p className="text-xl text-coffee-medium max-w-2xl mx-auto">
            Join our wholesale family. Fill out the form below to request samples, get pricing, or start your account.
          </p>
        </div>
        <ApplicationForm defaultType="wholesale" />
      </div>
    </div>
  )
}
