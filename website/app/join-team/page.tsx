import { ApplicationForm } from "@/components/application-form"

export default function JoinTeamPage() {
  return (
    <div className="min-h-screen bg-cream py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-coffee-dark">Join Our Team</h1>
          <p className="text-xl text-coffee-medium max-w-2xl mx-auto">
            We&apos;re always looking for passionate people to join our cafe and roastery teams.
          </p>
        </div>
        <ApplicationForm defaultType="join_team" />
      </div>
    </div>
  )
}
