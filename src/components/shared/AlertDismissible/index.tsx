import { Toast } from 'react-bootstrap';
import styles from './index.module.css';
import { useEffect } from 'react';

const ALERT_TIME = 5000;

const AlertDismissible = ({
  header,
  content,
  show,
  setClose,
  variant,
}: {
  header: string;
  content: string[];
  show: boolean;
  setClose: () => void;
  variant: string;
}) => {
  return (
    <Toast
      show={show}
      onClose={setClose}
      className={styles.container}
      bg={variant}
      delay={ALERT_TIME}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">
          {header}
        </strong>
      </Toast.Header>
      <Toast.Body>
        {content.map((p, idx) => {
          return (
            <p className="m-0" key={idx}>
              {p}
            </p>
          );
        })}
      </Toast.Body>
    </Toast>
  );
};

export default AlertDismissible;
