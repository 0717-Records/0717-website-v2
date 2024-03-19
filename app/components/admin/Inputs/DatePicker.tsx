import React, { ReactNode, Ref, forwardRef, useEffect, useState } from 'react';
import DatePickerComponent from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsCalendarFill } from 'react-icons/bs';

interface DatePickerProps {
  disabled?: boolean;
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  isDateValid?: (date: Date) => boolean;
  onInvalidDate?: () => void;
}

interface CustomInputProps {
  value?: ReactNode;
  onClick?: () => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  disabled = false,
  label,
  value,
  onChange,
  isDateValid = () => true,
  onInvalidDate = () => {},
}) => {
  const [startDate, setStartDate] = useState(value);
  const CustomInput = forwardRef(
    ({ value, onClick }: CustomInputProps, ref: Ref<HTMLButtonElement>) => (
      <button
        className='border border-gray-300 rounded-md w-52 pl-4 py-2 pr-10 text-left min-h-11'
        onClick={(e) => {
          e.preventDefault();
          if (onClick) onClick();
        }}
        ref={ref}>
        {value}
      </button>
    )
  );

  useEffect(() => {
    setStartDate(value);
  }, [value]);

  return (
    <div>
      {label && <span className='text-md text-zinc-400 w-28'>{label}</span>}
      <div className={`relative mt-2 w-52 ${disabled ? 'pointer-events-none text-gray-400' : ''}`}>
        <DatePickerComponent
          className=''
          selected={startDate}
          onChange={(date: Date) => {
            if (isDateValid(date)) {
              setStartDate(date);
              onChange(date);
            } else {
              onInvalidDate();
            }
          }}
          dateFormat='dd MMMM yyyy'
          customInput={<CustomInput />}
        />
        <div className='absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none'>
          <BsCalendarFill className='h-6 w-6 text-gray-400' />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
