import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { DashboardSidebar } from '@/components/DashboardSidebar'
import { DashboardTopbar } from '@/components/DashboardTopbar'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--g-surface)' }}>
      <DashboardSidebar user={session.user} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <DashboardTopbar user={session.user} />
        <main style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
