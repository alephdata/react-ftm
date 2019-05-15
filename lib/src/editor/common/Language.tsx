import React from 'react';
import {wordList} from "../../utils";


interface ILangList{ [langName:string]:string }

interface ILanguageNameProps {
  code:string
  languages: ILangList
}

export class LanguageName extends React.PureComponent<ILanguageNameProps> {
  render() {
    const { code, languages } = this.props;
    const codeLabel = code ? code.toUpperCase() : 'Unknown';
    const label = languages[code] || codeLabel;

    if (!code) return null;
    return label;
  }
}


interface ILanguageListProps {
  codes:string[],
  languages:ILangList
}

export class LanguageList extends React.Component<ILanguageListProps> {
  render() {
    const { codes, languages } = this.props;
    if (!codes || codes.length === 0) {
      return null;
    }
    const names = codes.map(code => <LanguageName languages={languages} code={code} key={code} />);
    return wordList(names, ', ');
  }
}


