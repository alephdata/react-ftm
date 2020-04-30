import * as React from 'react'
import { EnumValue as LanguageLabel, EnumValueList as LanguageList } from "./EnumValue";

class Language extends React.Component {
  static Label = LanguageLabel;

  static List = LanguageList;
}

export default Language;
