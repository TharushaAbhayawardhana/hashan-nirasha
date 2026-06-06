import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-inter font-medium tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer select-none';

  const sizes = {
    sm: 'px-6 py-2 text-xs',
    md: 'px-8 py-3 text-xs',
    lg: 'px-12 py-4 text-sm',
  };

  const variants = {
    primary:
      'bg-[#2F2430] text-white hover:bg-[#C8748A] hover:shadow-[0_8px_30px_rgba(200,116,138,0.4)] active:scale-95',
    secondary:
      'border border-[#E9A5B3] text-[#C8748A] hover:bg-[#E9A5B3] hover:text-white active:scale-95',
    ghost:
      'text-[#72646A] hover:text-[#2F2430] underline-offset-4 hover:underline active:scale-95',
  };

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.97 },
  };

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
