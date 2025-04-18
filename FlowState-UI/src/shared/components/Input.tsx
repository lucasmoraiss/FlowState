import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

type InputSize = 'sm' | 'md' | 'lg';
type InputVariant = 'default' | 'outline' | 'ghost';

type InputProps = {
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  error?: string;
  size?: InputSize;
  variant?: InputVariant;
  disabled?: boolean;
  showPasswordToggle?: boolean;
};

const sizeClasses: Record<InputSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-5 py-3 text-lg'
};

const variantClasses: Record<InputVariant, string> = {
  default: 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:border-indigo-500',
  outline: 'bg-transparent border-indigo-300 dark:border-gray-600 focus:border-indigo-500',
  ghost: 'bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-700'
};

export const Input = ({
  name,
  type = 'text',
  value,
  onChange,
  label,
  placeholder,
  required = false,
  className = '',
  error,
  size = 'md',
  variant = 'default',
  disabled = false,
  showPasswordToggle = false
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle 
    ? showPassword 
      ? 'text' 
      : 'password'
    : type;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-white">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`
            block w-full rounded-lg border
            focus:ring-2 focus:ring-indigo-500 focus:outline-none
            transition-all duration-200
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${error ? 'border-red-500' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${showPasswordToggle ? 'pr-10' : ''}
          `}
        />

        {showPasswordToggle && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};