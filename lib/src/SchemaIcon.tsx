import * as React from 'react'
import { Schema, IconRegistry } from '@alephdata/followthemoney';

export class SchemaIcon {
  static get(schema: Schema, size: number = 16) {
    const iconPaths = IconRegistry.getSchemaIcon(schema);
    return (
      <svg viewBox={'0 0 24 24'} height={size} width={size}>
        {iconPaths.map((d, i) => <path key={i} d={d}/>)}/>
      </svg>
    );
  }
}
