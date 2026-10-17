import { useState } from 'react';
import {
  ArrowsClockwise,
  CheckCircle,
  CursorClick,
  HandPalm,
  Keyboard,
  LockKey,
  Monitor,
  ShieldCheck,
  SpeakerHigh,
  WifiHigh,
} from '@phosphor-icons/react';
import { fingerprintShort, fingerprintSwatches, formatPairCode } from '../lib/fingerprint';
import { BrandMark } from './BrandMark';

interface PairingPreset {
  code: string;
  sha256: string;
  pcName: string;
  ip: string;
  phoneName: string;
}

const PAIRING_PRESETS: PairingPreset[] = [
  {
    code: '48297316',
    sha256: '3fe6cd4e5efa41c2e9c7037be165502c34f1a499b924cdc3458362f1e3a7354c',
    pcName: 'DESKTOP-RYZEN9',
    ip: '192.168.1.42:43127',
    phoneName: 'Pixel 8 Pro (Android 15)',
  },
  {
    code: '91046285',
    sha256: '673890551e02d89f5b8448ab0cf25b0500a9416782d4c102299b6c0347fea3f9',
    pcName: 'WORKSTATION-UBUNTU',
    ip: '192.168.1.88:43127',
    phoneName: 'Galaxy S24 (Kotlin 0.6.3)',
  },
  {
    code: '73612049',
    sha256: 'ca65bdf6718c006e6e4b8f380fd44d2beaf8e01bb6cde629e6706a20f032ed09',
    pcName: 'STUDIO-WIN11',
    ip: '10.0.0.15:43127',
    phoneName: 'Motorola Edge 50',
  },
];

export function DeviceSyncPreview() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [inputBlocked, setInputBlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'pairing' | 'controller'>('pairing');

  const current = PAIRING_PRESETS[presetIndex];
  const swatches = fingerprintSwatches(current.sha256);
  const shortFp = fingerprintShort(current.sha256);

  const cyclePreset = () => {
    setPresetIndex(prev => (prev + 1) % PAIRING_PRESETS.length);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[600px] lg:max-w-none"
      aria-label="Simulador interativo de sincronização entre PC Remote Desktop e Android"
    >
      {/* Ambient Cyan Glow behind devices (pointer-events-none per guidelines) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-35 blur-2xl"
        style={{
          background:
            'radial-gradient(circle at 65% 35%, rgba(0, 229, 255, 0.22), rgba(15, 20, 28, 0) 70%)',
        }}
      />

      {/* Interactive Mode Switcher Bar */}
      <div className="relative mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#F8FAFC]/10 bg-[#131A24]/90 px-3 py-2 text-xs">
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Modo de visualização do mockup">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'pairing'}
            onClick={() => setActiveTab('pairing')}
            className={`btn-tactile focus-ring rounded-lg px-2.5 py-1 font-medium transition-colors ${
              activeTab === 'pairing'
                ? 'bg-[#00E5FF] text-[#071018] font-semibold'
                : 'text-[#CBD5E1] hover:bg-[#F8FAFC]/5 hover:text-[#F8FAFC]'
            }`}
          >
            1. Pareamento Visual SAS
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'controller'}
            onClick={() => setActiveTab('controller')}
            className={`btn-tactile focus-ring rounded-lg px-2.5 py-1 font-medium transition-colors ${
              activeTab === 'controller'
                ? 'bg-[#00E5FF] text-[#071018] font-semibold'
                : 'text-[#CBD5E1] hover:bg-[#F8FAFC]/5 hover:text-[#F8FAFC]'
            }`}
          >
            2. Controle &amp; Botão de Pânico
          </button>
        </div>

        <button
          type="button"
          onClick={cyclePreset}
          className="btn-tactile focus-ring inline-flex items-center gap-1.5 rounded-lg border border-[#00E5FF]/30 bg-[#00E5FF]/10 px-2.5 py-1 font-mono text-[11px] font-medium text-[#00E5FF] hover:bg-[#00E5FF]/20"
          title="Gerar novo código de 8 dígitos e recalcular cores SHA-256"
        >
          <ArrowsClockwise size={13} weight="bold" aria-hidden="true" />
          <span>Simular Novo Código</span>
        </button>
      </div>

      {/* Synchronized Devices Stage */}
      <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-stretch">
        {/* DESKTOP WINDOW MOCKUP (7 cols) */}
        <div className="glass-panel flex flex-col justify-between rounded-2xl p-4 sm:col-span-7">
          {/* Window Titlebar */}
          <div>
            <div className="flex items-center justify-between border-b border-[#F8FAFC]/10 pb-3">
              <div className="flex items-center gap-2.5">
                <BrandMark size={24} withSurface />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#F8FAFC]">PC Remote Desktop</span>
                    <span className="tabular-nums rounded bg-[#F8FAFC]/8 px-1.5 py-0.5 font-mono text-[10px] text-[#94A3B8]">
                      v0.6.4
                    </span>
                  </div>
                  <p className="tabular-nums font-mono text-[10px] text-[#94A3B8]">{current.ip} • TLS 1.3</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                LAN Privada
              </span>
            </div>

            {/* Host Identity Row */}
            <div className="mt-3 flex items-center justify-between rounded-xl border border-[#F8FAFC]/8 bg-[#0F141C]/90 px-3 py-2">
              <div className="flex items-center gap-2">
                <Monitor size={16} className="text-[#F8FAFC]" aria-hidden="true" />
                <div>
                  <div className="text-xs font-semibold text-[#F8FAFC]">{current.pcName}</div>
                  <div className="text-[11px] text-[#94A3B8]">
                    {activeTab === 'pairing' ? 'Aguardando confirmação SAS' : `Conectado a ${current.phoneName}`}
                  </div>
                </div>
              </div>
              <span className="tabular-nums font-mono text-[10px] text-[#00E5FF]">~28 MB RAM</span>
            </div>

            {activeTab === 'pairing' ? (
              /* Desktop Pairing View */
              <div className="mt-3 rounded-xl border border-[#00E5FF]/25 bg-[#0A0E14] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#94A3B8]">Código de Pareamento Local</span>
                  <span className="tabular-nums font-mono text-[11px] text-amber-300">Expira em 01:54</span>
                </div>

                <div className="mt-1.5 flex items-baseline justify-between">
                  <div
                    className="tabular-nums font-mono text-2xl font-bold tracking-widest text-[#F8FAFC]"
                    aria-label={`Código no PC: ${formatPairCode(current.code)}`}
                  >
                    {formatPairCode(current.code)}
                  </div>
                  <span className="font-mono text-[10px] text-[#94A3B8]">DPAPI + SHA-256</span>
                </div>

                {/* 8-Color SAS Strip on PC */}
                <div className="mt-3">
                  <div className="mb-1.5 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-[#CBD5E1]">Assinatura Visual SAS (8 cores):</span>
                    <code className="tabular-nums font-mono text-[10px] text-[#94A3B8]">{shortFp}</code>
                  </div>
                  <div
                    className="grid h-3.5 grid-cols-8 overflow-hidden rounded-md border border-[#F8FAFC]/15"
                    role="img"
                    aria-label="Faixa de 8 cores de verificação criptográfica no PC"
                  >
                    {swatches.map((color, idx) => (
                      <span key={idx} style={{ backgroundColor: color }} className="h-full w-full" />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Desktop Active Control + Panic Button View */
              <div className="mt-3 rounded-xl border border-[#F8FAFC]/10 bg-[#0A0E14] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#F8FAFC]">Controle de Entrada Remota</span>
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold ${
                      inputBlocked
                        ? 'border border-rose-500/40 bg-rose-500/15 text-rose-300'
                        : 'border border-[#00E5FF]/30 bg-[#00E5FF]/15 text-[#00E5FF]'
                    }`}
                  >
                    {inputBlocked ? 'BLOQUEADO NO PC' : 'TOUCHPAD & TECLADO ATIVOS'}
                  </span>
                </div>

                <p className="mt-1.5 text-[11px] leading-relaxed text-[#94A3B8]">
                  {inputBlocked
                    ? 'Mouse, teclado e energia estão desarmados neste PC. Mídia e arquivos continuam funcionando.'
                    : 'O botão físico abaixo corta imediatamente comandos de mouse, teclado e desligamento.'}
                </p>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setInputBlocked(prev => !prev)}
                    className={`btn-tactile focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                      inputBlocked
                        ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30'
                        : 'border border-rose-500/50 bg-rose-500/20 text-rose-200 hover:bg-rose-500/30'
                    }`}
                  >
                    <HandPalm size={15} weight="bold" aria-hidden="true" />
                    <span>{inputBlocked ? 'Liberar Entrada do Celular' : 'Interromper (Botão de Pânico)'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Bottom Status Footer */}
          <div className="mt-3 flex items-center justify-between border-t border-[#F8FAFC]/8 pt-2.5 text-[11px] text-[#94A3B8]">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={14} weight="fill" className="text-[#00E5FF]" aria-hidden="true" />
              Sem nuvem • Zero telemetria
            </span>
            <button
              type="button"
              onClick={() => setInputBlocked(prev => !prev)}
              className="focus-ring rounded font-mono text-[11px] font-medium text-[#00E5FF] underline-offset-2 hover:underline"
            >
              {inputBlocked ? 'Status: Interrompido' : 'Testar botão Interromper'}
            </button>
          </div>
        </div>

        {/* ANDROID PHONE MOCKUP (5 cols) */}
        <div className="glass-panel flex flex-col justify-between rounded-2xl border-[#00E5FF]/30 p-4 sm:col-span-5">
          <div>
            {/* Phone Status Bar */}
            <div className="flex items-center justify-between border-b border-[#F8FAFC]/10 pb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#00E5FF]" aria-hidden="true" />
                <span className="text-xs font-semibold text-[#F8FAFC]">Android Kotlin</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#00E5FF]">
                <WifiHigh size={13} weight="bold" aria-hidden="true" />
                <span>LAN Direta</span>
              </div>
            </div>

            {activeTab === 'pairing' ? (
              /* Phone Pairing Confirmation */
              <div className="mt-3 space-y-3">
                <div className="rounded-xl border border-[#F8FAFC]/10 bg-[#0A0E14] p-3">
                  <div className="text-[10px] font-medium uppercase tracking-wider text-[#94A3B8]">
                    Código Digitado no Android
                  </div>
                  <div className="tabular-nums mt-1 font-mono text-xl font-bold tracking-widest text-[#00E5FF]">
                    {formatPairCode(current.code)}
                  </div>
                  <div className="mt-1 text-[11px] text-[#CBD5E1]">Alvo: {current.pcName}</div>
                </div>

                <div className="rounded-xl border border-[#00E5FF]/25 bg-[#0A0E14] p-3">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-[#F8FAFC]">Cores idênticas ao PC:</span>
                    <CheckCircle size={14} weight="fill" className="text-emerald-400" aria-hidden="true" />
                  </div>
                  <div
                    className="grid h-3.5 grid-cols-8 overflow-hidden rounded-md border border-[#F8FAFC]/15"
                    role="img"
                    aria-label="Faixa de 8 cores idêntica exibida na tela do celular Android"
                  >
                    {swatches.map((color, idx) => (
                      <span key={idx} style={{ backgroundColor: color }} className="h-full w-full" />
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] leading-snug text-[#94A3B8]">
                    A mesma chave TLS gera as mesmas 8 cores nos dois aparelhos sem passar por servidores.
                  </p>
                </div>
              </div>
            ) : (
              /* Phone Touchpad & Media Surface */
              <div className="mt-3 space-y-2.5">
                {/* Touchpad Surface */}
                <div
                  className={`flex h-28 flex-col items-center justify-center rounded-xl border p-3 text-center transition-colors ${
                    inputBlocked
                      ? 'border-rose-500/35 bg-rose-950/25 text-rose-200'
                      : 'border-[#00E5FF]/35 bg-[#0A0E14] text-[#F8FAFC]'
                  }`}
                >
                  {inputBlocked ? (
                    <>
                      <LockKey size={22} weight="duotone" className="text-rose-400" aria-hidden="true" />
                      <span className="mt-1 text-xs font-semibold text-rose-200">Bloqueado pelo PC</span>
                      <span className="mt-0.5 text-[10px] text-rose-300/80">
                        Clique em &ldquo;Liberar&rdquo; no computador
                      </span>
                    </>
                  ) : (
                    <>
                      <CursorClick size={22} weight="duotone" className="text-[#00E5FF]" aria-hidden="true" />
                      <span className="mt-1 text-xs font-semibold text-[#F8FAFC]">Touchpad Multitoque Ativo</span>
                      <span className="mt-0.5 font-mono text-[10px] text-[#00E5FF]">
                        Injeção direta em RAM • 0 ms nuvem
                      </span>
                    </>
                  )}
                </div>

                {/* Quick Action Pill Row */}
                <div className="grid grid-cols-3 gap-1.5 text-[10px] font-medium">
                  <div className="flex items-center justify-center gap-1 rounded-lg border border-[#F8FAFC]/10 bg-[#0A0E14] py-1.5 text-[#CBD5E1]">
                    <Keyboard size={12} className="text-[#00E5FF]" aria-hidden="true" />
                    <span>Digitar</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 rounded-lg border border-[#F8FAFC]/10 bg-[#0A0E14] py-1.5 text-[#CBD5E1]">
                    <SpeakerHigh size={12} className="text-[#00E5FF]" aria-hidden="true" />
                    <span>Mídia</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 rounded-lg border border-[#F8FAFC]/10 bg-[#0A0E14] py-1.5 text-[#CBD5E1]">
                    <span className="font-mono text-[#00E5FF]">1GB</span>
                    <span>Arquivos</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 border-t border-[#F8FAFC]/8 pt-2.5 text-center font-mono text-[10px] text-[#94A3B8]">
            APK 706 KB • Sem anúncios • Sem conta
          </div>
        </div>
      </div>
    </div>
  );
}
