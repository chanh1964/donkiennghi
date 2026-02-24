type Props = {
  value: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  className?: string;
  placeholder?: string;
};

export default function FieldInput(props: Props) {
  return (
    <input
      required={props.required}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      className={
        "bg-gray-200 border-b-1 border-dotted print:bg-white " + props.className
      }
      placeholder={props.placeholder}
    />
  );
}
