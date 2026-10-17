import { GithubLogo } from '@phosphor-icons/react';
import { BrandMark } from './BrandMark';

const FOOTER_LINKS = [
  {
    label: 'Repositório Desktop (Tauri + Rust)',
    href: 'https://github.com/danielharrisonlf/pc-remote-desktop',
  },
  {
    label: 'Repositório Android (Kotlin)',
    href: 'https://github.com/danielharrisonlf/pc-remote-android',
  },
  {
    label: 'Especificação do Protocolo v1',
    href: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/PROTOCOL.md',
  },
  {
    label: 'Auditoria de Segurança',
    href: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/docs/SECURITY-AUDIT.md',
  },
  {
    label: 'Releases & Hashes SHA-256',
    href: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases',
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#F8FAFC]/10 bg-[#0F141C] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* Brand Identity */}
          <div className="flex items-start gap-3.5">
            <BrandMark size={38} withSurface />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold text-[#F8FAFC]">PC Remote</span>
                <span className="font-mono text-xs text-[#00E5FF]">Local-First Controller</span>
              </div>
              <p className="mt-1 max-w-md text-xs leading-relaxed text-[#94A3B8]">
                Controle local de Windows e Linux pelo Android. Sem servidores na nuvem, sem criação de contas e sem
                telemetria.
              </p>
            </div>
          </div>

          {/* Documentation & Repository Links */}
          <nav aria-label="Links de documentação e código-fonte" className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs">
            {FOOTER_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring rounded font-medium text-[#CBD5E1] transition-colors hover:text-[#00E5FF]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#F8FAFC]/8 pt-6 text-xs text-[#94A3B8] sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} PC Remote Project. Código aberto distribuído gratuitamente.</p>
          <a
            href="https://github.com/danielharrisonlf/pc-remote-desktop"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-lg px-2 py-1 text-[#CBD5E1] hover:text-[#F8FAFC]"
          >
            <GithubLogo size={16} weight="fill" aria-hidden="true" />
            <span>Auditável no GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
