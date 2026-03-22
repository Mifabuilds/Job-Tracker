import { getApplications } from '@/lib/applications'
import Sidebar from '@/components/layout/Sidebar'
import ApplicationsTable from '@/components/ui/ApplicationsTable'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ApplicationsPage() {
  const apps = await getApplications()

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="flex items-center justify-between px-8 py-6 border-b border-border sticky top-0 bg-bg z-10">
          <h1 className="font-display font-bold text-xl">All Applications</h1>
          <Link
            href="/applications/new"
            className="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium hover:bg-[#6B5FD9] transition-colors"
          >
            + Add Application
          </Link>
        </div>
        <div className="p-8">
          <ApplicationsTable applications={apps} />
        </div>
      </main>
    </div>
  )
}
