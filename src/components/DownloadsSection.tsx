import { useEffect, useState } from 'react';
import { toDataURL } from 'qrcode';
import {
  AndroidLogo,
  ArrowSquareOut,
  CheckCircle,
  DownloadSimple,
  LinuxLogo,
  QrCode,
  WindowsLogo,
} from '@phosphor-icons/react';
import { LINUX_BUILD_COMMAND, RELEASE_ASSETS } from '../data/releaseData';
import { CopyButton } from './CopyButton';

export function DownloadsSection() {
  const [androidQrDataUrl, setAndroidQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    toDataURL(RELEASE_ASSETS.android.downloadUrl, {
      width: 240,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#0F141C',
        light: '#F8FAFC',
      },
    })
      .then(url => {
        if (mounted) setAndroidQrDataUrl(url);
      })
      .catch(() => {
        if (mounted) setAndroidQrDataUrl(null);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const win = RELEASE_ASSETS.windows;
  const android = RELEASE_ASSETS.android;
  const linux = RELEASE_ASSETS.linux;

  return (
    <section id="downloads" aria-labelledby="downloads-heading" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vertical Section Header */}
        <div className="max-w-3xl">
          <h2
            id="downloads-heading"
            className="text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl"
          >
            Baixe agora. Sem cadastro, sem espera e 100% gratuito.
          </h2>
          <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-[#CBD5E1]">
            Instaladores diretos das Releases públicas oficiais no GitHub, acompanhados dos respectivos hashes
            criptográficos <code className="text-[#00E5FF]">SHA-256</code> para verificação de integridade.
          </p>
        </div>

        {/* Primary Download Cards: Windows (.exe) & Android (.apk + QR Code) */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* WINDOWS CARD (6 cols) */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#00E5FF]/35 bg-gradient-to-b from-[#16202E] to-[#131A24] p-6 sm:p-8 lg:col-span-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-xl border border-[#00E5FF]/30 bg-[#00E5FF]/15 px-3 py-1.5 text-xs font-bold text-[#00E5FF]">
                  <WindowsLogo size={18} weight="fill" aria-hidden="true" />
                  <span>{win.badge}</span>
                </div>
                <span className="tabular-nums rounded-lg border border-[#F8FAFC]/12 bg-[#0F141C] px-2.5 py-1 font-mono text-xs font-semibold text-[#F8FAFC]">
                  {win.version} • {win.sizeLabel}
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-bold text-[#F8FAFC]">{win.title}</h3>
              <p className="mt-1.5 text-xs font-medium text-[#94A3B8]">{win.requirements}</p>

              <ul className="mt-5 space-y-2.5 text-sm text-[#CBD5E1]">
                {win.highlights.map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle
                      size={18}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-[#00E5FF]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 space-y-4">
              {/* Primary Download CTA */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={win.downloadUrl}
                  className="btn-tactile focus-ring inline-flex flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-xl bg-[#00E5FF] px-5 py-3.5 text-sm font-bold text-[#071018] shadow-[0_0_28px_rgba(0,229,255,0.25)] hover:bg-[#33ECFF]"
                >
                  <DownloadSimple size={18} weight="bold" aria-hidden="true" />
                  <span>Baixar Instalador Windows (.exe)</span>
                </a>
                <a
                  href={win.releasePageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-[#F8FAFC]/15 bg-[#0F141C] px-4 py-3.5 text-xs font-semibold text-[#CBD5E1] hover:border-[#00E5FF]/40 hover:text-[#F8FAFC]"
                >
                  <span>Release Oficial</span>
                  <ArrowSquareOut size={15} aria-hidden="true" />
                </a>
              </div>

              {/* SHA-256 Verification Box */}
              <div className="rounded-xl border border-[#F8FAFC]/10 bg-[#0A0E14] p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold text-[#94A3B8]">
                    SHA-256 ({win.filename})
                  </span>
                  <CopyButton
                    value={win.sha256}
                    label="Copiar Hash"
                    ariaLabel="Copiar hash SHA-256 do instalador Windows"
                  />
                </div>
                <code className="tabular-nums mt-1.5 block truncate font-mono text-xs text-[#CBD5E1]">
                  {win.sha256}
                </code>
              </div>
            </div>
          </article>

          {/* ANDROID CARD (6 cols) */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#F8FAFC]/12 bg-[#131A24] p-6 sm:p-8 lg:col-span-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-xl border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-3 py-1.5 text-xs font-bold text-[#00E5FF]">
                  <AndroidLogo size={18} weight="fill" aria-hidden="true" />
                  <span>{android.badge}</span>
                </div>
                <span className="tabular-nums rounded-lg border border-[#F8FAFC]/12 bg-[#0F141C] px-2.5 py-1 font-mono text-xs font-semibold text-[#F8FAFC]">
                  {android.version} • {android.sizeLabel}
                </span>
              </div>

              <div className="mt-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#F8FAFC]">{android.title}</h3>
                  <p className="mt-1.5 text-xs font-medium text-[#94A3B8]">{android.requirements}</p>

                  <ul className="mt-4 space-y-2.5 text-sm text-[#CBD5E1]">
                    {android.highlights.map(item => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle
                          size={18}
                          weight="fill"
                          className="mt-0.5 shrink-0 text-[#00E5FF]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Scannable QR Code for Direct Mobile APK Download */}
                <div className="flex shrink-0 flex-col items-center rounded-xl border border-[#F8FAFC]/12 bg-[#0F141C] p-3 text-center sm:w-36">
                  {androidQrDataUrl ? (
                    <img
                      src={androidQrDataUrl}
                      alt="QR Code para baixar o APK do PC Remote direto no celular Android"
                      width={116}
                      height={116}
                      className="h-28 w-28 rounded-lg"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-lg bg-[#0A0E14] text-[#00E5FF]">
                      <QrCode size={40} weight="duotone" aria-hidden="true" />
                    </div>
                  )}
                  <span className="mt-2 font-mono text-[10px] font-medium text-[#CBD5E1]">
                    Aponte a câmera para baixar o .APK
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {/* Android Download Actions */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={android.downloadUrl}
                  className="btn-tactile focus-ring inline-flex flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-xl border border-[#00E5FF]/50 bg-[#00E5FF]/15 px-5 py-3.5 text-sm font-bold text-[#F8FAFC] hover:bg-[#00E5FF] hover:text-[#071018]"
                >
                  <DownloadSimple size={18} weight="bold" aria-hidden="true" />
                  <span>Baixar APK Universal ({android.version})</span>
                </a>
                <a
                  href={android.releasePageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-[#F8FAFC]/15 bg-[#0F141C] px-4 py-3.5 text-xs font-semibold text-[#CBD5E1] hover:border-[#00E5FF]/40 hover:text-[#F8FAFC]"
                >
                  <span>Release Android</span>
                  <ArrowSquareOut size={15} aria-hidden="true" />
                </a>
              </div>

              {/* SHA-256 Verification Box */}
              <div className="rounded-xl border border-[#F8FAFC]/10 bg-[#0A0E14] p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold text-[#94A3B8]">
                    SHA-256 ({android.filename})
                  </span>
                  <CopyButton
                    value={android.sha256}
                    label="Copiar Hash"
                    ariaLabel="Copiar hash SHA-256 do APK Android"
                  />
                </div>
                <code className="tabular-nums mt-1.5 block truncate font-mono text-xs text-[#CBD5E1]">
                  {android.sha256}
                </code>
              </div>
            </div>
          </article>
        </div>

        {/* LINUX 1-LINE GUIDE BANNER */}
        <div className="mt-6 rounded-2xl border border-[#F8FAFC]/10 bg-[#131A24] p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00E5FF]/25 bg-[#0F141C] text-[#00E5FF]">
                <LinuxLogo size={22} weight="duotone" aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-[#F8FAFC]">{linux.title}</h3>
                  <span className="rounded-md border border-[#00E5FF]/25 bg-[#00E5FF]/10 px-2 py-0.5 font-mono text-[11px] text-[#00E5FF]">
                    {linux.badge}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-[#CBD5E1]">
                  {linux.requirements}. Gere os pacotes <code className="text-[#00E5FF]">.deb</code> e{' '}
                  <code className="text-[#00E5FF]">AppImage</code> diretamente em 1 linha ou acesse as instruções
                  completas de dependências WebKitGTK:
                </p>
              </div>
            </div>

            <a
              href={linux.releasePageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex shrink-0 items-center gap-1.5 self-start rounded-xl border border-[#F8FAFC]/15 bg-[#0F141C] px-3.5 py-2 text-xs font-semibold text-[#CBD5E1] hover:border-[#00E5FF]/40 hover:text-[#F8FAFC] lg:self-center"
            >
              <span>Guia Ubuntu / Debian</span>
              <ArrowSquareOut size={14} aria-hidden="true" />
            </a>
          </div>

          <div className="mt-4 flex flex-col gap-2 rounded-xl border border-[#F8FAFC]/8 bg-[#0A0E14] p-3.5 sm:flex-row sm:items-center sm:justify-between">
            <code className="overflow-x-auto font-mono text-xs text-[#00E5FF]">{LINUX_BUILD_COMMAND}</code>
            <CopyButton
              value={LINUX_BUILD_COMMAND}
              label="Copiar Comando"
              ariaLabel="Copiar comando de compilação para Linux Ubuntu e Debian"
              className="shrink-0 self-end sm:self-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
