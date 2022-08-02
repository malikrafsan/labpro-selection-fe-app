import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  AdminPage as AdminPageLayout,
  DashboardPage,
} from '../../layouts';

export const adminPageOptions = [
  {
    label: 'Verify User',
    href: '/admin/verify-user',
  },
  {
    label: 'Verify Saldo Change',
    href: '/admin/verify-saldo-change',
  },
  {
    label: 'Find User',
    href: '/admin/find-user',
  }
];

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/verify-user');
  }, []);

  return (
    <AdminPageLayout>
      <DashboardPage options={adminPageOptions} />
    </AdminPageLayout>
  );
};

export default AdminPage;
