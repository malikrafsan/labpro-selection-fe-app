import { createContext, useState, useEffect } from 'react';
import { AlertDismissible } from '../../components';
import { ToastContainer } from 'react-bootstrap';
import { BootstrapVariant } from '../../enums';
import { apiSrv } from '../../services';

const NotifContext = createContext(
  (_: {
    header: string;
    content: string[];
    variant?: BootstrapVariant;
  }) => {},
);

let counter = 0;

const NotifContextProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [notifs, setNotifs] = useState<
    {
      header: string;
      content: string[];
      variant: string;
      id: number;
    }[]
  >([]);

  const pushNotif = ({
    header,
    content,
    variant,
  }: {
    header: string;
    content: string[];
    variant?: BootstrapVariant;
  }) => {
    console.log('push notif', {
      header,
      content,
      variant,
    });
    setNotifs([
      ...notifs,
      {
        header,
        content,
        variant: variant ? variant : 'danger',
        id: counter++,
      },
    ]);
    console.log('notifs', notifs);
  };

  useEffect(() => {
    apiSrv.setDefaultOnError(
      ({ header, content }: { header: string; content: string }) => {
        pushNotif({
          header,
          content: [content],
          variant: BootstrapVariant.DANGER,
        });
      },
    );
  }, []);

  return (
    <NotifContext.Provider value={pushNotif}>
      <ToastContainer position="top-end">
        {notifs
          .map((notif) => {
            const { header, content, variant, id } = notif;
            return (
              <AlertDismissible
                key={id}
                header={header}
                content={content}
                show={true}
                setClose={() => {
                  setNotifs(notifs.filter((n) => n.id !== id));
                }}
                variant={variant}
              />
            );
          })
          .reverse()}
      </ToastContainer>
      {children}
    </NotifContext.Provider>
  );
};

export { NotifContext, NotifContextProvider };
