import { Colors } from '@blueprintjs/core';
import { Point } from './layout/Point';


export interface IGraphLogo {
  text?: string,
  image?: string,
}

export class GraphLogo {
  public text?: string;
  public image?: string;

  constructor(props: IGraphLogo) {
    this.text = props.text;
    this.image = props.image;
  }
}
