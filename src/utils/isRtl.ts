import _ from 'lodash'
import { defaultModel, Entity, Model } from '@alephdata/followthemoney';

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

export function isEntityRtl(entity: Entity, systemLang: string, customModel?: Model): boolean {
  const model = customModel || new Model(defaultModel);
  const entLangs = entity?.getTypeValues(model.types.language);

  if (!entLangs?.length) {
    return isLangRtl(systemLang);
  }

  const [rtl, ltr] = _.partition(entLangs, isLangRtl);

  if (rtl.length === 0) {
    return false;
  }
  if (ltr.length === 0) {
    return true;
  }
  return isLangRtl(systemLang);
}
