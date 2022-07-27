import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AuthenticatedPage } from '../../layouts';

const SaldoChangesPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/saldo-changes/create');
  }, []);

  return <AuthenticatedPage />;
};

export default SaldoChangesPage;
