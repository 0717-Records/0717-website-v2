interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  submit?: boolean;
  children: React.ReactNode;
}

const Button = ({
  children,
  onClick = () => {},
  disabled = false,
  outline,
  small,
  submit,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={submit ? 'submit' : undefined}
      className={`
        relative 
        disabled:opacity-50 
        disabled:cursor-not-allowed 
        rounded-lg 
        hover:opacity-90   
        transition 
        px-4 
        active:scale-95 
        ${outline ? 'bg-white' : 'bg-blue-500'}
        ${outline ? 'hover:bg-gray-100' : ''}
        ${outline ? 'border-black' : 'border-blue-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${outline ? 'border-[1px]' : ''}
      `}>
      {children}
    </button>
  );
};

export default Button;
