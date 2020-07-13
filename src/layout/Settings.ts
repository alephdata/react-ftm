
export interface ISettingsProps {
  pivotTypes: Array<string>
}

export class Settings {
  public pivotTypes: Array<string>

  constructor(props?: ISettingsProps) {
    this.pivotTypes = props?.pivotTypes || ['entity']
  }

  hasPivotType(type: string) {
    return this.pivotTypes.includes(type);
  }

  toJSON() {
    return ({
      pivotTypes: this.pivotTypes
    })
  }

  static fromJSON(props: ISettingsProps): Settings {
    return new Settings(props);
  }
}
