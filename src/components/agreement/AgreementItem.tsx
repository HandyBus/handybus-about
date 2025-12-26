import CheckIcon from './icons/check.svg';

interface AgreementItemProps {
  label: string;
  checked: boolean;
  onClick: () => void;
}

export const AgreementItem = ({
  label,
  checked,
  onClick,
}: AgreementItemProps) => (
  <div className="flex cursor-pointer items-center gap-8" onClick={onClick}>
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
        <span className="text-basic-black font-600">{label}</span>
      )}
    </span>
  </div>
);
