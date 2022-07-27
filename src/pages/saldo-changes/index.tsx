import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AuthenticatedPage, DashboardPage } from '../../layouts';

export const saldoChangesPageOptions = [
  {
    label: 'Create',
    href: '/saldo-changes/create',
  },
  {
    label: 'History',
    href: '/saldo-changes/history',
  },
];

const SaldoChangesPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/saldo-changes/create');
  }, []);

  return (
    <AuthenticatedPage>
      <DashboardPage options={saldoChangesPageOptions} />
    </AuthenticatedPage>
  );
};

export default SaldoChangesPage;
