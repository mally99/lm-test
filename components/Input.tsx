import { consts } from '@/assets/consts';
import { InputType } from '@/types/InputType';
import clsx from 'clsx';

export function Input(props: InputType) {
  const { value, onChange = () => {}, color = consts.blue, className, id, placeholder = 'Standard' } = props;
  return (
    <div className="mx-auto h-8 w-64">
      <label className="relative justify-center items-center">
        <div className="">
          <input
            type="text"
            className={clsx(
              `peer placeholder-transparent outline-none absolute border border-1 border-t-0 border-r-0 border-l-0 border-b-slate-500 hover:border-b-slate-800 hover:border-b-2 focus:border-b-2 focus:border-b-${color}-500`
            )}
            id={id}
            color={color}
            placeholder={placeholder}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          />
          <div
            className={clsx(
              'absolute cursor-text top-2 left-0 text-gray-500 text-xs transition-all -translate-y-6 peer-focus:-translate-y-6 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-xs peer-placeholder-shown:text-base peer-focus:text-blue-500'
            )}
          >
            {placeholder}
          </div>
        </div>
      </label>
    </div>
  );
}
