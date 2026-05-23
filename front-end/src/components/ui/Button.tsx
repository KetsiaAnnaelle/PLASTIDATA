import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
}) => {
  // Base classes for consistent look and feel
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const combinedClasses = `${baseClass} ${variantClass} ${className}`.trim();

  // If href is provided, handle external/anchor vs client-side Link
  if (href) {
    const isClientSide = href.startsWith('/');
    if (isClientSide) {
      return (
        <Link to={href} className={combinedClasses} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={combinedClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  // Otherwise, render a standard HTML button
  return (
    <button type={type} className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};
