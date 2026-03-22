const COLORS = [
  '#7C6EF0','#4EA8F5','#34C98A','#F5C842',
  '#F05C5C','#F5955C','#A599FF','#5CE0C9',
]

function colorFor(str: string): string {
  let h = 0
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) % COLORS.length
  return COLORS[h]
}

function initials(str: string): string {
  return str.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function CompanyLogo({ name }: { name: string }) {
  const color = colorFor(name)
  return (
    <div
      className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 font-display"
      style={{ background: `${color}22`, color }}
    >
      {initials(name)}
    </div>
  )
}
