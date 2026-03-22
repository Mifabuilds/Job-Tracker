'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Application, ApplicationInsert, Status, Priority } from '@/types'
import { createApplication, updateApplication } from '@/lib/applications'

const STATUSES: Status[] = ['Saved', 'Applied', 'Interview', 'Offer', 'Rejected']
const PRIORITIES: Priority[] = ['High', 'Medium', 'Low']

interface Props {
  existing?: Application
}

export default function ApplicationForm({ existing }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<ApplicationInsert>({
    company:      existing?.company      ?? '',
    role:         existing?.role         ?? '',
    status:       existing?.status       ?? 'Applied',
    priority:     existing?.priority     ?? 'Medium',
    date_applied: existing?.date_applied ?? new Date().toISOString().slice(0, 10),
    salary:       existing?.salary       ?? '',
    notes:        existing?.notes        ?? '',
  })

  function set(key: keyof ApplicationInsert, value: string) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.company || !form.role) return

    setLoading(true)
    try {
      if (existing) {
        await updateApplication(existing.id, form)
      } else {
        await createApplication(form)
      }
      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-surface2 border border-border rounded-lg px-3 py-2.5 text-sm text-ink placeholder-muted focus:outline-none focus:border-accent transition-colors"
  const labelClass = "block text-[11px] font-semibold uppercase tracking-widest text-muted mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Company *</label>
          <input className={inputClass} placeholder="e.g. Shopify" value={form.company} onChange={e => set('company', e.target.value)} required />
        </div>
        <div>
          <label className={labelClass}>Role *</label>
          <input className={inputClass} placeholder="e.g. Frontend Developer" value={form.role} onChange={e => set('role', e.target.value)} required />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Status</label>
          <select className={inputClass} value={form.status} onChange={e => set('status', e.target.value)}>
            {STATUSES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Priority</label>
          <select className={inputClass} value={form.priority} onChange={e => set('priority', e.target.value)}>
            {PRIORITIES.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Date Applied</label>
          <input className={inputClass} type="date" value={form.date_applied ?? ''} onChange={e => set('date_applied', e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Salary Range</label>
          <input className={inputClass} placeholder="e.g. $90k–$110k" value={form.salary ?? ''} onChange={e => set('salary', e.target.value)} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          placeholder="Referral, job board, contact name…"
          value={form.notes ?? ''}
          onChange={e => set('notes', e.target.value)}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-accent text-white rounded-lg text-sm font-medium hover:bg-[#6B5FD9] disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving…' : existing ? 'Save Changes' : 'Add Application'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-surface2 border border-border text-ink rounded-lg text-sm font-medium hover:bg-border transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
