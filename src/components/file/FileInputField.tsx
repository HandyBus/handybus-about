import { ChangeEvent } from 'react';

interface FileInputFieldProps {
  label: string;
  file: File | null;
  onFileSelect: (file: File | null) => void;
  placeholder?: string;
  error?: string;
  accept?: string;
}

export const FileInputField = ({
  label,
  file,
  onFileSelect,
  placeholder,
  error,
  accept,
}: FileInputFieldProps) => {
  // Hidden file input handling
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <label className="text-14 font-600 leading-[140%] -tracking-[0.35px] text-basic-black">
        {label}
      </label>
      <div
        className={`relative flex w-full items-start rounded-12 border p-12 focus-within:border-brand-primary-400 ${
          error ? 'border-basic-red-400' : 'border-basic-grey-200'
        }`}
      >
        <input
          readOnly
          value={file ? file.name : ''}
          placeholder={placeholder}
          className={`w-full cursor-pointer resize-none bg-transparent text-16 font-500 leading-[160%] -tracking-[0.4px] focus:outline-none ${
            file
              ? 'text-basic-grey-400'
              : 'text-basic-black placeholder:text-basic-grey-400'
          }`}
          onClick={() => document.getElementById(`file-${label}`)?.click()}
        />
        <input
          id={`file-${label}`}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={accept}
        />
      </div>
      {error && <p className="text-12 font-500 text-basic-red-400">{error}</p>}
    </div>
  );
};
