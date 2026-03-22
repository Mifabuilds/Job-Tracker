import { getApplications } from '@/lib/applications'
import Sidebar from '@/components/layout/Sidebar'
import StatCard from '@/components/ui/StatCard'
import ApplicationsTable from '@/components/ui/ApplicationsTable'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const apps = await getApplications()

  const total     = apps.length
  const interviews = apps.filter(a => a.status === 'Interview').length
  const offers    = apps.filter(a => a.status === 'Offer').length
  const applied   = apps.filter(a => a.status !== 'Saved').length
  const rate      = applied > 0 ? Math.round(((interviews + offers) / applied) * 100) : 0

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {/* Topbar */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border sticky top-0 bg-bg z-10">
          <h1 className="font-display font-bold text-xl">Dashboard</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 p-8 pb-0">
          <StatCard label="Total Applications" value={total}       sub="across all statuses" color="#A599FF" />
          <StatCard label="Interviews"          value={interviews}  sub="active conversations" color="#F5C842" />
          <StatCard label="Offers"              value={offers}      sub="received"             color="#34C98A" />
          <StatCard label="Response Rate"       value={`${rate}%`} sub="interviews + offers"  color="#4EA8F5" />
        </div>

        {/* Table */}
        <div className="p-8">
          <ApplicationsTable applications={apps} />
        </div>
      </main>
    </div>
  )
}
