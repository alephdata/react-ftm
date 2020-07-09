export interface IToolbarButton {
  icon: string
  helpText: string
  disabled?: boolean
  writeableOnly?: boolean
  onClick?: () => void
  subItems?: IToolbarButtonGroup
}

export interface IToolbarButtonGroup = Array<IToolbarButton>
