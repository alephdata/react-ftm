import * as React from 'react'
import { EnumValue as TopicLabel, EnumValueList as TopicList } from "./EnumValue";

class Topic extends React.Component {
  static Label = TopicLabel;

  static List = TopicList;
}

export default Topic;
