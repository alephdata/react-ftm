import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import {wordList} from "../utils";

const messages = defineMessages({
  unknown: {
    id: 'editor.country.unknown',
    defaultMessage: 'Unknown',
  },
});

interface ICountryNameProps extends WrappedComponentProps {
  code:string
  countries:Map<string, string>
  short?:boolean
}

class CountryNameBase extends React.PureComponent<ICountryNameProps> {
  render() {
    const { code, countries, intl, short = false } = this.props;
    const codeLabel = code ? code.toUpperCase() : intl.formatMessage(messages.unknown);
    const label = short ? codeLabel : (countries.get(code) || codeLabel);

    if (!code) return null;
    return label;
  }
}

export const CountryName = injectIntl(CountryNameBase);


interface ICountriesListProps {
  codes:string[],
  truncate: number
  countries:Map<string, string>
}

export class CountriesList extends React.Component<ICountriesListProps> {
  render() {
    const { codes, truncate = Infinity, ...props } = this.props;
    if (!codes) return null;

    let names:Array<any> = codes.map(code => (
      <CountryName code={code} key={code} {...props} />
    ));

    // Truncate if too long
    if (names.length > truncate) {
      // Cut slightly deeper than requested, as the ellipsis takes space too.
      names = [...names.slice(0, truncate), '…'];
    }
    return wordList(names, ', ');
  }
}
