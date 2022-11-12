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
          className="min-w-full text-primary rounded p-2 text-xl bg-gradient-to-r from-blue-100 to-blue-400"
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-red-500 border-red-500 border-dashed border py-1 px-2 max-w-min whitespace-nowrap rounded mt-2">
            {meta.error}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TextInput;
