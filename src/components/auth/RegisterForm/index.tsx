import { useState, useContext } from 'react';
import { useRouter } from 'next/router';

import styles from './index.module.css';
import { NotifContext } from '../../../contexts';
import { BootstrapVariant } from '../../../enums';
import { apiSrv } from '../../../services';
import { AuthForm } from '../../';
import { storage } from '../../../../firebase';
import { toBase64 } from '../../../utils';
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

const RegisterForm = () => {
  const router = useRouter();
  const pushNotif = useContext(NotifContext);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fotoKTP, setFotoKTP] = useState<File>();

  const onSubmit = async () => {
    const base64 = fotoKTP ? await toBase64(fotoKTP) : '';
    console.log(base64);

    if (!fotoKTP) {
      return;
    }

    const storageRef = ref(storage, `files/${name}-${Math.random()}`);
    const uploadTask = await uploadBytesResumable(
      storageRef,
      fotoKTP,
    );
    const url = await getDownloadURL(uploadTask.ref);

    const data = await apiSrv.post({
      url: 'register',
      params: {
        name,
        username,
        password,
        fotoKTP: base64,
        urlFotoKTP: url,
      },
    });

    if (data) {
      pushNotif({
        header: 'Successfully register user',
        content: [
          'Please wait for admin to verify your account',
        ],
        variant: BootstrapVariant.SUCCESS,
      });
    }
  };

  return (
    <div className={styles.container + ' d-flex w-100'}>
      <AuthForm
        title="Register your account"
        fields={{
          name: {
            label: 'Name',
            type: 'text',
            value: name,
            onChange: (e) => setName(e.target.value),
          },
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
          fotoKTP: {
            label: 'Foto KTP',
            type: 'file',
            onChange: (e) => {
              if (e.target.files && e.target.files[0]) {
                setFotoKTP(e.target.files[0]);
              }
            },
            accept: 'image/*',
            file: fotoKTP,
          },
        }}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default RegisterForm;
