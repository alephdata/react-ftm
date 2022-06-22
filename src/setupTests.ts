// setup file
import '@testing-library/jest-dom';
import { createIntl } from 'react-intl';
import messages from './translations/translations.json';

export const intl = createIntl({
  locale: 'en',
  messages: messages.en,
});
