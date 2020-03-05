import React from 'react';
import { IntlProvider } from 'react-intl';
import translations from './translations/translations.json';

export function withTranslator<T>(
  WrappedComponent: React.ComponentType<T>
) {
  return class extends React.Component<any> {
    render() {
      const { locale, ...rest } = this.props;

      return (
        <IntlProvider
          locale={locale || "en"}
          key={locale || "en"}
          messages={translations[locale || "en"]}
        >
          <WrappedComponent {...(rest as T)} />
        </IntlProvider>
      );
    }
  };
}
