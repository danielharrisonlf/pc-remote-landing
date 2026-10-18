export interface ReleaseAssetInfo {
  platform: 'windows' | 'android' | 'linux';
  title: string;
  version: string;
  badge: string;
  filename: string;
  sizeLabel: string;
  downloadUrl: string;
  releasePageUrl: string;
  sha256: string;
  requirements: string;
  highlights: string[];
}

export const RELEASE_ASSETS: Record<'windows' | 'android' | 'linux', ReleaseAssetInfo> = {
  windows: {
    platform: 'windows',
    title: 'PC Remote para Windows',
    version: 'v0.6.4',
    badge: 'Windows 10/11 (x64)',
    filename: 'pc-remote-desktop-0.6.4-x64-setup.exe',
    sizeLabel: '4,36 MB (4.568.744 bytes)',
    downloadUrl:
      'https://github.com/danielharrisonlf/pc-remote-desktop/releases/download/v0.6.4/pc-remote-desktop-0.6.4-x64-setup.exe',
    releasePageUrl: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases/tag/v0.6.4',
    sha256: '3fe6cd4e5efa41c2e9c7037be165502c34f1a499b924cdc3458362f1e3a7354c',
    requirements: 'Windows 10 (1809+) ou Windows 11 x64 • Sessão do usuário (sem exigir Administrador)',
    highlights: [
      'Instalador NSIS leve com atualizador automático integrado assinado (Ed25519)',
      'Executa silenciosamente na bandeja do sistema consumindo apenas ~25 a 40 MB de RAM',
      'Preserva pareamentos e identidade TLS (DPAPI) entre atualizações',
    ],
  },
  android: {
    platform: 'android',
    title: 'PC Remote para Android',
    version: 'v0.6.3-kotlin',
    badge: 'APK Universal Nativo',
    filename: 'pc-remote-android-kotlin-0.6.3-evaluation.apk',
    sizeLabel: '706 KB (723.457 bytes)',
    downloadUrl:
      'https://github.com/danielharrisonlf/pc-remote-android/releases/download/v0.6.3-kotlin/pc-remote-android-kotlin-0.6.3-evaluation.apk',
    releasePageUrl: 'https://github.com/danielharrisonlf/pc-remote-android/releases/tag/v0.6.3-kotlin',
    sha256: '673890551e02d89f5b8448ab0cf25b0500a9416782d4c102299b6c0347fea3f9',
    requirements: 'Android 8.0+ (API 26+) • Kotlin + Jetpack Compose • Sem root ou ADB',
    highlights: [
      'Ultraleve (~706 KB otimizado com R8), nativo em Kotlin e Jetpack Compose',
      'Leitor de QR Code integrado e validação visual de 8 cores (SAS)',
      'Desarma automaticamente entradas pendentes ao sair de foco para evitar cliques acidentais',
    ],
  },
  linux: {
    platform: 'linux',
    title: 'PC Remote para Linux',
    version: 'v0.6.4',
    badge: 'Ubuntu 22.04 / 24.04 LTS (.deb & AppImage)',
    filename: 'pc-remote-desktop_0.6.4_amd64.deb',
    sizeLabel: 'Build reproduzível via Tauri v2 + Rust',
    downloadUrl: 'https://github.com/danielharrisonlf/pc-remote-desktop/releases/tag/v0.6.4',
    releasePageUrl: 'https://github.com/danielharrisonlf/pc-remote-desktop/blob/main/README.md#compila%C3%A7%C3%A3o-e-empacotamento-no-linux-ubuntu-2204--2404-lts',
    sha256: '3fe6cd4e5efa41c2e9c7037be165502c34f1a499b924cdc3458362f1e3a7354c',
    requirements: 'Ubuntu 22.04 / 24.04 LTS ou Debian (X11, WebKitGTK 4.1, MPRIS D-Bus)',
    highlights: [
      'Integração nativa com players de mídia via D-Bus MPRIS e bandeja AppIndicator',
      'Autostart seguindo o padrão XDG (~/.config/autostart/pc-remote-desktop.desktop)',
      '105 testes Rust + 32 repetições XTEST validados em ambiente isolado',
    ],
  },
};

export const LINUX_BUILD_COMMAND = `git clone https://github.com/danielharrisonlf/pc-remote-desktop.git && cd pc-remote-desktop && npm ci && npm run tauri build -- --bundles deb,appimage`;

export const WINDOWS_FIREWALL_COMMAND = `New-NetFirewallRule -DisplayName 'PC Remote LAN' -Direction Inbound -Action Allow -Protocol TCP -LocalPort 43127 -Profile Private -RemoteAddress LocalSubnet`;

export interface ComparisonRow {
  criterion: string;
  description: string;
  pcRemote: {
    label: string;
    detail: string;
    status: 'best';
  };
  teamViewerAnyDesk: {
    label: string;
    detail: string;
    status: 'bad' | 'warn' | 'neutral';
  };
  unifiedRemote: {
    label: string;
    detail: string;
    status: 'bad' | 'warn' | 'neutral';
  };
  msPhoneLink: {
    label: string;
    detail: string;
    status: 'bad' | 'warn' | 'neutral';
  };
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    criterion: 'Arquitetura 100% Local (LAN)',
    description: 'Operação direta via Wi-Fi local sem depender de servidores intermediários.',
    pcRemote: {
      label: 'Sim (Funciona sem Internet)',
      detail: 'Conexão direta TCP 43127 na sub-rede local',
      status: 'best',
    },
    teamViewerAnyDesk: {
      label: 'Foco em internet; LAN pode ser direta',
      detail: 'ID/encontro online; pode usar retransmissão',
      status: 'warn',
    },
    unifiedRemote: {
      label: 'Sim (rede local)',
      detail: 'Conexão direta ao servidor na LAN',
      status: 'neutral',
    },
    msPhoneLink: {
      label: 'Wi-Fi local + conta Microsoft',
      detail: 'Os dois dispositivos precisam estar na mesma rede',
      status: 'warn',
    },
  },
  {
    criterion: 'Exige Criação de Conta?',
    description: 'Necessidade de e-mail, cadastro ou login para parear seus próprios aparelhos.',
    pcRemote: {
      label: 'Zero Contas',
      detail: 'Pareamento direto em 30 segundos',
      status: 'best',
    },
    teamViewerAnyDesk: {
      label: 'Opcional para sessões diretas',
      detail: 'Conta adiciona gestão de dispositivos e recursos',
      status: 'neutral',
    },
    unifiedRemote: {
      label: 'Não para conexão local',
      detail: 'Conta necessária para acesso pela internet',
      status: 'neutral',
    },
    msPhoneLink: {
      label: 'Sim (conta Microsoft)',
      detail: 'A configuração usa a mesma conta nos aparelhos',
      status: 'bad',
    },
  },
  {
    criterion: 'Privacidade & Telemetria',
    description: 'Coleta de metadados, hábitos de uso, histórico de texto ou logs remotos.',
    pcRemote: {
      label: 'Zero Rastreamento / Sem Logs',
      detail: 'Digitação e clipboard trafegam apenas em RAM',
      status: 'best',
    },
    teamViewerAnyDesk: {
      label: 'Dados de sessão variam por serviço',
      detail: 'Políticas variam por produto, plano e configuração',
      status: 'neutral',
    },
    unifiedRemote: {
      label: 'Consulte a política de privacidade',
      detail: 'Sem fonte, não afirmamos coleta específica',
      status: 'neutral',
    },
    msPhoneLink: {
      label: 'Vinculado à conta Microsoft',
      detail: 'A sincronização usa a infraestrutura Microsoft',
      status: 'neutral',
    },
  },
  {
    criterion: 'Preço & Modelo de Cobrança',
    description: 'Custo real para usar todos os recursos sem bloqueios ou propagandas.',
    pcRemote: {
      label: '100% Gratuito & Open Source',
      detail: 'Todos os recursos liberados, sem anúncios',
      status: 'best',
    },
    teamViewerAnyDesk: {
      label: 'Planos pagos; uso pessoal gratuito varia',
      detail: 'Preços e limites dependem do produto e plano',
      status: 'neutral',
    },
    unifiedRemote: {
      label: 'Gratuito e pago',
      detail: 'Recursos Pro são vendidos à parte',
      status: 'neutral',
    },
    msPhoneLink: {
      label: 'Gratuito',
      detail: 'Incluso no Windows; código fechado',
      status: 'neutral',
    },
  },
  {
    criterion: 'Consumo de Memória (Desktop)',
    description: 'Impacto nos recursos da máquina enquanto aguarda conexões na bandeja.',
    pcRemote: {
      label: 'Extremamente Leve (~25-40 MB)',
      detail: 'Motor nativo em Rust + Tauri v2',
      status: 'best',
    },
    teamViewerAnyDesk: {
      label: 'Varia por plataforma e configuração',
      detail: 'Sem medição equivalente de RAM',
      status: 'neutral',
    },
    unifiedRemote: {
      label: 'Varia por plataforma',
      detail: 'Servidor local residente',
      status: 'neutral',
    },
    msPhoneLink: {
      label: 'Integrado ao Windows',
      detail: 'Uso varia por versão e configuração',
      status: 'neutral',
    },
  },
  {
    criterion: 'Pareamento Seguro com Verificação Visual',
    description: 'Proteção contra interceptação na rede local (Man-in-the-Middle).',
    pcRemote: {
      label: 'Código 8 dígitos + SAS Cores',
      detail: 'Faixa visual de 8 cores derivada de SHA-256',
      status: 'best',
    },
    teamViewerAnyDesk: {
      label: 'ID e permissões de acesso',
      detail: 'Mecanismo diferente; sem faixa SAS equivalente',
      status: 'neutral',
    },
    unifiedRemote: {
      label: 'Senha de acesso local',
      detail: 'Pareamento diferente; sem faixa SAS equivalente',
      status: 'neutral',
    },
    msPhoneLink: {
      label: 'QR e conta Microsoft',
      detail: 'Pareamento vinculado à conta Microsoft',
      status: 'neutral',
    },
  },
  {
    criterion: 'Botão de Pânico / Bloqueio Físico no PC',
    description: 'Capacidade de cortar imediatamente mouse, teclado e energia com 1 clique no PC.',
    pcRemote: {
      label: 'Sim ("Interromper" imediato)',
      detail: 'Trava persistente até você clicar em "Liberar"',
      status: 'best',
    },
    teamViewerAnyDesk: {
      label: 'Não',
      detail: 'Exige encerrar sessão ou fechar serviço',
      status: 'bad',
    },
    unifiedRemote: {
      label: 'Não',
      detail: 'Sem kill-switch dedicado de entrada',
      status: 'bad',
    },
    msPhoneLink: {
      label: 'Não',
      detail: 'Não possui controle nativo de touchpad/energia',
      status: 'bad',
    },
  },
  {
    criterion: 'Multiplataforma Desktop',
    description: 'Sistemas operacionais suportados pelo servidor desktop.',
    pcRemote: {
      label: 'Windows & Linux (Ubuntu)',
      detail: 'Suporte nativo Win32 APIs e X11/MPRIS',
      status: 'best',
    },
    teamViewerAnyDesk: {
      label: 'Windows / Mac / Linux',
      detail: 'Suporte multiplataforma comercial',
      status: 'neutral',
    },
    unifiedRemote: {
      label: 'Windows / Mac / Linux',
      detail: 'Suporte multiplataforma',
      status: 'neutral',
    },
    msPhoneLink: {
      label: 'Somente Windows',
      detail: 'Incompatível com distribuições Linux',
      status: 'bad',
    },
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  technicalNote?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'internet-required',
    question: 'Preciso de internet para usar?',
    answer:
      'Não. O PC Remote funciona 100% na sua rede local (Wi-Fi/LAN). Mesmo que o seu provedor de internet caia, desde que o computador e o celular estejam conectados ao mesmo roteador local, o touchpad, teclado, mídia, clipboard e envio de arquivos continuam operando com latência zero.',
    technicalNote: 'Protocolo v1 sobre TLS direto na sub-rede privada • Descoberta opcional via mDNS (UDP 5353).',
  },
  {
    id: 'network-access',
    question: 'O aplicativo tem acesso a toda a minha rede?',
    answer:
      'O controle do PC Remote aceita conexões autenticadas na rede local pela porta TCP 43127. A descoberta automática pode usar mDNS na UDP 5353. O app não configura UPnP nem abre portas no roteador; no Windows, recomendamos autorizar apenas o perfil de Rede Privada.',
    technicalNote: 'Isolado na porta TCP 43127 • Sem comunicação com servidores externos.',
  },
  {
    id: 'security-risk',
    question: 'Existe risco de alguém invadir meu PC?',
    answer:
      'O pareamento exige aprovação no computador e apresenta um código temporário de 8 dígitos junto a uma faixa de 8 cores derivada do SHA-256 do certificado TLS. Compare as cores nos dois aparelhos antes de aprovar. Isso reduz riscos de pareamento indevido, mas nenhum software conectado à rede pode garantir risco zero. O botão Interromper desarma mouse, teclado e energia pelo celular.',
    technicalNote: 'Chaves TLS protegidas por Windows DPAPI • Sem endpoint de terminal/shell remoto.',
  },
  {
    id: 'why-better-teamviewer',
    question: 'Por que é melhor que usar o TeamViewer ou AnyDesk?',
    answer:
      'O PC Remote foi feito para controlar mouse, teclado, mídia e arquivos do seu computador na rede local, sem transmitir a tela ou depender de serviço externo durante o controle. TeamViewer e AnyDesk são voltados a suporte remoto e oferecem recursos pela internet; contas e planos variam conforme o uso. Escolha o PC Remote quando quiser controle local, leve e gratuito.',
    technicalNote: 'Zero popups comerciais • Zero limite de tempo • Código aberto auditável.',
  },
  {
    id: 'file-transfer-safety',
    question: 'Como funciona a segurança na transferência de arquivos de até 1 GB?',
    answer:
      'Os arquivos são transmitidos em blocos de 64 KiB usando um ticket de uso único por envio, mantendo o consumo de memória baixo e constante. Antes de salvar em Downloads/PC Remote, o hash SHA-256 completo é verificado. No Windows, arquivos recebidos recebem a marcação Mark-of-the-Web (SmartScreen) e extensões perigosas que executam apenas ao abrir pastas (.lnk, .url, .scf, .library-ms, desktop.ini) são bloqueadas automaticamente.',
    technicalNote: 'Blocos de 64 KiB • SHA-256 verificado ponta a ponta • Proteção SmartScreen ativa.',
  },
  {
    id: 'linux-support',
    question: 'O PC Remote funciona no Linux além do Windows?',
    answer:
      'Sim! A versão 0.6.4 suporta Ubuntu 22.04 e 24.04 LTS (sessão X11), oferecendo pacotes .deb e AppImage. No Linux, o controle de mídia se integra nativamente ao D-Bus MPRIS, o ícone opera na bandeja do sistema via AppIndicator e a inicialização automática segue a especificação XDG.',
    technicalNote: 'Validado com 105 testes unitários Rust e 32 baterias de sincronização XTEST.',
  },
];
