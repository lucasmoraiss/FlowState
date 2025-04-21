import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export function Card({ children }: CardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      {children}
    </div>
  );
}