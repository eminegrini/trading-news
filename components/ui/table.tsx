import { ReactNode } from "react";
export function Table({ children }: { children: ReactNode }) {
  return <table className="min-w-full text-sm">{children}</table>;
}
export function THead({ children }: { children: ReactNode }) {
  return (
    <thead className="text-gray-600 dark:text-neutral-400">{children}</thead>
  );
}
export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y dark:divide-neutral-800">{children}</tbody>;
}
export function TR({ children }: { children: ReactNode }) {
  return (
    <tr className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/50">
      {children}
    </tr>
  );
}
export function TH({ children }: { children: ReactNode }) {
  return <th className="py-2 pr-4 text-left font-medium">{children}</th>;
}
export function TD({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`py-2 pr-4 ${className}`}>{children}</td>;
}
