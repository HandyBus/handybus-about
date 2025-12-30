'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from '/public/icons/spinner.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'full';
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'default',
  className = '',
  isLoading = false,
  ...props
}: ButtonProps) => {
  const baseClassName =
    'flex items-center justify-center rounded-8 bg-brand-primary-400 px-16 py-12 text-16 font-600 leading-[160%] -tracking-[0.4px] text-basic-white active:bg-brand-primary-500 disabled:bg-basic-grey-200 disabled:text-basic-grey-400';

  const variantClassName = variant === 'full' ? 'w-full' : 'w-fit';

  return (
    <button
      className={`${baseClassName} ${variantClassName} ${className}`}
      {...props}
    >
      {children}
      {isLoading && <Spinner className="ml-[8px] animate-spin" />}
    </button>
  );
};
