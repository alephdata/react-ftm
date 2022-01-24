// setup file
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { IntlProvider } from 'react-intl';

configure({ adapter: new Adapter() });

const messages = require('./translations/translations.json'); // en-US.json
const defaultLocale = 'en';
const locale = defaultLocale;
const filtered_messages = {};
filtered_messages[locale] = messages[locale];

// eslint-disable-next-line no-undef
global.intl = (component) => {
    return (
        <IntlProvider
            locale={locale}
            defaultLocale={defaultLocale}
            messages={filtered_messages}
        >
            {React.cloneElement(component)}
        </IntlProvider>
    );
}