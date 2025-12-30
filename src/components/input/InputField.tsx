import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  'onChange'
> {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  variant?: 'default' | 'bordered' | 'textarea';
  className?: string;
}

export const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  variant = 'default',
  className = '',
  ...props
}: InputFieldProps) => {
  const baseClassName = `w-full bg-transparent px-12 py-12 text-16 font-500 leading-[160%] -tracking-[0.4px] text-basic-black placeholder:text-basic-grey-400 focus:outline-none ${
    variant === 'bordered' || variant === 'textarea'
      ? 'rounded-12 border border-basic-grey-200'
      : 'rounded-none border-b'
  } ${
    error
      ? 'border-basic-red-400'
      : 'border-basic-grey-200 focus:border-brand-primary-400'
  }`;

  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      {label && (
        <label className="text-14 font-600 leading-[140%] -tracking-[0.35px] text-basic-black">
          {label}
        </label>
      )}
      {variant === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={5}
          className={`${baseClassName} resize-none`}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseClassName}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="text-12 font-500 text-basic-red-400">{error}</p>}
    </div>
  );
};
