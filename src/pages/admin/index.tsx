import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { AdminPage as AdminPageLayout } from '../../layouts';

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/verify-user');
  }, []);

  return <AdminPageLayout />;
}

export default AdminPage;