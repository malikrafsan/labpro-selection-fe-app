import { useState } from 'react';
import { apiSrv } from '../../../services';
import AuthForm from '../AuthForm';

const LoginForm = () => {
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
      console.log(data);
      apiSrv.setToken(data);
    }
  };

  return (
    <AuthForm
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
