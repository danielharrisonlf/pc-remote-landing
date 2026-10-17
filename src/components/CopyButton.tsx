import { useState } from 'react';
import { Check, Copy } from '@phosphor-icons/react';

interface CopyButtonProps {
  value: string;
  label?: string;
  copiedLabel?: string;
  ariaLabel: string;
  className?: string;
}

/**
 * Follows Web Interface Guidelines: inline check feedback right at the trigger,
 * without layout shift or intrusive toast notifications.
 */
export function CopyButton({
  value,
  label = 'Copiar',
  copiedLabel = 'Copiado',
  ariaLabel,
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for restricted clipboard contexts
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel}
      className={`btn-tactile focus-ring inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        copied
          ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
          : 'border-[#F8FAFC]/12 bg-[#0F141C] text-[#CBD5E1] hover:border-[#00E5FF]/40 hover:text-[#F8FAFC]'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check size={14} weight="bold" className="text-emerald-400" aria-hidden="true" />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy size={14} weight="regular" className="text-[#00E5FF]" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
