import React from "react";

const RetroButton = ({
  children,
  className = "",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <button
      className={`
        relative
        select-none
        cursor-pointer
        font-sans
        text-base
        tracking-wider
        text-black
        px-2
        py-1
        md:px-3
        shadow-[1px_1px_0px_0px,2px_2px_0px_0px,3px_3px_0px_0px,4px_4px_0px_0px,5px_5px_0px_0px]
        active:shadow-none
        active:translate-x-1
        active:translate-y-1
        touch-manipulation
        border-solid
        border-2
        border-black        
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default RetroButton;
