import { PureComponent } from 'react';
import filesize from 'filesize';
import { ITypeProps } from "./common";


class FileSize extends PureComponent<ITypeProps> {
  render() {
    const { value } = this.props;
    if (!value) {
      return null;
    }
    return filesize(value, { round: 0 });
  }
}

export default FileSize;
