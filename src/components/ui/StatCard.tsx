interface StatCardProps {
  label: string
  value: string | number
  sub: string
  color: string
}

export default function StatCard({ label, value, sub, color }: StatCardProps) {
  return (
    <div className="bg-surface border border-border rounded-xl p-5">
      <div className="text-[11px] uppercase tracking-widest text-muted font-medium mb-2">{label}</div>
      <div className="font-display font-bold text-[32px] leading-none mb-1" style={{ color }}>{value}</div>
      <div className="text-xs text-muted">{sub}</div>
    </div>
  )
}
