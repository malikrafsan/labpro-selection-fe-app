import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { authSrv } from '../../services';
import { Sidebar } from '../../components';

const AuthenticatedPage = (props: {
  children?:
    | JSX.Element
    | JSX.Element[]
    | boolean
    | (JSX.Element | boolean)[];
}) => {
  const { children } = props;

  const router = useRouter();

  useEffect(() => {
    if (!authSrv.isAuthenticated()) {
      router.push('/auth/login');
    }
  }, []);

  return <>{children}</>;
};

export default AuthenticatedPage;
