import Sidebar from '@/components/layout/Sidebar'
import ApplicationForm from '@/components/ui/ApplicationForm'

export default function NewApplicationPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="px-8 py-6 border-b border-border">
          <h1 className="font-display font-bold text-xl">Add Application</h1>
          <p className="text-sm text-muted mt-1">Track a new job you've applied to or saved.</p>
        </div>
        <div className="p-8">
          <ApplicationForm />
        </div>
      </main>
    </div>
  )
}
