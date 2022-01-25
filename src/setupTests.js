// setup file
import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { intlShape, createIntl } from 'react-intl';

configure({ adapter: new Adapter() });

const messages = require('./translations/translations.json'); // en-US.json
const defaultLocale = 'en';
const locale = defaultLocale;
const filtered_messages = {};
filtered_messages[locale] = messages[locale];

const intl = createIntl({ locale: defaultLocale, messages: filtered_messages });

function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node) {
    return shallow(nodeWithIntlProp(node), { context: { intl } })
}

export function mountWithIntl(node) {
    return mount(nodeWithIntlProp(node), {
        context: { intl },
        childContextTypes: { intl: intlShape }
    });
}