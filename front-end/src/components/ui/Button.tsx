import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
}) => {
  // Base classes for consistent look and feel
  const baseClass = 'btn';
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const combinedClasses = `${baseClass} ${variantClass} ${className}`.trim();

  // If href is provided, render an anchor link (as requested by the user)
  if (href) {
    return (
      <a href={href} className={combinedClasses} onClick={onClick}>
        {children}
      </a>
    );
  }

  // Otherwise, render a standard HTML button
  return (
    <button type="button" className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};
