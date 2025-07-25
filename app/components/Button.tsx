interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  submit?: boolean;
}

const Button = ({ label, onClick, disabled = false, outline, small, submit }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={submit ? 'submit' : undefined}
      className={`
        relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'bg-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}>
      {label}
    </button>
  );
};

export default Button;
