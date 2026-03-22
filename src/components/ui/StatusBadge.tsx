import type { Status } from '@/types'

const config: Record<Status, { bg: string; text: string }> = {
  Applied:   { bg: 'bg-blue/10',   text: 'text-blue' },
  Interview: { bg: 'bg-yellow/10', text: 'text-yellow' },
  Offer:     { bg: 'bg-green/10',  text: 'text-green' },
  Rejected:  { bg: 'bg-red/10',    text: 'text-red' },
  Saved:     { bg: 'bg-accent/10', text: 'text-accent2' },
}

export default function StatusBadge({ status }: { status: Status }) {
  const { bg, text } = config[status] ?? config.Saved
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium ${bg} ${text}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
