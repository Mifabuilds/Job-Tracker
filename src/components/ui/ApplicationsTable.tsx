'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Application, Status } from '@/types'
import StatusBadge from '@/components/ui/StatusBadge'
import CompanyLogo from '@/components/ui/CompanyLogo'
import { deleteApplication } from '@/lib/applications'

const FILTERS: { label: string; value: Status | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Applied', value: 'Applied' },
  { label: 'Interview', value: 'Interview' },
  { label: 'Offer', value: 'Offer' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'Saved', value: 'Saved' },
]

const priorityColor: Record<string, string> = {
  High: '#F05C5C', Medium: '#F5C842', Low: '#34C98A',
}

export default function ApplicationsTable({ applications }: { applications: Application[] }) {
  const [filter, setFilter] = useState<Status | 'all'>('all')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const filtered = filter === 'all' ? applications : applications.filter(a => a.status === filter)

  async function handleDelete(id: string) {
    if (!confirm('Delete this application?')) return
    await deleteApplication(id)
    startTransition(() => router.refresh())
  }

  return (
    <div>
      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap mb-4">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3.5 py-1.5 rounded-full text-xs border transition-all
              ${filter === f.value
                ? 'bg-accent border-accent text-white'
                : 'bg-surface border-border text-muted hover:text-ink hover:border-muted'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-sm">No applications here yet.</p>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                {['Company / Role', 'Status', 'Applied', 'Salary', 'Priority', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-muted">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app.id} className="border-b border-border last:border-0 hover:bg-surface2 transition-colors">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <CompanyLogo name={app.company} />
                      <div>
                        <div className="font-medium text-ink text-sm">{app.company}</div>
                        <div className="text-xs text-muted mt-0.5">{app.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={app.status} />
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted">
                    {app.date_applied
                      ? new Date(app.date_applied).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })
                      : '—'}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-muted">{app.salary || '—'}</td>
                  <td className="px-4 py-3.5">
                    <span className="flex items-center gap-1.5 text-sm text-muted">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ background: priorityColor[app.priority] }}
                      />
                      {app.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/applications/${app.id}/edit`}
                        className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted hover:text-ink hover:bg-surface2 transition-all text-sm"
                      >
                        ✎
                      </Link>
                      <button
                        onClick={() => handleDelete(app.id)}
                        disabled={isPending}
                        className="w-7 h-7 rounded-md border border-border flex items-center justify-center text-muted hover:text-red hover:border-red hover:bg-red/10 transition-all text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
