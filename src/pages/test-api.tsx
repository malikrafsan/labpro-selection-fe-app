import type { NextPage } from 'next';
import styles from '../styles/test-api.module.css';
import { apiSrv } from '../services';
import { useState } from 'react';
import { storage } from '../../firebase';
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

const toBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const uploadFile = async (file: File, filename: string) => {
  const storageRef = ref(storage, `files/${filename}`);
  const uploadTask = await uploadBytesResumable(storageRef, file);
  const url = await getDownloadURL(uploadTask.ref);
  return url;
};

const TestLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
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
    <div>
      <h3>Login Api</h3>
      <div>
        <div>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
      </div>
      <button onClick={handleLogin}>Submit</button>
    </div>
  );
};

const TestRegister = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fotoKTP, setFotoKTP] = useState<File>();

  const handleRegister = async () => {
    if (!name || !username || !password || !fotoKTP) {
      alert('all fields are required');
      return;
    }

    const base64 = await toBase64(fotoKTP);
    const url = await uploadFile(fotoKTP, `${name}-${Math.random()}`);

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

    console.log(data);
  };

  return (
    <div>
      <h3>Register Api</h3>
      <div>
        <div>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Foto KTP
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFotoKTP(e.target.files[0]);
                }
              }}
              accept="image/*"
            />
          </label>
        </div>
      </div>
      <button onClick={handleRegister}>Submit</button>
    </div>
  );
};

const TestVerify = () => {
  const [username, setUsername] = useState('');
  const [verify, setVerify] = useState(false);

  const handleVerify = async () => {
    const data = await apiSrv.post({
      url: 'verify',
      params: {
        username,
        verified: verify,
      },
    });

    console.log(data);
  };

  return (
    <div>
      <h3>Verify Api</h3>
      <div>
        <div>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Verify
            <input
              type="radio"
              name="verify"
              checked={verify}
              onChange={(e) => setVerify(e.target.checked)}
            />
          </label>
        </div>
      </div>
      <button onClick={handleVerify}>Submit</button>
    </div>
  );
};

const TestSaldoChangesHistory = () => {
  const handleGetSaldoChangesHistory = async () => {
    const data = await apiSrv.get({
      url: 'saldo-changes',
    });

    console.log(data);
  };

  return (
    <div>
      <h3>Req Saldo Changes Api</h3>
      <div>
        <button onClick={handleGetSaldoChangesHistory}>
          Get Saldo Changes History
        </button>
      </div>
    </div>
  );
};

const TestReqSaldoChanges = () => {
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState(0);

  const handleReqSaldoChanges = async () => {
    const data = await apiSrv.post({
      url: 'saldo-changes',
      params: {
        currency,
        amount_source: amount,
      },
    });

    console.log(data);
  };

  return (
    <div>
      <h3>Req Saldo Changes Api</h3>
      <div>
        <div>
          <label>
            Currency
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Amount
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
            />
          </label>
        </div>
        <button onClick={handleReqSaldoChanges}>
          Request Saldo Changes
        </button>
      </div>
    </div>
  );
};

const TestGetAllDraftRequest = () => {
  const handleGetAllDraftRequest = async () => {
    const data = await apiSrv.get({
      url: 'saldo-changes/requests',
    });

    console.log(data);
  };

  return (
    <div>
      <h3>Get All Draft Request Api</h3>
      <div>
        <button onClick={handleGetAllDraftRequest}>
          Get All Draft Request
        </button>
      </div>
    </div>
  );
};

const TestVerifyDraftRequest = () => {
  const [id, setId] = useState('');
  const [verify, setVerify] = useState(false);

  const handleVerifyDraftRequest = async () => {
    const data = await apiSrv.post({
      url: `saldo-changes/${id}/verify`,
      params: {
        verified: verify,
      },
    });

    console.log(data);
  };

  return (
    <div>
      <h3>Verify Draft Request Api</h3>
      <div>
        <div>
          <label>
            Id
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </label>
        </div>
        <div>
          Verify
          <input
            type="radio"
            name="verify"
            checked={verify}
            onChange={(e) => setVerify(e.target.checked)}
          />
        </div>
      </div>
      <button onClick={handleVerifyDraftRequest}>Verify</button>
    </div>
  );
};

const TestApi: NextPage = () => {
  return (
    <div className={styles.container}>
      <main>
        <h1>TEST API</h1>
        <div className={styles.testContainer}>
          <TestLogin />
          <TestRegister />
          <TestVerify />
          <TestSaldoChangesHistory />
          <TestReqSaldoChanges />
          <TestGetAllDraftRequest />
          <TestVerifyDraftRequest />
        </div>
      </main>
    </div>
  );
};

export default TestApi;
