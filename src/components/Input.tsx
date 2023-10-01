type InputProps = {
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
  type?: string;
};

const Input = ({ id, onChange, label, type, value }: InputProps) => {
  return (
    <div className="relative ">
      <input
        className="block rounden-md px-6 pt-6  pb-1 w-full text-md text-white bg-neutral-700 apperance-none focus:outline-none focus:ring-0 peer"
        placeholder=""
        id={id}
        type={type}
        onChange={onChange}
        value={value}
      />
      <label
        htmlFor={id}
        className="absolute text-md text-zinc-400 duration-150 transfrom -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
      >
        {label}
      </label>
    </div>
  );
};
export default Input;