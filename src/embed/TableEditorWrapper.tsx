import React from 'react'
import _ from 'lodash'
import { IEmbeddedElementProps } from './EmbeddedElement';
import { Schema, Entity } from "@alephdata/followthemoney";

import { EntityManager } from 'components/common'
import { TableEditor } from 'components/TableEditor';

interface ITableEditorState {
  activeSchema: string
  selection: Array<string>
}

export default class TableEditorWrapper extends React.Component <IEmbeddedElementProps, ITableEditorState> {
  private entityManager: EntityManager

  constructor(props: IEmbeddedElementProps) {
    super(props)

    console.log('props are', props)
    let activeSchema;

    if (props.data) {
      const schemata = props.data.entities?.map((entity: Entity) => entity.schema);
      // const schemata = Array.from(new Set(schemataNames))
      //   .map(schemaName => entityManager.model.getSchema(schemaName))
        // .filter((schema: Schema) => !schema.isEdge)


      console.log('schemata are', schemata)
        // .sort((a: Schema, b: Schema) => a.label.localeCompare(b.label));



      activeSchema = schemata?.[0] || 'Person';

      const entities = props.data?.entities || props.data?.layout?.entities;

      this.entityManager = EntityManager.fromJSON({}, entities);

    } else {
      this.entityManager = new EntityManager();
    }

    this.state = {
      selection: [],
      activeSchema
    }

    this.updateSelection = this.updateSelection.bind(this)
  }

  updateSelection(entityId: string) {
    const { selection } = this.state;
    this.setState({
      selection: _.xorBy(selection, [entityId], 'id'),
    });
  }

  // updateLayout(layout: GraphLayout, historyModified = false) {
  //   this.setState({'layout': layout})
  //
  //   if (this.props.config?.writeable && historyModified) {
  //     this.saveToLocalStorage({ layout });
  //   }
  // }
  //
  // updateViewport(viewport: Viewport) {
  //   this.setState({'viewport': viewport})
  //   if (this.props.config?.writeable) {
  //     this.saveToLocalStorage({ viewport });
  //   }
  // }
  //
  // saveToLocalStorage({ entityManager, layout, viewport }: { entityManager?: EntityManager, layout?: GraphLayout, viewport?: Viewport }) {
  //   const graphData = JSON.stringify({
  //     entities: entityManager ? entityManager.toJSON() : this.state.entityManager.toJSON(),
  //     layout: layout ? layout.toJSON() : this.state.layout.toJSON(),
  //     viewport: viewport ? viewport.toJSON() : this.state.viewport.toJSON()
  //   })
  //   localStorage.setItem('storedGraphData', graphData)
  // }

  render() {
    const { config } = this.props;
    const { activeSchema, selection } = this.state;

    const writeable = config?.writeable !== undefined ? config.writeable : true;

    return (
      <TableEditor
        schema={this.entityManager.model.getSchema(activeSchema)}
        entityManager={this.entityManager}
        sort={null}
        sortColumn={() => {}}
        selection={selection}
        updateSelection={this.updateSelection}
        writeable={writeable}
      />
    )
  }
}
