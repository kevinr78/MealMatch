import React from "react";
import { cn } from "@/lib/utils";
type InputProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  inputclassname?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: InputProps) {
  return (
    <div className="flex flex-col gap-1 flex-1 ">
      <label htmlFor="restaurant_name" className="label text-sm">
        {props.label}
      </label>
      <input
        type={props.type}
        name={props.name}
        className={cn(
          "input w-full input-bordered bg-base-200 text-base-content vaildator placeholder:text-base-content/50 focus:outline-none focus:ring-2 focus:ring-orange-400  focus:border-transparent",
          props.inputclassname
        )}
        {...props}
        required
      />
      <p className="validator-hint ">{props.hint}</p>
    </div>
  );
}
