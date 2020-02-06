import React from 'react';
import { IntlProvider } from 'react-intl';

import translations from 'src/translations/translations.json';

interface ITranslatorProps {
  locale?: string
}

class Translator extends React.PureComponent<ITranslatorProps> {
  render() {
    const { locale } = this.props;
    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={translations[locale]}
      >
      </IntlProvider>
    );
  }

}


export default Translator;
