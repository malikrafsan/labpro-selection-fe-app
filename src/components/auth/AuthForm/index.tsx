import styles from './index.module.css';
import { IAuthFormProps } from '../../../interfaces';
import { UploadImg } from '../../';

const EXCLUDED_TYPE = ['file'];

const AuthForm = (props: IAuthFormProps) => {
  const { title, fields, onSubmit } = props;

  const wrapperSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="w-100">
      <h1 className={styles.title}>{title}</h1>
      <div
        className={
          styles.fieldsContainer +
          ' d-flex justify-content-between flex-column flex-md-row'
        }
      >
        <div>
          {Object.keys(fields).map((key) => {
            const field = fields[key];

            if (EXCLUDED_TYPE.includes(field.type)) {
              return null;
            }

            return (
              <div
                key={key}
                className={styles.inputContainer + ' my-3'}
              >
                <input
                  type={field.type}
                  id={key}
                  value={field.value}
                  onChange={field.onChange}
                  accept={field.accept}
                  placeholder={field.label}
                />
              </div>
            );
          })}
        </div>
        <div>
          {Object.keys(fields).map((key) => {
            const field = fields[key];

            if (!EXCLUDED_TYPE.includes(field.type)) {
              return null;
            }

            switch (field.type) {
              case 'file':
                return (
                  <UploadImg
                    key={key}
                    title="Upload your KTP"
                    file={field.file}
                    onChange={field.onChange}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
      <div className={styles.btnContainer}>
        <button
          onClick={wrapperSubmit}
          className={styles.btnSubmit + ' mt-3 btn'}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
