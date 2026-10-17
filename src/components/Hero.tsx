import {
  AndroidLogo,
  Cpu,
  HardDrive,
  LinuxLogo,
  ShieldCheck,
  WifiHigh,
  WindowsLogo,
} from '@phosphor-icons/react';
import { RELEASE_ASSETS } from '../data/releaseData';
import { DeviceSyncPreview } from './DeviceSyncPreview';

const ENGINEERING_METRICS = [
  {
    icon: Cpu,
    metric: '~25-40 MB RAM',
    label: 'Motor Nativo Tauri v2 + Rust',
    detail: 'Zero peso de Electron ou máquinas virtuais em segundo plano.',
  },
  {
    icon: WifiHigh,
    metric: '100% LAN Local',
    label: 'Porta TCP 43127 Direta',
    detail: 'Funciona mesmo sem internet. Zero roteamento por servidores na nuvem.',
  },
  {
    icon: ShieldCheck,
    metric: '8 Dígitos + SAS',
    label: 'Verificação Visual por Cores',
    detail: 'Chaves TLS protegidas por Windows DPAPI e validação humana anti-MITM.',
  },
  {
    icon: HardDrive,
    metric: 'Até 1 GB / Arquivo',
    label: 'Blocos de 64 KiB + SHA-256',
    detail: 'Envio bidirecional com memória constante e proteção SmartScreen.',
  },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-tech-grid relative flex min-h-[100dvh] flex-col justify-between overflow-hidden pt-20 pb-12 lg:pt-24 lg:pb-16"
    >
      {/* Main Hero Split Grid */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: High-Conversion Copy & Direct CTAs (6 cols) */}
          <div className="lg:col-span-6">
            {/* Top Badge (Eyebrow #1 of max 3 on page) */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-3.5 py-1.5 text-xs font-medium text-[#00E5FF]">
              <span className="h-2 w-2 rounded-full bg-[#00E5FF]" aria-hidden="true" />
              <span className="tabular-nums">v0.6.4 disponível • 100% Local • Código Aberto</span>
            </div>

            {/* Main H1 Headline */}
            <h1
              id="hero-heading"
              className="mt-5 text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-[42px] lg:leading-[1.12]"
            >
              Controle seu computador pelo celular.{' '}
              <span className="text-[#00E5FF]">Sem nuvem. Sem contas. Sem mensalidades.</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-[#CBD5E1] sm:text-lg">
              Transforme seu Android no melhor touchpad, teclado e controle de mídia para Windows e Linux pela sua
              rede Wi-Fi local. Criptografia ponta a ponta, zero latência externa e privacidade absoluta.
            </p>

            {/* Primary & Secondary Conversion CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={RELEASE_ASSETS.windows.downloadUrl}
                className="btn-tactile focus-ring inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-[#00E5FF] px-5 py-3.5 text-sm font-bold text-[#071018] shadow-[0_0_30px_rgba(0,229,255,0.28)] hover:bg-[#33ECFF]"
              >
                <WindowsLogo size={20} weight="fill" aria-hidden="true" />
                <span>Baixar para Windows (.exe)</span>
                <span className="tabular-nums rounded-md bg-[#071018]/15 px-1.5 py-0.5 font-mono text-xs font-semibold text-[#071018]">
                  x64 • v0.6.4
                </span>
              </a>

              <a
                href={RELEASE_ASSETS.android.downloadUrl}
                className="btn-tactile focus-ring inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-[#F8FAFC]/16 bg-[#131A24] px-5 py-3.5 text-sm font-semibold text-[#F8FAFC] hover:border-[#00E5FF]/50 hover:bg-[#18212F]"
              >
                <AndroidLogo size={20} weight="fill" className="text-[#00E5FF]" aria-hidden="true" />
                <span>Baixar APK para Android</span>
              </a>
            </div>

            {/* Support Conversion Microcopy + Linux Anchor */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#94A3B8]">
              <span>Sem cadastro • Instalação em 30 segundos • 100% Gratuito</span>
              <a
                href="#downloads"
                className="focus-ring inline-flex items-center gap-1 text-[#00E5FF] underline-offset-4 hover:underline"
              >
                <LinuxLogo size={14} weight="bold" aria-hidden="true" />
                <span>Disponível também para Linux (Ubuntu .deb)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Device Synchronization Mockup (6 cols) */}
          <div className="lg:col-span-6">
            <DeviceSyncPreview />
          </div>
        </div>
      </div>

      {/* Engineering Metrics Strip (#diferenciais) */}
      <div id="diferenciais" className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:mt-14 lg:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-[#F8FAFC]/10 bg-[#131A24]/75 p-5 sm:grid-cols-2 lg:grid-cols-4">
          {ENGINEERING_METRICS.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#00E5FF]/25 bg-[#00E5FF]/10 text-[#00E5FF]">
                  <Icon size={20} weight="duotone" aria-hidden="true" />
                </div>
                <div>
                  <div className="tabular-nums font-mono text-sm font-bold text-[#F8FAFC]">{item.metric}</div>
                  <div className="text-xs font-semibold text-[#00E5FF]">{item.label}</div>
                  <p className="mt-1 text-xs leading-relaxed text-[#94A3B8]">{item.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
