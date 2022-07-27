import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { authSrv } from '../../services';
import { AuthenticatedPage } from '../';

const AdminPage = (props: {
  children?:
    | JSX.Element
    | JSX.Element[]
    | boolean
    | (JSX.Element | boolean)[];
}) => {
  const { children } = props;

  const router = useRouter();

  useEffect(() => {
    if (!authSrv.isAdmin()) {
      router.push('/auth/login');
    }
  }, []);

  return <AuthenticatedPage>{children}</AuthenticatedPage>;
};

export default AdminPage;
