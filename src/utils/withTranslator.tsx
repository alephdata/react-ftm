import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import translations from 'translations/translations.json';

export function withTranslator<T>(
  WrappedComponent: React.ComponentType<T>
) {
  const Component = class extends React.Component<any> {
    render() {
      const { locale, ...rest } = this.props;

      //  override arabic locale to marocan version
      // We want all dates and numbers in latin instead of default ar eastern digits
      const modifiedLocale = locale === "ar" ? "ar-ma" : locale;

      return (
        <IntlProvider
          locale={modifiedLocale}
          key={locale}
          messages={translations[locale]}
        >
          <WrappedComponent {...(rest as T)} />
        </IntlProvider>
      );
    }
  };

  return connect(mapStateToProps)(Component);
}

const mapStateToProps = (state: any, ownProps: any) => ({
  locale: ownProps.entityContext?.selectLocale(state) || "en",
});
