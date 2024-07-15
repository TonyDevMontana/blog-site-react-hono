import { ChangeEvent } from "react";

export function LabelledInput({
  placeholder,
  onChange,
  label,
  type,
}: {
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type: string;
}) {
  return (
    <div className="mb-4">
      <div className="my-2">{label}</div>
      <div>
        <input
          className="border p-2 rounded-lg w-full"
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
