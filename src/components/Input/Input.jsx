import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const Input = ({
  id,
  edit,
  type,
  name,
  label,
  value,
  profile,
  onChange,
  disabled,
  className,
  isSelected,
  onEditClick,
  placeholder,
  autoComplete,
  setEditingField,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef();
  const eyeIconRef = useRef(null);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isSelected) {
      inputRef.current.focus();
      if (type === "date" || type === "datetime-local") {
        inputRef.current.showPicker();
      }
    }
  }, [isSelected]);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      <div
        className={`relative flex items-center rounded-lg border border-gray text-text ${
          disabled ? "bg-slate-100" : "bg-white"
        }`}>
        <label
          htmlFor={id}
          className="absolute px-1 mb-2 text-base font-medium bg-white rounded-md -top-3 left-3 text-text">
          {label}
        </label>
        <input
          ref={inputRef}
          className="w-full px-3 py-4 bg-transparent outline-none"
          id={id}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          disabled={disabled}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          autoComplete={autoComplete}
          onBlur={(e) => {
            if (setEditingField && e.relatedTarget !== eyeIconRef.current) {
              setEditingField(null);
            }
          }}
        />
        {disabled && profile && edit && (
          <span
            className="absolute text-xl cursor-pointer right-3 text-primary"
            onClick={onEditClick}>
            <MdEdit className="text-xl text-black" />
          </span>
        )}
        {type === "password" && !disabled && (
          <span
            ref={eyeIconRef}
            className="absolute cursor-pointer right-3 eye-icon"
            onMouseDown={(e) => e.preventDefault()}
            onClick={showPasswordHandler}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
