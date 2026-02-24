import { useState } from "react";

type Props = {
  name: string;
};

export default function OpinionInput(props: Props) {
  const [text, setText] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <li className={text.trim().length === 0 ? "print:hidden" : ""}>
      <button
        type="button"
        className="border-1 mb-0.5 px-1 cursor-pointer bg-red-200 hover:bg-red-400 hover:font-bold print:hidden"
        onClick={(event) => {
          setText("");
          (event.target as HTMLElement).parentElement?.remove();
        }}
      >
        Xoá ý kiến này
      </button>
      <textarea
        className="w-full h-50 border-1 p-1 print:hidden"
        name={props.name}
        value={text}
        onChange={handleChange}
        placeholder="Điền ý kiến vào ô này"
      ></textarea>
      <p className="hidden print:block whitespace-pre-line">{text}</p>
    </li>
  );
}
