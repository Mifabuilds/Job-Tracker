'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/dashboard', icon: '⬡', label: 'Dashboard' },
  { href: '/applications', icon: '☰', label: 'All Applications' },
  { href: '/applications?status=Interview', icon: '📅', label: 'Interviews' },
  { href: '/applications?status=Offer', icon: '★', label: 'Offers' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[220px] bg-surface border-r border-border flex flex-col gap-1.5 px-4 py-7 sticky top-0 h-screen flex-shrink-0">
      <div className="font-display font-extrabold text-[22px] tracking-tight text-ink px-3 pb-6">
        job<span className="text-accent2">br</span>
      </div>

      {navItems.map(item => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13.5px] transition-all
              ${isActive
                ? 'bg-accent text-white font-medium'
                : 'text-muted hover:bg-surface2 hover:text-ink'
              }`}
          >
            <span className="w-5 text-center text-base">{item.icon}</span>
            {item.label}
          </Link>
        )
      })}

      <div className="flex-1" />

      <Link
        href="/applications/new"
        className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-accent text-white text-[13px] font-medium hover:bg-[#6B5FD9] transition-colors"
      >
        + Add Application
      </Link>
    </aside>
  )
}
