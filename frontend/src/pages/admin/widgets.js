import React from 'react';

// Small set of reusable, theme-consistent admin form controls.

export const Label = ({ children }) => (
  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{children}</label>
);

export const Input = ({ label, ...props }) => (
  <div>
    {label && <Label>{label}</Label>}
    <input
      {...props}
      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
    />
  </div>
);

export const Textarea = ({ label, rows = 3, hint, ...props }) => (
  <div>
    {label && <Label>{label}</Label>}
    <textarea
      rows={rows}
      {...props}
      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors resize-y"
    />
    {hint && <p className="text-xs text-neutral-500 mt-1">{hint}</p>}
  </div>
);

export const Select = ({ label, children, ...props }) => (
  <div>
    {label && <Label>{label}</Label>}
    <select
      {...props}
      className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-100 focus:outline-none focus:border-orange-500 transition-colors"
    >
      {children}
    </select>
  </div>
);

export const Button = ({ variant = 'primary', className = '', ...props }) => {
  const styles = {
    primary: 'bg-orange-600 hover:bg-orange-500 text-white',
    secondary: 'bg-neutral-700 hover:bg-neutral-600 text-neutral-100',
    danger: 'bg-red-600 hover:bg-red-500 text-white',
    ghost: 'bg-transparent hover:bg-neutral-800 text-neutral-300',
  };
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    />
  );
};

export const Modal = ({ title, onClose, children, footer }) => (
  <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:p-8">
    <div className="w-full max-w-3xl rounded-2xl bg-neutral-800 border border-neutral-700 shadow-2xl my-4">
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-700 sticky top-0 bg-neutral-800 rounded-t-2xl">
        <h3 className="text-lg font-semibold text-neutral-100">{title}</h3>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-neutral-100 text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
      {footer && (
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-neutral-700">{footer}</div>
      )}
    </div>
  </div>
);

// Helpers for converting between newline text and string arrays.
export const linesToArray = (text) =>
  (text || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

export const arrayToLines = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');
