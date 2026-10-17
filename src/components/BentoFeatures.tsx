import { useState } from 'react';
import {
  ArrowsLeftRight,
  CheckCircle,
  ClipboardText,
  CursorClick,
  FileArrowUp,
  HandPalm,
  LockKey,
  MagnifyingGlass,
  Play,
  Power,
  ShieldCheck,
  SkipBack,
  SkipForward,
  SpeakerHigh,
  Timer,
  WarningOctagon,
} from '@phosphor-icons/react';

export function BentoFeatures() {
  const [panicActive, setPanicActive] = useState(false);
  const [selectedTimer, setSelectedTimer] = useState<'15 min' | '30 min' | '1 h' | '2 h'>('30 min');

  return (
    <section id="recursos" aria-labelledby="recursos-heading" className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Vertical Stacked Header (adhering to Split-Header Ban & Eyebrow Restraint) */}
        <div className="max-w-3xl">
          <h2
            id="recursos-heading"
            className="text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl"
          >
            Cinco ferramentas essenciais em um único binário nativo.
          </h2>
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-[#CBD5E1]">
            Projetado em Rust e Tauri v2 no desktop e Kotlin nativo no Android. Cada recurso opera direto na memória
            RAM da sua máquina, sem gravar históricos ocultos no disco.
          </p>
        </div>

        {/* 5-Cell Asymmetric Bento Grid (Row 1: 7 + 5 cols, Row 2: 4 + 4 + 4 cols) */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* CELL 1 (7 cols): Touchpad & Digitação Direta em RAM + Botão Interromper */}
          <article className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#00E5FF]/25 bg-gradient-to-br from-[#16202E] via-[#131A24] to-[#0F141C] p-6 sm:p-7 lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-2.5 py-1 text-xs font-semibold text-[#00E5FF]">
                  <CursorClick size={16} weight="duotone" aria-hidden="true" />
                  <span>Entrada de Baixa Latência</span>
                </div>
                <span className="tabular-nums font-mono text-xs text-[#94A3B8]">Limite: 1.024 bytes UTF-8 / envio</span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-[#F8FAFC] sm:text-2xl">
                Touchpad &amp; Digitação Direta em RAM
              </h3>
              <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-[#CBD5E1]">
                Cursor suave, gestos multitoque e botões rápidos (<code className="text-[#00E5FF]">Enter</code>,{' '}
                <code className="text-[#00E5FF]">Tab</code>, rolagem e clique direito) com injeção limpa na janela em
                foco. O texto digitado trafega exclusivamente em RAM sem jamais tocar logs em disco.
              </p>
            </div>

            {/* Interactive Micro-Console: Hardware Panic Switch */}
            <div className="mt-6 rounded-xl border border-[#F8FAFC]/10 bg-[#0A0E14]/90 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
                      panicActive
                        ? 'border-rose-500/40 bg-rose-500/15 text-rose-400'
                        : 'border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF]'
                    }`}
                  >
                    <HandPalm size={18} weight="duotone" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#F8FAFC]">
                        Botão de Pânico Físico no PC (&ldquo;Interromper&rdquo;)
                      </span>
                      <span
                        className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold ${
                          panicActive ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {panicActive ? 'TRAVADO' : 'ARMADO'}
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-[#94A3B8]">
                      {panicActive
                        ? 'Mouse, teclado e energia bloqueados mesmo se o celular reconectar.'
                        : 'Com 1 clique no PC ou na bandeja, corte na hora mouse, teclado e energia.'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setPanicActive(prev => !prev)}
                  className={`btn-tactile focus-ring shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold ${
                    panicActive
                      ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30'
                      : 'border border-rose-500/40 bg-rose-500/20 text-rose-200 hover:bg-rose-500/30'
                  }`}
                >
                  {panicActive ? 'Liberar Entrada' : 'Simular "Interromper"'}
                </button>
              </div>
            </div>
          </article>

          {/* CELL 2 (5 cols): Transferência Ultrarrápida de Arquivos (até 1 GB) */}
          <article className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#F8FAFC]/10 bg-[#131A24] p-6 sm:p-7 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-2.5 py-1 text-xs font-semibold text-[#00E5FF]">
                  <FileArrowUp size={16} weight="duotone" aria-hidden="true" />
                  <span>Bidirecional • Até 1 GB</span>
                </div>
                <span className="tabular-nums font-mono text-xs text-[#00E5FF]">Blocos de 64 KiB</span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-[#F8FAFC]">
                Transferência Ultrarrápida de Arquivos
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
                Envie arquivos entre PC e Android com consumo constante de memória, ticket criptográfico de uso único e
                conferência automática de hash <strong className="text-[#F8FAFC]">SHA-256</strong> antes de salvar.
              </p>
            </div>

            {/* Security & SmartScreen Visual Spec */}
            <div className="mt-6 space-y-2.5 rounded-xl border border-[#F8FAFC]/8 bg-[#0A0E14] p-3.5">
              <div className="flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-300">
                  <ShieldCheck size={15} weight="fill" className="text-emerald-400" aria-hidden="true" />
                  Mark-of-the-Web (SmartScreen)
                </span>
                <span className="font-mono text-[10px] text-[#94A3B8]">Ativo no Windows</span>
              </div>
              <div className="border-t border-[#F8FAFC]/8 pt-2.5">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-rose-300">
                  <WarningOctagon size={14} weight="fill" className="text-rose-400" aria-hidden="true" />
                  <span>Rejeição automática de atalhos perigosos:</span>
                </div>
                <div className="mt-1.5 flex flex-wrap gap-1.5 font-mono text-[10px]">
                  {['.lnk', '.url', '.scf', '.library-ms', 'desktop.ini'].map(ext => (
                    <span
                      key={ext}
                      className="rounded border border-rose-500/30 bg-rose-500/10 px-1.5 py-0.5 text-rose-200"
                    >
                      {ext} bloqueado
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* CELL 3 (4 cols): Área de Transferência em Tempo Real */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#F8FAFC]/10 bg-[#131A24] p-6 lg:col-span-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#F8FAFC]/12 bg-[#0F141C] px-2.5 py-1 text-xs font-semibold text-[#F8FAFC]">
                <ClipboardText size={16} weight="duotone" className="text-[#00E5FF]" aria-hidden="true" />
                <span>Clipboard Sincronizado</span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#F8FAFC]">
                Área de Transferência em Tempo Real
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
                Copie no PC e cole no celular (ou vice-versa). Suporta textos UTF-8 até{' '}
                <strong className="tabular-nums text-[#F8FAFC]">64 KiB</strong> e prints/imagens{' '}
                <strong className="tabular-nums text-[#F8FAFC]">PNG/JPEG até 32 MB</strong>.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-[#F8FAFC]/8 bg-[#0A0E14] p-3.5">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#CBD5E1]">PC (RAM)</span>
                <ArrowsLeftRight size={14} className="text-[#00E5FF]" aria-hidden="true" />
                <span className="text-[#00E5FF]">Android (RAM)</span>
              </div>
              <ul className="mt-2.5 space-y-1.5 text-xs text-[#94A3B8]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle size={13} weight="fill" className="shrink-0 text-[#00E5FF]" aria-hidden="true" />
                  <span>Sem gravação de histórico em disco</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle size={13} weight="fill" className="shrink-0 text-[#00E5FF]" aria-hidden="true" />
                  <span>Respeita flags de exclusão do Windows</span>
                </li>
              </ul>
            </div>
          </article>

          {/* CELL 4 (4 cols): Central de Mídia & Volume Integrada */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#F8FAFC]/10 bg-[#131A24] p-6 lg:col-span-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#F8FAFC]/12 bg-[#0F141C] px-2.5 py-1 text-xs font-semibold text-[#F8FAFC]">
                <SpeakerHigh size={16} weight="duotone" className="text-[#00E5FF]" aria-hidden="true" />
                <span>SMTC Windows &amp; Linux MPRIS</span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#F8FAFC]">
                Central de Mídia &amp; Volume Integrada
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
                Controle o player ativo do sistema, ajuste o volume pelas teclas físicas do celular e dispare buscas no
                YouTube direto no navegador padrão do PC.
              </p>
            </div>

            {/* Mini Media Deck Preview */}
            <div className="mt-6 rounded-xl border border-[#F8FAFC]/8 bg-[#0A0E14] p-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Faixa anterior (demonstração)"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#F8FAFC]/10 bg-[#131A24] text-[#CBD5E1]"
                  >
                    <SkipBack size={13} weight="fill" />
                  </button>
                  <button
                    type="button"
                    aria-label="Reproduzir ou pausar (demonstração)"
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00E5FF] text-[#071018]"
                  >
                    <Play size={14} weight="fill" />
                  </button>
                  <button
                    type="button"
                    aria-label="Próxima faixa (demonstração)"
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#F8FAFC]/10 bg-[#131A24] text-[#CBD5E1]"
                  >
                    <SkipForward size={13} weight="fill" />
                  </button>
                </div>
                <span className="inline-flex items-center gap-1 rounded-md border border-[#00E5FF]/25 bg-[#00E5FF]/10 px-2 py-1 font-mono text-[10px] text-[#00E5FF]">
                  <MagnifyingGlass size={11} weight="bold" aria-hidden="true" />
                  YouTube Quick Search
                </span>
              </div>
            </div>
          </article>

          {/* CELL 5 (4 cols): Gerenciamento de Energia Inteligente */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#F8FAFC]/10 bg-[#131A24] p-6 lg:col-span-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-[#F8FAFC]/12 bg-[#0F141C] px-2.5 py-1 text-xs font-semibold text-[#F8FAFC]">
                <Power size={16} weight="duotone" className="text-[#00E5FF]" aria-hidden="true" />
                <span>Agendamento Seguro em RAM</span>
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#F8FAFC]">
                Gerenciamento de Energia Inteligente
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
                Desligue, suspenda, reinicie ou bloqueie a tela na hora ou com timer programado. Notifica no desktop 60s
                antes e nunca fecha programas com trabalho não salvo à força.
              </p>
            </div>

            {/* Interactive Timer Selector Preview */}
            <div className="mt-6 rounded-xl border border-[#F8FAFC]/8 bg-[#0A0E14] p-3.5">
              <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                <span className="inline-flex items-center gap-1">
                  <Timer size={13} className="text-[#00E5FF]" aria-hidden="true" />
                  Agendar desligamento:
                </span>
                <span className="inline-flex items-center gap-1 text-[#CBD5E1]">
                  <LockKey size={12} className="text-emerald-400" aria-hidden="true" />
                  Cancelável na bandeja
                </span>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-1.5">
                {(['15 min', '30 min', '1 h', '2 h'] as const).map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimer(slot)}
                    className={`btn-tactile focus-ring tabular-nums rounded-lg py-1 font-mono text-[11px] font-medium transition-colors ${
                      selectedTimer === slot
                        ? 'bg-[#00E5FF] font-bold text-[#071018]'
                        : 'border border-[#F8FAFC]/10 bg-[#131A24] text-[#CBD5E1] hover:border-[#00E5FF]/40'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
