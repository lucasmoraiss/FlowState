import React from 'react';
import { Button } from '../../../shared/components/Button';
import './AuthForm.styles.css';

export type AuthFormProps = {
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  submitText: string;
  isSubmitting?: boolean;
  isValid?: boolean;
  className?: string;
};

export const AuthForm = ({
  onSubmit,
  title,
  subtitle,
  children,
  submitText,
  isSubmitting = false,
  isValid = true,
  className = ''
}: AuthFormProps) => {
  return (
    <form onSubmit={onSubmit} className={`auth-form ${className}`}>
      <div className="auth-form__header">
        <h2 className="auth-form__title">{title}</h2>
        {subtitle && <p className="auth-form__subtitle">{subtitle}</p>}
      </div>

      <div className="auth-form__content">
        {children}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={isSubmitting || !isValid}
        isLoading={isSubmitting}
        className="auth-form__submit"
      >
        {submitText}
      </Button>
    </form>
  );
};