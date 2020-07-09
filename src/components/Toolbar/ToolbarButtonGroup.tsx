import * as React from 'react'
import {
  AnchorButton,
  Boundary,
  Button,
  ButtonGroup,
  Classes,
  Colors,
  Divider,
  InputGroup,
  Intent,
  Menu,
  OverflowList,
  Popover,
  Tooltip,
} from "@blueprintjs/core"
import { IToolbarButton, IToolbarButtonGroup } from './common';


interface IToolbarButtonGroupProps {
  buttonGroup: IToolbarButtonGroup
  visible: boolean
}

export class ToolbarButtonGroup extends React.PureComponent<IToolbarButtonGroupProps> {
  constructor(props: Readonly<IToolbarButtonGroupProps>) {
    super(props);
  }

  renderVisible(items: any) {
    return (
      <ButtonGroup
        className="ToolbarButtonGroup"
      >
        {items.map((config: any) => {
          const { disabled, helpText, icon, onClick, subItems } = config;
          if (subItems) {
            return (
              <Popover
                content={<Menu>{this.renderHidden(subItems)}</Menu>}
                position="bottom"
                popoverClassName="ToolbarButton__overflow-list"
                boundary="viewport"
                minimal
                interactionKind="hover"
              >
                <Button icon={icon} disabled={disabled} rightIcon="caret-down" />
              </Popover>
            );
          } else {
            return (
              <Tooltip content={helpText} key={icon} position="bottom" popoverClassName="ToolbarButton__button-tip" boundary="viewport">
                <AnchorButton icon={icon} onClick={onClick} disabled={disabled} />
              </Tooltip>
            );
          }
        })}
      </ButtonGroup>
    );
  }

  renderHidden(items: any) {
    return (
      items.map(({ disabled, helpText, icon, onClick, subItems }: any) => (
        <Menu.Item
          icon={icon}
          key={icon}
          onClick={onClick}
          text={helpText}
          disabled={disabled}
        >
          {subItems && this.renderHidden(subItems)}
        </Menu.Item>
      ))
    );
  }

  render() {
    const { buttonGroup, visible } = this.props

    if (visible) {
      return this.renderVisible(buttonGroup);
    } else {
      return this.renderHidden(buttonGroup);
    }
  }
}

export default ToolbarButtonGroup;
