interface ButtonProps {
  onClick?: (value: any) => void;
  // onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  submit?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const buttonStyles = ({
  outline = false,
  small = false,
  disabled = false,
  className = '',
}: Partial<{
  outline?: boolean;
  small?: boolean;
  disabled?: boolean;
  className?: string;
}> = {}) => `
relative 
disabled:opacity-50 
disabled:cursor-not-allowed 
rounded-lg 
hover:opacity-90   
transition 
px-4 
border-[1px] 
${!disabled && 'active:scale-95'} 
${outline ? 'bg-white' : 'bg-blue-500'}
${outline && !disabled && 'hover:bg-gray-100'}
${outline ? 'border-black' : 'border-blue-500'}
${outline ? 'text-black' : 'text-white'}
${small ? 'py-1' : 'py-3'}
${small ? 'text-sm' : 'text-md'}
${small ? 'font-light' : 'font-semibold'} 
${className}
`;

const Button = ({
  children,
  onClick = () => {},
  disabled = false,
  outline,
  small,
  submit,
  className = '',
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={submit ? 'submit' : undefined}
      className={buttonStyles({ outline, small, disabled, className })}>
      {children}
    </button>
  );
};

export default Button;
