import React from 'react';
import { IntlProvider } from 'react-intl';

import translations from './translations/translations.json';

interface ITranslatorProps {
  locale?: string
  children: any
}

class Translator extends React.PureComponent<ITranslatorProps> {
  render() {
    const locale = this.props.locale || "en";

    return (
      <IntlProvider
        locale={locale}
        key={locale}
        messages={translations[locale]}
      >
        {this.props.children}
      </IntlProvider>
    );
  }

}


export default Translator;
