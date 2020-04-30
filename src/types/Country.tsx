import * as React from 'react'
import { EnumValue as CountryLabel, EnumValueList as CountryList } from "./EnumValue";

class Country extends React.Component {
  static Label = CountryLabel;

  static List = CountryList;
}

export default Country;
