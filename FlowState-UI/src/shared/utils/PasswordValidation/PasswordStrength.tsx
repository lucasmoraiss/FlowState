interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export const PasswordStrength = ({ password, className }: PasswordStrengthProps) => {
  const rules = [
    { id: 1, text: 'Mínimo 8 caracteres', isValid: password.length >= 8 },
    { id: 2, text: 'Pelo menos 1 maiúscula', isValid: /[A-Z]/.test(password) },
    { id: 3, text: 'Pelo menos 1 número', isValid: /[0-9]/.test(password) },
    { id: 4, text: 'Pelo menos 1 especial', isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password) }
  ];

  return (
    <div className={`space-y-1 mt-2 ${className}`}>
      {rules.map((rule) => (
        <div key={rule.id} className="flex items-center">
          <span className={`inline-block w-4 h-4 mr-2 rounded-full ${
            rule.isValid ? 'bg-green-500' : 'bg-gray-300'
          }`} />
          <span className={`text-xs ${
            rule.isValid ? 'text-green-600' : 'text-gray-500'
          }`}>
            {rule.text}
          </span>
        </div>
      ))}
    </div>
  );
};