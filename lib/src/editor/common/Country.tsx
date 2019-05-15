import React, { Component, PureComponent } from 'react';
import { MenuItem, Classes, Position } from '@blueprintjs/core';
import { MultiSelect  } from '@blueprintjs/select';
import {wordList} from "../../utils";

import './Country.scss';

interface CountriesListItem {
  [countryCode:string]: string
}

interface ICountryNameProps {
  code:string
  countries:CountriesListItem
  short?:boolean
}
export class CountryName extends PureComponent<ICountryNameProps> {
  render() {
    const { code, countries, short = false } = this.props;
    const codeLabel = code ? code.toUpperCase() : "Unknown";
    const label = short ? codeLabel : (countries[code] || codeLabel);

    if (!code) return null;
    return label;
  }
}


interface ICountriesListProps {
  codes:string[],
  truncate: number
  countries:CountriesListItem
}

export class CountriesList extends Component<ICountriesListProps> {
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
