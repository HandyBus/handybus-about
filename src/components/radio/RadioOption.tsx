interface RadioOptionProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const RadioOption = ({ label, selected, onClick }: RadioOptionProps) => {
  return (
    <div
      className="flex cursor-pointer items-center gap-[6px]"
      onClick={onClick}
    >
      <input
        type="radio"
        checked={selected}
        readOnly
        className="h-[18px] w-[18px] accent-basic-black cursor-pointer"
      />
      <span className="text-16 font-600 leading-[160%] text-basic-black">
        {label}
      </span>
    </div>
  );
};
