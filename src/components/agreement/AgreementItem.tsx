'use client';

import { useState } from 'react';
import CheckIcon from './icons/check.svg';
import ChevronDownIcon from './icons/chevron-down.svg';

interface AgreementItemProps {
  label: string;
  checked: boolean;
  onClick: () => void;
  terms?: string;
}

export const AgreementItem = ({
  label,
  checked,
  onClick,
  terms,
}: AgreementItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full items-center justify-between">
        <div
          className="flex flex-1 cursor-pointer items-center gap-8"
          onClick={onClick}
        >
          <CheckIcon
            className={`${checked ? 'text-brand-primary-400' : 'text-basic-grey-300'}`}
          />
          <span className="text-14 font-500 leading-[160%] -tracking-[0.35px] text-basic-grey-600">
            {label.startsWith('[') ? (
              <>
                <span className="text-basic-black">{label.split(']')[0]}]</span>
                {label.split(']')[1]}
              </>
            ) : (
              <span className="font-600 text-basic-black">{label}</span>
            )}
          </span>
        </div>
        {terms && (
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-24 w-24 items-center justify-center"
          >
            <ChevronDownIcon
              className={`text-basic-grey-300 transition-transform ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}
      </div>
      {isOpen && terms && (
        <div className="h-[300px] w-full overflow-y-auto whitespace-pre-wrap rounded-4 bg-basic-grey-100 p-16 text-14 font-500 leading-[160%] -tracking-[0.35px] text-basic-grey-600">
          {terms}
        </div>
      )}
    </div>
  );
};
