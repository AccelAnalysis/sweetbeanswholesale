import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Download, BookOpen, Video } from "lucide-react"

export default function ResourcesPage() {
  const resources = [
    {
      category: "Brew Guides",
      items: [
        {
          title: "Espresso Dialing-In Guide",
          description: "Step-by-step instructions for adjusting grind size and dose for the perfect shot.",
          type: "PDF",
          icon: FileText
        },
        {
          title: "Batch Brew Standards",
          description: "Water-to-coffee ratios and temperature settings for Fetco and Curtis brewers.",
          type: "PDF",
          icon: FileText
        },
        {
          title: "Pour-Over Technique",
          description: "V60 and Kalita Wave recipes for our single-origin roasts.",
          type: "Video",
          icon: Video
        }
      ]
    },
    {
      category: "Staff Training",
      items: [
        {
          title: "Milk Steaming & Latte Art",
          description: "Fundamentals of microfoam and basic pouring techniques.",
          type: "Video",
          icon: Video
        },
        {
          title: "Customer Service Scripts",
          description: "How to talk about coffee origins and flavor notes with customers.",
          type: "PDF",
          icon: FileText
        },
        {
          title: "Equipment Maintenance Log",
          description: "Daily, weekly, and monthly cleaning checklists for espresso machines.",
          type: "Template",
          icon: FileText
        }
      ]
    },
    {
      category: "Marketing Assets",
      items: [
        {
          title: "Sweet Beans Brand Assets",
          description: "Logos, photos, and social media templates for your marketing.",
          type: "ZIP",
          icon: Download
        },
        {
          title: "Origin Story Cards",
          description: "Printable cards with farm details for our current single origins.",
          type: "PDF",
          icon: FileText
        }
      ]
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      
      {/* Header */}
      <section className="bg-coffee-dark text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Partner Resources</h1>
            <p className="text-xl text-white/80">
              Everything you need to run a successful coffee program. 
              Guides, training materials, and marketing assets for our wholesale partners.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-16">
            {resources.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl font-bold text-coffee-dark mb-8 flex items-center gap-2">
                  <div className="h-8 w-2 bg-brand-purple rounded-full" />
                  {section.category}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-coffee-light/20 hover:shadow-md transition-shadow group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-10 w-10 bg-cream rounded-lg flex items-center justify-center text-coffee-dark group-hover:bg-brand-purple/10 group-hover:text-brand-purple transition-colors">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-coffee-medium bg-coffee-light/20 px-2 py-1 rounded">
                          {item.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-coffee-dark mb-2">{item.title}</h3>
                      <p className="text-coffee-medium text-sm mb-6">
                        {item.description}
                      </p>
                      <Button variant="outline" className="w-full gap-2 group-hover:border-brand-purple group-hover:text-brand-purple">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Help CTA */}
      <section className="py-16 bg-white border-t border-coffee-light/20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="bg-brand-purple/5 rounded-2xl p-8 md:p-12 border border-brand-purple/10">
             <BookOpen className="h-12 w-12 text-brand-purple mx-auto mb-4" />
             <h2 className="text-2xl font-bold text-coffee-dark mb-4">Need personalized training?</h2>
             <p className="text-coffee-medium max-w-2xl mx-auto mb-8">
               We offer on-site barista training and equipment calibration for all our wholesale partners.
               Schedule a session with our education team.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <Button className="bg-brand-purple text-white hover:bg-brand-purple-dark" asChild>
                 <Link href="/contact">Schedule Training</Link>
               </Button>
               <Button variant="outline" asChild>
                 <Link href="/wholesale/portal">Login to Portal</Link>
               </Button>
             </div>
          </div>
        </div>
      </section>

    </div>
  )
}
