import { Property } from '../../src/followthemoney/property'
import { schemata } from './_schemata'

describe('ftm/Property class', () => {
  let property: Property
  beforeEach(() => {
    property = new Property(schemata.Thing.properties.address)
  })
  const requiredProperties = ['name', 'label', 'type']

  requiredProperties.forEach(propertyName => {
    it(`should have property ${propertyName}`, () => {
      expect(property).toHaveProperty(propertyName)
      expect(Reflect.get(property, propertyName)).not.toBeUndefined()
    })
  })
})
