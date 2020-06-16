const rtlLangs = [
  'ara',
  'ar',
  'heb',
  'he',
  'ur',
  'urd',
  'fa',
  'fas',
  'per',
  'ps',
  'pus',
];

export function isLangRtl(langCode: string): boolean {
  return rtlLangs.includes(langCode);
}
