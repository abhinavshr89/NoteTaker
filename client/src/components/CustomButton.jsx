import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {motion} from "motion/react";
const CustomButton = ({
  isLink = false,
  to = "",
  onClick,
  icon,
  label,
  color = "black", // "black" or "red"
}) => {
  const isRed = color === "red";
  const bgColor = isRed
    ? "bg-red-600 hover:bg-red-700 text-white border-[1px] border-buttonColor"
    : "text-neutral-500 bg-black hover:bg-black shadow-[0px_1px_2px_0px_rgba(255,255,255,0.1)_inset,0px_-1px_2px_0px_rgba(255,255,255,0.1)_inset]";
  const gradientColor = isRed ? "via-white" : "via-cyan-500";

  const button = (
    <Button
      onClick={onClick}
      className={`group relative rounded-lg ${bgColor}`}
    >
      <div className="flex gap-2 items-center justify-center">
        {label} {icon}
      </div>
      <span
        className={`absolute inset-x-0 bottom-px bg-gradient-to-r from-transparent ${gradientColor} to-transparent h-px w-3/4 mx-auto`}
      ></span>
      <span
        className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 inset-x-0 bottom-px bg-gradient-to-r from-transparent ${gradientColor} to-transparent h-[4px] w-full mx-auto blur-sm`}
      ></span>
    </Button>
  );

  return isLink ? <Link to={to}>{button}</Link> : button;
};

export default CustomButton;
