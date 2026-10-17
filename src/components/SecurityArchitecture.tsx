import {
  FileLock,
  Key,
  SealCheck,
  ShieldCheck,
  TerminalWindow,
  UserCheck,
} from '@phosphor-icons/react';
import { WINDOWS_FIREWALL_COMMAND } from '../data/releaseData';
import { CopyButton } from './CopyButton';

const SECURITY_PILLARS = [
  {
    icon: Key,
    title: 'Chaves Criptográficas no Windows DPAPI',
    description:
      'A chave privada TLS e as credenciais de dispositivos pareados são criptografadas com a Data Protection API (DPAPI) vinculada à conta do usuário no Windows.',
    spec: 'TLS 1.3 + SHA-256 Digest',
  },
  {
    icon: UserCheck,
    title: 'Execução em Nível de Usuário Comum',
    description:
      'O PC Remote roda na sessão normal do seu usuário. Não exige privilégios de Administrador (UAC), não instala drivers de kernel e não cria serviços ocultos como SYSTEM.',
    spec: 'Zero Privilégios Elevados',
  },
  {
    icon: TerminalWindow,
    title: 'Zero Terminais ou Shell Remoto Expostos',
    description:
      'Diferente de ferramentas de administração remota, não existe endpoint para executar comandos arbitrários (cmd, PowerShell ou bash). O protocolo aceita apenas ações tipadas.',
    spec: 'Protocolo v1 Estritamente Tipado',
  },
  {
    icon: SealCheck,
    title: 'Atualizações Assinadas com Ed25519',
    description:
      'O atualizador integrado confere a assinatura criptográfica Ed25519 do pacote com a chave pública embutida no binário antes de permitir qualquer atualização.',
    spec: 'Verificação Criptográfica Automática',
  },
];

export function SecurityArchitecture() {
  return (
    <section
      id="seguranca"
      aria-labelledby="seguranca-heading"
      className="border-t border-[#F8FAFC]/8 bg-[#0A0E14] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vertical Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-3 py-1 text-xs font-medium text-[#00E5FF]">
            <ShieldCheck size={15} weight="fill" aria-hidden="true" />
            <span>Arquitetura Local-First Auditável</span>
          </div>
          <h2
            id="seguranca-heading"
            className="mt-4 text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl"
          >
            Segurança desenhada para quem não confia em caixas-pretas.
          </h2>
          <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-[#CBD5E1]">
            Sem servidores centrais para sofrerem vazamentos. Toda a comunicação ocorre diretamente entre o seu
            celular e o seu computador na porta local <code className="text-[#00E5FF]">TCP 43127</code>.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {SECURITY_PILLARS.map(pillar => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="flex flex-col justify-between rounded-2xl border border-[#F8FAFC]/10 bg-[#131A24] p-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00E5FF]/25 bg-[#00E5FF]/10 text-[#00E5FF]">
                      <Icon size={22} weight="duotone" aria-hidden="true" />
                    </div>
                    <span className="rounded-md border border-[#F8FAFC]/10 bg-[#0F141C] px-2.5 py-1 font-mono text-[11px] text-[#00E5FF]">
                      {pillar.spec}
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-[#F8FAFC]">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">{pillar.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Technical Firewall & Visual Identity Verification Showcase */}
        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Firewall Isolation Box (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#F8FAFC]/10 bg-[#0F141C] p-6 lg:col-span-7">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#00E5FF]">
                <FileLock size={16} weight="duotone" aria-hidden="true" />
                <span>Isolamento Estrito de Sub-rede Privada</span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-[#F8FAFC]">
                Controle total sobre o seu Firewall do Windows
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#CBD5E1]">
                O aplicativo não altera configurações do seu roteador (zero UPnP) e recomenda permitir tráfego apenas
                no perfil <strong className="text-[#F8FAFC]">Private (LocalSubnet)</strong>. Você pode auditar ou criar
                a regra explícita via PowerShell:
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-[#F8FAFC]/10 bg-[#0A0E14] p-3.5">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#94A3B8]">PowerShell (Regra LocalSubnet TCP 43127)</span>
                <CopyButton
                  value={WINDOWS_FIREWALL_COMMAND}
                  label="Copiar Regra"
                  ariaLabel="Copiar comando PowerShell de regra de firewall local"
                />
              </div>
              <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[#CBD5E1]">
                <code>{WINDOWS_FIREWALL_COMMAND}</code>
              </pre>
            </div>
          </div>

          {/* Official Brand Multi-Resolution Asset Card (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#F8FAFC]/10 bg-[#0F141C] p-6 lg:col-span-5">
            <div>
              <h3 className="text-base font-bold text-[#F8FAFC]">
                Identidade Visual Unificada (Windows, Linux &amp; Android)
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#94A3B8]">
                Geometria vetorial pura sem gradientes artificiais: moldura do computador em Ice (
                <code className="text-[#F8FAFC]">#F8FAFC</code>) e controlador Android em Cyan (
                <code className="text-[#00E5FF]">#00E5FF</code>) sobre Obsidian (
                <code className="text-[#CBD5E1]">#0F141C</code>).
              </p>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-[#F8FAFC]/10 bg-[#0A0E14] p-2">
              <img
                src="/brand/preview.png"
                alt="Preview oficial de ícones multi-resolução do PC Remote para Windows ICO e máscaras adaptativas Android"
                width={520}
                height={260}
                loading="lazy"
                className="h-auto w-full rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
