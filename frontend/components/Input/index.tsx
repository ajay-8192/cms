import React, { ChangeEvent } from "react";

type InputProps = {
  type: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  classes?: string;
};

const Input: React.FC<InputProps> = ({
  type,
  onChange,
  classes = "",
  name,
}) => {
  return (
    <input
      type={type || "text"}
      onChange={onChange}
      className={classes}
      name={name}
    />
  );
};

export default Input;
