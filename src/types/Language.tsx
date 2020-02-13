import React from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import {wordList} from "../utils";

const messages = defineMessages({
  unknown: {
    id: 'editor.language.unknown',
    defaultMessage: 'Unknown',
  },
});

interface ILanguageNameProps extends WrappedComponentProps {
  code:string
  languages: Map<string, string>
}

export class LanguageNameBase extends React.PureComponent<ILanguageNameProps> {
  render() {
    const { code, intl, languages } = this.props;
    const codeLabel = code ? code.toUpperCase() : intl.formatMessage(messages.unknown);
    const label = languages.get(code) || codeLabel;

    if (!code) return null;
    return label;
  }
}

export const LanguageName = injectIntl(LanguageNameBase);


interface ILanguageListProps {
  codes:string[],
  languages:Map<string, string>
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
