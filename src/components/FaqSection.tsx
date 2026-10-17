import { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { FAQ_ITEMS, type FaqItem } from '../data/releaseData';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="border-t border-[#F8FAFC]/8 bg-[#0A0E14] py-20 lg:py-28"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Vertical Section Header */}
        <div>
          <h2
            id="faq-heading"
            className="text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl lg:text-4xl"
          >
            Perguntas Frequentes
          </h2>
          <p className="mt-3 max-w-[60ch] text-base leading-relaxed text-[#CBD5E1]">
            Respostas diretas e transparentes sobre funcionamento em rede local, segurança, privacidade e operação no
            dia a dia.
          </p>
        </div>

        {/* Accessible Accordion List */}
        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item: FaqItem) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            const buttonId = `faq-btn-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? 'border-[#00E5FF]/35 bg-[#131A24]'
                    : 'border-[#F8FAFC]/10 bg-[#0F141C] hover:border-[#F8FAFC]/20'
                }`}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="focus-ring flex w-full items-center justify-between gap-4 rounded-2xl px-6 py-5 text-left text-base font-semibold text-[#F8FAFC]"
                  >
                    <span>{item.question}</span>
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-transform duration-150 ${
                        isOpen
                          ? 'rotate-180 border-[#00E5FF]/40 bg-[#00E5FF]/15 text-[#00E5FF]'
                          : 'border-[#F8FAFC]/10 bg-[#131A24] text-[#94A3B8]'
                      }`}
                      aria-hidden="true"
                    >
                      <CaretDown size={16} weight="bold" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-6 pb-5"
                >
                  <p className="text-sm leading-relaxed text-[#CBD5E1]">{item.answer}</p>
                  {item.technicalNote && (
                    <div className="mt-3 inline-block rounded-lg border border-[#00E5FF]/20 bg-[#0A0E14] px-3 py-1.5 font-mono text-xs text-[#00E5FF]">
                      {item.technicalNote}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
