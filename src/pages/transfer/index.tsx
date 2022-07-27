import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AuthenticatedPage } from '../../layouts';

const TransferPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/transfer/create');
  }, []);

  return <AuthenticatedPage />;
};

export default TransferPage;
