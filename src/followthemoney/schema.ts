// @ts-ignore
import { Property } from './property.ts'
import { ILinkDatum } from '../core/Edge'

interface ILabelReadingConfiguration {
  forcePlural: boolean
}

export default class Schema {
  public readonly icon: string
  public properties: Map<string, Property> = new Map()
  readonly name: string
  private readonly label: string
  private readonly plural: string
  private readonly featured: Array<string>
  edge?: ILinkDatum
  schemata: string[]

  constructor(
    schemaName: string,
    theImplementation: {
      edge: ILinkDatum
      label: string
      plural: string
      icon: string
      featured: string[]
      schemata: string[]
      properties: any
    }
  ) {
    this.name = schemaName
    this.label = theImplementation.label
    this.plural = theImplementation.plural
    this.icon = theImplementation.icon
    this.featured = theImplementation.featured
    this.schemata = theImplementation.schemata
    Object.entries(theImplementation.properties).forEach(([propertyName, property]) => {
      this.properties.set(propertyName, new Property(propertyName, property, this))
    })

    if (theImplementation.edge.source && theImplementation.edge.target) {
      this.edge = theImplementation.edge
    }
  }
  getEdge(): ILinkDatum | undefined {
    return this.edge
  }
  // static hasSchemata(document, schemata: string[]): boolean {
  //     if (document) {
  //         return !!schemata.find(schema => !!~document.schemata.indexOf(schema))
  //     }
  //     return false;
  // }

  isThing(): boolean {
    // TBD
    return this.isA('Thing')
  }
  getLabel({ forcePlural }: ILabelReadingConfiguration) {
    let label = this.label || this.name
    if (forcePlural || this.plural) {
      label = this.plural || label
    }
    return label
  }

  // reverseLabel(reference) {
  //     if (!reference || !reference.property) {
  //         return null;
  //     }
  //     const prop = reference.property;
  //     const reverse = this.properties.get(prop.reverse) || prop;
  //     return reverse.label;
  // };

  // isFeaturedProp(propertyName) {
  //     return !!~this.featured.indexOf(propertyName)
  // }

  isDocument(): boolean {
    return this.isA('Document')
  }

  // getEntityProperties(entity: Schema): Property[] {
  //     return Object
  //         .keys(entity.properties)
  //         .filter((entityProperty) => {
  //             const property = this.properties.get(entityProperty);
  //             return !(property && property.caption)
  //         })
  //         .map(property => this.properties.get(property))
  // }

  getFeaturedProperties() {
    return this.featured.map(featuredPropertyName => this.properties.get(featuredPropertyName))
  }

  extends(schemaName: any): boolean {
    /*FIXME: Include parent schema name*/
    return !!Array.from(this.properties.values()).find((property: Property) =>
      property.extends(schemaName)
    )
  }

  hasProperty(name: string): boolean {
    return this.properties.has(name)
  }

  getProperty(name: string): Property {
    if (this.hasProperty(name)) {
      return this.properties.get(name) as Property
    } else {
      throw new Error('there is no such a property set')
    }
  }
  isA(schemaName: string) {
    return !!~this.schemata.indexOf(schemaName)
  }
}
