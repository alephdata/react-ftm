import React from 'react';
import { IconRegistry } from '@alephdata/followthemoney';
import { Icon as BlueprintIcon } from '@blueprintjs/core';

// @ts-ignore
BlueprintIcon.prototype._render = BlueprintIcon.prototype.render;
// @ts-ignore
BlueprintIcon.prototype._renderSvgPaths = BlueprintIcon.prototype.renderSvgPaths;
Object.assign(BlueprintIcon.prototype, {
  isInternal(iconName:string) {
    return !!IconRegistry.getIcon(iconName);
  },
  render() {
    // @ts-ignore
    // this.props.iconSize = this.props.iconSize || BlueprintIcon.SIZE_STANDARD;
    // @ts-ignore
    if (this.isInternal(this.props.icon)) {
      Object.assign(BlueprintIcon, {
        SIZE_STANDARD: 25,
        SIZE_LARGE: 25,
      });
    }
    // @ts-ignore
    const renderedIcon = BlueprintIcon.prototype._render.apply(this);
    Object.assign(BlueprintIcon, {
      SIZE_STANDARD: 16,
      SIZE_LARGE: 20,
    });
    return renderedIcon;
  },
  renderSvgPaths: (pathsSize:number, iconName:string) => {
    const iconPaths = IconRegistry.getIcon(iconName);
    if (iconPaths) {
      return iconPaths.map(d => <path key={d} d={d} fillRule="evenodd" />);
      // @ts-ignore
    } return BlueprintIcon.prototype._renderSvgPaths(pathsSize, iconName);
  },
});

