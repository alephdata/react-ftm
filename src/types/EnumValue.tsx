import React from 'react';
import {wordList} from "../utils";


interface IEnumValueProps {
  code:string
  fullList:Map<string, string>
  short?:boolean
}

export class EnumValue extends React.PureComponent<IEnumValueProps> {
  render() {
    const { code, fullList, short = false } = this.props;
    const codeLabel = code ? code.toUpperCase() : '-';
    const label = short ? codeLabel : (fullList.get(code) || codeLabel);

    if (!code) return null;
    return label;
  }
}

interface IEnumValueListProps {
  codes:string[],
  truncate: number
  fullList:Map<string, string>
}

export class EnumValueList extends React.Component<IEnumValueListProps> {
  render() {
    const { codes, truncate = Infinity, ...props } = this.props;
    if (!codes) return null;

    let names:Array<any> = codes.map(code => (
      <EnumValue code={code} key={code} {...props} />
    ));

    // Truncate if too long
    if (names.length > truncate) {
      // Cut slightly deeper than requested, as the ellipsis takes space too.
      names = [...names.slice(0, truncate), '…'];
    }
    return wordList(names, ', ');
  }
}
