export interface AuthFormProps {
  fields: {
    [key: string]: {
      label: string;
      type: string;
      value?: string;
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
      accept?: string;
    };
  };
  onSubmit: () => void;
}

const AuthForm = (props: AuthFormProps) => {
  const { fields, onSubmit } = props;

  const wrapperSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form>
      {Object.keys(fields).map((key) => {
        const field = fields[key];
        return (
          <div key={key}>
            <label htmlFor={key}>{field.label}</label>
            <input
              type={field.type}
              id={key}
              value={field.value}
              onChange={field.onChange}
              accept={field.accept}
            />
          </div>
        );
      })}
      <button onClick={wrapperSubmit}>Submit</button>
    </form>
  );
};

export default AuthForm;
