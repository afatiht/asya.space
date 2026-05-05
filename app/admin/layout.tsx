import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import AdminNav from '@/components/AdminNav';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await getAdminSession();
  if (!authed) redirect('/admin/login');

  return (
    <div>
      <AdminNav />
      <div className="page" style={{ paddingTop: 0 }}>{children}</div>
    </div>
  );
}
