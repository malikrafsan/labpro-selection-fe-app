import { useState } from 'react';
import { apiSrv } from '../../../services';
import AuthForm from '../AuthForm';
import axios from 'axios';
// import { storage } from '../../../../firebase';
// import {
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
// } from 'firebase/storage';


const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fotoKTP, setFotoKTP] = useState<File>();

  const onSubmit = async () => {
    const base64 = fotoKTP ? await toBase64(fotoKTP) : '';
    console.log(base64);

    // if (!fotoKTP) {
    //   return;
    // }

    // const storageRef = ref(storage, `files/${fotoKTP.name}`);
    // const uploadTask = await uploadBytesResumable(storageRef, fotoKTP);
    // const url = await getDownloadURL(uploadTask.ref);

    const data = await apiSrv.post({
      url: 'register',
      params: {
        name,
        username,
        password,
        fotoKTP: base64,
        fileFoto: fotoKTP,
      },
    });
    console.log(data);
  };

  const submitFormData = async () => {
    if (!fotoKTP) {
      return;
    }

    const formData = new FormData();
    formData.append('fotoKTP', fotoKTP);
    const res = await axios.post("http://localhost:5000/upload", formData);
    console.log(res);
  }

  return (
    <AuthForm
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
        },
      }}
      onSubmit={onSubmit}
      // onSubmit={submitFormData}
    />
  );
};

export default RegisterForm;
