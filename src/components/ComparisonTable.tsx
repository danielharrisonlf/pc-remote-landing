import { useState } from 'react';
import { CheckCircle, MinusCircle, WarningCircle, XCircle } from '@phosphor-icons/react';
import { COMPARISON_ROWS, type ComparisonRow } from '../data/releaseData';
import { BrandMark } from './BrandMark';

type CompetitorFilter = 'all' | 'teamViewerAnyDesk' | 'unifiedRemote' | 'msPhoneLink';

function StatusIcon({ status }: { status: 'best' | 'bad' | 'warn' | 'neutral' }) {
  if (status === 'best') {
    return <CheckCircle size={18} weight="fill" className="shrink-0 text-[#00E5FF]" aria-hidden="true" />;
  }
  if (status === 'warn') {
    return <WarningCircle size={18} weight="fill" className="shrink-0 text-amber-400" aria-hidden="true" />;
  }
  if (status === 'neutral') {
    return <MinusCircle size={18} weight="fill" className="shrink-0 text-[#94A3B8]" aria-hidden="true" />;
  }
  return <XCircle size={18} weight="fill" className="shrink-0 text-rose-400/90" aria-hidden="true" />;
}

export function ComparisonTable() {
  const [mobileCompetitor, setMobileCompetitor] = useState<Exclude<CompetitorFilter, 'all'>>('teamViewerAnyDesk');

  const competitorLabels: Record<Exclude<CompetitorFilter, 'all'>, string> = {
    teamViewerAnyDesk: 'TeamViewer / AnyDesk',
    unifiedRemote: 'Unified Remote',
    msPhoneLink: 'MS Phone Link',
  };

  return (
    <section
      id="comparativo"
      aria-labelledby="comparativo-heading"
      className="border-y border-[#F8FAFC]/8 bg-[#0A0E14] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vertical Section Header */}
        <div className="max-w-3xl">
          <h2
            id="comparativo-heading"
            className="text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl"
          >
            Por que trocar soluções na nuvem pelo controle 100% local?
          </h2>
          <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-[#CBD5E1]">
            Compare de forma direta a arquitetura do PC Remote contra ferramentas tradicionais de suporte remoto e
            aplicativos atrelados a contas corporativas.
          </p>
        </div>

        {/* Mobile Competitor Switcher (< 768px) for Effortless Reading at 375px */}
        <div className="mt-8 md:hidden">
          <label htmlFor="competitor-select" className="block text-xs font-semibold text-[#94A3B8]">
            Escolha um concorrente para comparar lado a lado no celular:
          </label>
          <div className="mt-2 grid grid-cols-3 gap-1.5 rounded-xl border border-[#F8FAFC]/10 bg-[#131A24] p-1">
            {(Object.keys(competitorLabels) as Array<Exclude<CompetitorFilter, 'all'>>).map(key => (
              <button
                key={key}
                type="button"
                onClick={() => setMobileCompetitor(key)}
                className={`btn-tactile focus-ring rounded-lg px-2 py-2 text-center text-[11px] font-semibold transition-colors ${
                  mobileCompetitor === key
                    ? 'bg-[#00E5FF] text-[#071018]'
                    : 'text-[#CBD5E1] hover:bg-[#F8FAFC]/5 hover:text-[#F8FAFC]'
                }`}
              >
                {competitorLabels[key]}
              </button>
            ))}
          </div>

          {/* Mobile Comparison Cards */}
          <div className="mt-4 space-y-3">
            {COMPARISON_ROWS.map((row: ComparisonRow) => {
              const rival = row[mobileCompetitor];
              return (
                <div
                  key={row.criterion}
                  className="rounded-2xl border border-[#F8FAFC]/10 bg-[#131A24] p-4"
                >
                  <div className="text-sm font-bold text-[#F8FAFC]">{row.criterion}</div>
                  <p className="mt-0.5 text-xs text-[#94A3B8]">{row.description}</p>

                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {/* PC Remote Winner Box */}
                    <div className="rounded-xl border border-[#00E5FF]/35 bg-[#00E5FF]/10 p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#00E5FF]">
                        <StatusIcon status="best" />
                        <span>PC Remote</span>
                      </div>
                      <div className="mt-1 text-xs font-bold text-[#F8FAFC]">{row.pcRemote.label}</div>
                      <div className="mt-0.5 text-[11px] text-[#CBD5E1]">{row.pcRemote.detail}</div>
                    </div>

                    {/* Selected Competitor Box */}
                    <div className="rounded-xl border border-[#F8FAFC]/8 bg-[#0F141C] p-3">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#94A3B8]">
                        <StatusIcon status={rival.status} />
                        <span>{competitorLabels[mobileCompetitor]}</span>
                      </div>
                      <div className="mt-1 text-xs font-semibold text-[#CBD5E1]">{rival.label}</div>
                      <div className="mt-0.5 text-[11px] text-[#94A3B8]">{rival.detail}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full Desktop/Tablet Matrix Table (>= 768px) */}
        <div className="mt-10 hidden overflow-x-auto rounded-2xl border border-[#F8FAFC]/12 bg-[#0F141C] shadow-2xl md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#F8FAFC]/12 bg-[#131A24]">
                <th scope="col" className="w-[26%] py-5 pr-4 pl-6 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                  Critério / Recurso
                </th>
                <th
                  scope="col"
                  className="w-[24%] border-x border-[#00E5FF]/35 bg-[#00E5FF]/10 px-5 py-5 text-sm font-bold text-[#F8FAFC]"
                >
                  <div className="flex items-center gap-2.5">
                    <BrandMark size={26} withSurface />
                    <div>
                      <div className="flex items-center gap-2">
                        <span>PC Remote</span>
                        <span className="rounded bg-[#00E5FF] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#071018]">
                          LOCAL-FIRST
                        </span>
                      </div>
                      <div className="font-mono text-[11px] font-normal text-[#00E5FF]">v0.6.4 • Open Source</div>
                    </div>
                  </div>
                </th>
                <th scope="col" className="w-[18%] px-4 py-5 text-sm font-semibold text-[#CBD5E1]">
                  TeamViewer / AnyDesk
                </th>
                <th scope="col" className="w-[16%] px-4 py-5 text-sm font-semibold text-[#CBD5E1]">
                  Unified Remote
                </th>
                <th scope="col" className="w-[16%] py-5 pr-6 pl-4 text-sm font-semibold text-[#CBD5E1]">
                  MS Phone Link
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8FAFC]/8 text-sm">
              {COMPARISON_ROWS.map((row: ComparisonRow) => (
                <tr key={row.criterion} className="transition-colors hover:bg-[#131A24]/60">
                  {/* Criterion */}
                  <th scope="row" className="py-4 pr-4 pl-6 align-top font-semibold text-[#F8FAFC]">
                    <div>{row.criterion}</div>
                    <p className="mt-1 text-xs font-normal leading-relaxed text-[#94A3B8]">{row.description}</p>
                  </th>

                  {/* PC Remote Highlighted Cell */}
                  <td className="tabular-nums border-x border-[#00E5FF]/30 bg-[#00E5FF]/[0.05] px-5 py-4 align-top">
                    <div className="flex items-start gap-2">
                      <StatusIcon status="best" />
                      <div>
                        <div className="font-bold text-[#F8FAFC]">{row.pcRemote.label}</div>
                        <div className="mt-0.5 text-xs text-[#CBD5E1]">{row.pcRemote.detail}</div>
                      </div>
                    </div>
                  </td>

                  {/* TeamViewer / AnyDesk */}
                  <td className="tabular-nums px-4 py-4 align-top">
                    <div className="flex items-start gap-2">
                      <StatusIcon status={row.teamViewerAnyDesk.status} />
                      <div>
                        <div className="font-medium text-[#CBD5E1]">{row.teamViewerAnyDesk.label}</div>
                        <div className="mt-0.5 text-xs text-[#94A3B8]">{row.teamViewerAnyDesk.detail}</div>
                      </div>
                    </div>
                  </td>

                  {/* Unified Remote */}
                  <td className="tabular-nums px-4 py-4 align-top">
                    <div className="flex items-start gap-2">
                      <StatusIcon status={row.unifiedRemote.status} />
                      <div>
                        <div className="font-medium text-[#CBD5E1]">{row.unifiedRemote.label}</div>
                        <div className="mt-0.5 text-xs text-[#94A3B8]">{row.unifiedRemote.detail}</div>
                      </div>
                    </div>
                  </td>

                  {/* MS Phone Link */}
                  <td className="tabular-nums py-4 pr-6 pl-4 align-top">
                    <div className="flex items-start gap-2">
                      <StatusIcon status={row.msPhoneLink.status} />
                      <div>
                        <div className="font-medium text-[#CBD5E1]">{row.msPhoneLink.label}</div>
                        <div className="mt-0.5 text-xs text-[#94A3B8]">{row.msPhoneLink.detail}</div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
