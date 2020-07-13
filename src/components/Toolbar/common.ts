export interface IToolbarButton {
  icon: string
  helpText: string
  disabled?: boolean
  writeableOnly?: boolean
  onClick?: (e?: any) => void
  subItems?: Array<IToolbarButton>
}

export type IToolbarButtonGroup = Array<IToolbarButton>
