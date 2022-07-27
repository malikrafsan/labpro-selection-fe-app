import { useState } from 'react';
import { apiSrv, authSrv } from '../../../services';
import AuthForm from '../AuthForm';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    const data = await apiSrv.post({
      url: 'login',
      params: {
        username,
        password,
      },
    });

    if (data) {
      authSrv.setToken(data.token);
      authSrv.setIsAdmin(data.is_admin);
      router.push('/');
    }
  };

  return (
    <AuthForm
      title="Login to your account"
      fields={{
        username: {
          label: 'Username',
          type: 'text',
          value: username,
          onChange: (e) => setUsername(e.target.value),
        },
        password: {
          label: 'Password',
          type: 'password',
          value: password,
          onChange: (e) => setPassword(e.target.value),
        },
      }}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
