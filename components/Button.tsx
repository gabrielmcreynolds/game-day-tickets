const Button = ({ onClick, children, ...props }: any) => {
  return (
    <button
      className="text-white bg-primary rounded px-2 py-2 w-full"
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
