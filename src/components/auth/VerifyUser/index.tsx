import { useState } from 'react';
import { apiSrv } from '../../../services';

const VerifyUser = () => {
  const [username, setUsername] = useState('');
  const [verify, setVerify] = useState(false);

  const handleSubmit = async () => {
    const data = await apiSrv.post({
      url: 'verify',
      params: {
        username,
        verified: verify,
      },
    });
    console.log(data);
    setVerify(true);
  };

  return (
    <div>
      <h1>Verify User</h1>
      <div>
        <label htmlFor="username">username</label>
        <div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label htmlFor="verify">verify</label>
        <div>
          <input
            type="radio"
            name="verify"
            checked={verify}
            onChange={(e) => setVerify(e.target.checked)}
          />
        </div>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default VerifyUser;
