import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AuthenticatedPage, DashboardPage } from '../../layouts';

export const transferPageOptions = [
  {
    label: 'Create',
    href: '/transfer/create',
  },
  {
    label: 'History',
    href: '/transfer/history',
  },
];

const TransferPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/transfer/create');
  }, []);

  return (
    <AuthenticatedPage>
      <DashboardPage options={transferPageOptions} />
    </AuthenticatedPage>
  );
};

export default TransferPage;
