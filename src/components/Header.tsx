import { useState } from 'react';
import { DownloadSimple, GithubLogo, List, X } from '@phosphor-icons/react';
import { BrandMark } from './BrandMark';

const NAV_LINKS = [
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#recursos', label: 'Recursos' },
  { href: '#comparativo', label: 'Comparativo' },
  { href: '#seguranca', label: 'Segurança' },
  { href: '#faq', label: 'FAQ' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="glass-nav fixed inset-x-0 top-0 z-50 h-16">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a
          href="#"
          className="focus-ring flex items-center gap-3 rounded-xl py-1 pr-2 text-[#F8FAFC] transition-opacity hover:opacity-90"
          aria-label="PC Remote Início"
        >
          <BrandMark size={34} withSurface />
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold tracking-tight text-[#F8FAFC]">PC Remote</span>
            <span className="tabular-nums hidden rounded-md border border-[#00E5FF]/25 bg-[#00E5FF]/10 px-1.5 py-0.5 font-mono text-[11px] font-medium text-[#00E5FF] sm:inline-block">
              v0.6.4
            </span>
          </div>
        </a>

        {/* Desktop Anchor Navigation */}
        <nav aria-label="Navegação principal" className="hidden md:flex md:items-center md:gap-1 lg:gap-2">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-[#CBD5E1] transition-colors hover:bg-[#F8FAFC]/5 hover:text-[#F8FAFC]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions: GitHub + Primary Top CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="https://github.com/danielharrisonlf/pc-remote-desktop"
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-[#F8FAFC]/10 bg-[#131A24]/90 px-3 py-2 text-xs font-medium text-[#CBD5E1] transition-colors hover:border-[#F8FAFC]/25 hover:text-[#F8FAFC]"
            aria-label="Repositório GitHub do PC Remote (Código Aberto)"
          >
            <GithubLogo size={16} weight="fill" className="text-[#F8FAFC]" aria-hidden="true" />
            <span>GitHub</span>
            <span className="tabular-nums rounded bg-[#F8FAFC]/10 px-1.5 py-0.5 font-mono text-[11px] text-[#00E5FF]">
              Open Source
            </span>
          </a>

          <a
            href="#downloads"
            className="btn-tactile focus-ring inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#00E5FF] px-4 py-2 text-sm font-semibold text-[#071018] shadow-[0_0_24px_rgba(0,229,255,0.22)] hover:bg-[#33ECFF]"
          >
            <DownloadSimple size={16} weight="bold" aria-hidden="true" />
            <span>Baixar Grátis</span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="#downloads"
            className="btn-tactile focus-ring inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl bg-[#00E5FF] px-3 py-1.5 text-xs font-semibold text-[#071018]"
          >
            <DownloadSimple size={14} weight="bold" aria-hidden="true" />
            <span>Baixar Grátis</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#F8FAFC]/12 bg-[#131A24] text-[#F8FAFC]"
          >
            {mobileMenuOpen ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Menu móvel"
          className="border-b border-[#F8FAFC]/10 bg-[#0F141C]/98 px-4 pt-2 pb-5 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="focus-ring block rounded-xl px-3 py-2.5 text-sm font-medium text-[#CBD5E1] hover:bg-[#131A24] hover:text-[#F8FAFC]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-[#F8FAFC]/10 pt-4">
            <a
              href="https://github.com/danielharrisonlf/pc-remote-desktop"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center justify-center gap-2 rounded-xl border border-[#F8FAFC]/12 bg-[#131A24] px-4 py-2.5 text-xs font-medium text-[#CBD5E1]"
            >
              <GithubLogo size={16} weight="fill" aria-hidden="true" />
              <span>Ver Código Fonte no GitHub (v0.6.4)</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
