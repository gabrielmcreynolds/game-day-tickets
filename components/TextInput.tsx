import { useField } from "formik";

const TextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="text-xl" htmlFor={props.id || props.name}>
        {label}
      </label>
      <div>
        <input
          className="text-secondary rounded p-2 text-xl border-2 border-secondary"
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-danger mt-2 underline">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export default TextInput;
