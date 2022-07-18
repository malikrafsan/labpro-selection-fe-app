import { useState } from 'react';
import { NotifContext } from '../contexts';
import { useContext } from 'react';
import { BootstrapVariant } from '../enums';
import { apiSrv } from '../services';
import { IExampleAPI } from '../interfaces';

const TestPage = () => {
  const pushNotif = useContext(NotifContext);
  const [data, setData] = useState<IExampleAPI>();
  const [header, setHeader] = useState<string>('');
  const [content, setContent] = useState<string[]>([]);
  const [variant, setVariant] = useState<BootstrapVariant>();

  return (
    <div>
      <div>
        <h1>halo</h1>
        <button
          onClick={async (e) => {
            e.preventDefault();
            const data: IExampleAPI = await apiSrv.get({
              url: '/api/example',
            });
            if (data) {
              setData(data);
            }
            pushNotif({
              header: 'Successfully fetch data',
              content: [
                'ini hasil datanya yaa gan',
                JSON.stringify(data),
              ],
              variant: BootstrapVariant.SUCCESS,
            });
          }}
        >
          try API Success
        </button>
        <button
          onClick={async (e) => {
            e.preventDefault();
            await apiSrv.get({
              url: '/failed',
            });
          }}
        >
          try API Failed
        </button>
      </div>
      <div>
        <h1>data</h1>
        {data && (
          <div>
            <div>
              <div>{data.name}</div>
              <div>{data.email}</div>
              <div>{data.password}</div>
            </div>
            <div>
              <button onClick={() => setData(undefined)}>
                clear
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        <div>notif</div>
        <form>
          <div>
            <label htmlFor="header">header</label>
            <div>
              <input
                type="text"
                id="header"
                value={header}
                onChange={(e) => setHeader(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="content">content</label>
            <div>
              <div>
                {content.map((_, i) => {
                  return (
                    <div key={i}>
                      <input
                        type="text"
                        value={content[i]}
                        onChange={(e) => {
                          const newContent = [...content];
                          newContent[i] = e.target.value;
                          setContent(newContent);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div>
                {Object.keys(BootstrapVariant).map((key, idx) => {
                  return (
                    <div key={idx}>
                      <input
                        type="radio"
                        name="variant"
                        value={key}
                        checked={
                          variant ===
                          BootstrapVariant[
                            key as keyof typeof BootstrapVariant
                          ]
                        }
                        onChange={(e) => {
                          setVariant(
                            BootstrapVariant[
                              key as keyof typeof BootstrapVariant
                            ],
                          );
                        }}
                      />
                      {key}
                    </div>
                  );
                })}
              </div>
              <div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setContent([...content, '']);
                  }}
                >
                  Add new content
                </button>
              </div>
            </div>
          </div>
        </form>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              if (header && content.length > 0) {
                pushNotif({
                  header,
                  content,
                  variant,
                });
                setHeader('');
                setContent([]);
              } else {
                pushNotif({
                  header: 'argument not enough',
                  content: ['Please fill all form'],
                  variant: BootstrapVariant.DANGER,
                });
              }
            }}
          >
            push notif
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
