"use client";

import React, { MouseEventHandler } from "react";

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  text: string;
  classes?: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, text, classes = "" }) => {
  return (
    <button
      className={`bg-primary-blue px-4 py-2 rounded text-primary-white ${classes}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
