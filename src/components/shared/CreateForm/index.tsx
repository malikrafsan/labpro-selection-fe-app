import Dropdown from 'react-bootstrap/Dropdown';

import styles from './index.module.css';
import { ICreateFormProps } from '../../../interfaces';

const CreateForm = (props: ICreateFormProps) => {
  const { title, fields, onSubmit } = props;

  const wrapperSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={styles.container + ' p-4'}>
      <h1 className={styles.title + ' text-center'}>{title}</h1>
      <div className={styles.fieldsContainer}>
        {Object.keys(fields).map((key) => {
          const field = fields[key];

          switch (field.type) {
            case 'dropdown':
              const options = field.options ? field.options : [];

              return (
                <div className={styles.inputContainer} key={key}>
                  <div className={styles.inputLabel}>
                    {field.label}
                  </div>
                  <Dropdown id={key + '-dropdown'}>
                    <Dropdown.Toggle variant="primary">
                      {field.value ? field.value : field.label}
                    </Dropdown.Toggle>

                    <Dropdown.Menu className={styles.dropdown}>
                      {options.map((option) => {
                        return (
                          <Dropdown.Item
                            key={option.value}
                            onClick={() =>
                              field.onChange(option.value)
                            }
                          >
                            {option.label}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              );
            default:
              return (
                <div key={key}>
                  <div className={styles.inputLabel}>
                    {field.label}
                  </div>
                  <div className={styles.inputContainer}>
                    <input
                      type={field.type}
                      id={key}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder={field.label}
                    />
                  </div>
                </div>
              );
          }
        })}
      </div>
      <div
        className={
          styles.submitContainer + ' mt-3 d-flex justify-content-end'
        }
      >
        <button
          className={styles.submit + ' p-2'}
          onClick={wrapperSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
