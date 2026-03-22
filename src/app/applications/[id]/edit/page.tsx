import { notFound } from 'next/navigation'
import { getApplications } from '@/lib/applications'
import Sidebar from '@/components/layout/Sidebar'
import ApplicationForm from '@/components/ui/ApplicationForm'

export const dynamic = 'force-dynamic'

export default async function EditApplicationPage({ params }: { params: { id: string } }) {
  const apps = await getApplications()
  const app = apps.find(a => a.id === params.id)

  if (!app) notFound()

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6 border-b border-border">
          <h1 className="font-display font-bold text-xl">Edit Application</h1>
          <p className="text-sm text-muted mt-1">{app.company} — {app.role}</p>
        </div>
        <div className="p-8">
          <ApplicationForm existing={app} />
        </div>
      </main>
    </div>
  )
}
