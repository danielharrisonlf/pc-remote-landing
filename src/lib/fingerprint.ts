/**
 * Exact SAS (Short Authentication String) visual fingerprint algorithm from
 * pc-remote-desktop/src/lib/fingerprint.ts and pc-remote-android.
 * Eight colors derived from SHA-256 bytes folded with XOR so both PC and Android
 * render the exact same 8-color verification strip during local LAN pairing.
 */

export function normalizeFingerprint(value: string): string {
  return value.replace(/[^a-fA-F0-9]/g, '').toUpperCase();
}

export function fingerprintGroups(value: string): string[] {
  const hex = normalizeFingerprint(value);
  const groups: string[] = [];
  for (let index = 0; index < hex.length; index += 4) {
    groups.push(hex.slice(index, index + 4));
  }
  return groups;
}

export function fingerprintShort(value: string): string {
  const groups = fingerprintGroups(value);
  if (groups.length <= 3) return groups.join(' ');
  return `${groups[0]} ${groups[1]} … ${groups[groups.length - 1]}`;
}

export function fingerprintSwatches(value: string): string[] {
  const hex = normalizeFingerprint(value);
  if (hex.length < 16) return [];
  const bytes: number[] = [];
  for (let index = 0; index + 1 < hex.length; index += 2) {
    bytes.push(parseInt(hex.slice(index, index + 2), 16));
  }
  const folded = new Array<number>(8).fill(0);
  bytes.forEach((byte, index) => {
    folded[index % 8] ^= byte;
  });
  return folded.map(byte => {
    const hue = Math.round((byte / 256) * 360);
    const lightness = 46 + (byte % 3) * 6;
    return `hsl(${hue}, 64%, ${lightness}%)`;
  });
}

export function formatPairCode(code: string): string {
  const digits = code.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 4)} ${digits.slice(4)}`;
}
