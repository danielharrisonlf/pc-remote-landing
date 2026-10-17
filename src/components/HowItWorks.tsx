import { CheckCircle, DownloadSimple, QrCode, ShieldCheck } from '@phosphor-icons/react';
import { fingerprintSwatches } from '../lib/fingerprint';

const SAMPLE_SWATCHES = fingerprintSwatches('3fe6cd4e5efa41c2e9c7037be165502c34f1a499b924cdc3458362f1e3a7354c');

const STEPS = [
  {
    step: 'Passo 1',
    icon: DownloadSimple,
    title: 'Instale',
    description:
      'Baixe o instalador .exe leve (~4,3 MB) no Windows ou pacote .deb no Linux e instale o APK universal (~706 KB) no seu Android.',
    badge: '30 segundos • Sem Administrador',
  },
  {
    step: 'Passo 2',
    icon: QrCode,
    title: 'Pareie na LAN',
    description:
      'Abra os dois aplicativos conectados ao mesmo Wi-Fi, leia o QR Code na tela do PC ou digite o código temporário de 8 dígitos.',
    badge: 'Descoberta mDNS ou QR Direto',
  },
  {
    step: 'Passo 3',
    icon: ShieldCheck,
    title: 'Confirme as Cores',
    description:
      'Verifique se a faixa de 8 cores do celular é idêntica à exibida no monitor e aprove o pedido no PC. Pronto, sem logins!',
    badge: 'Verificação Visual SAS Anti-MITM',
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="como-funciona-heading" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vertical Section Header */}
        <div className="max-w-3xl">
          <h2
            id="como-funciona-heading"
            className="text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl"
          >
            Do download ao controle em menos de 30 segundos.
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-[#CBD5E1]">
            Esqueça cadastros de e-mail, confirmações em duas etapas na nuvem ou configurações complexas de roteador.
          </p>
        </div>

        {/* 3-Step Connected Pipeline */}
        <ol className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="relative flex flex-col justify-between rounded-2xl border border-[#F8FAFC]/10 bg-[#131A24] p-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="tabular-nums rounded-lg border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-2.5 py-1 font-mono text-xs font-bold text-[#00E5FF]">
                      {item.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#F8FAFC]/10 bg-[#0F141C] text-[#00E5FF]">
                      <Icon size={20} weight="duotone" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-[#F8FAFC]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">{item.description}</p>
                </div>

                <div className="mt-6 border-t border-[#F8FAFC]/8 pt-4">
                  {idx === 2 ? (
                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-[#CBD5E1]">
                        <span>Faixa SAS idêntica nos 2 aparelhos</span>
                        <CheckCircle size={14} weight="fill" className="text-emerald-400" aria-hidden="true" />
                      </div>
                      <div
                        className="grid h-3 grid-cols-8 overflow-hidden rounded border border-[#F8FAFC]/15"
                        role="img"
                        aria-label="Exemplo da barra de 8 cores SAS"
                      >
                        {SAMPLE_SWATCHES.map((color, colorIdx) => (
                          <span key={colorIdx} style={{ backgroundColor: color }} className="h-full w-full" />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span className=" font-mono text-xs text-[#94A3B8]">{item.badge}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
