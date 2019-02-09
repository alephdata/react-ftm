import * as EntitySet from '../../src/followthemoney/entity'
import { Schema } from '../../src/followthemoney/schema'
import { schemata } from './_schemata'
import { PropertyValue } from '../../src/followthemoney'

const entityDatum = {
  id: 'ade69374e3f57d2dfed29ca456e4f4105e9537fe',
  schema: 'Ownership',
  properties: {
    owner: ['fa02de2d07a1062c7da8187e831010086de8c377'],
    asset: ['251e80661ad58a75f0048c629e101d1fca99e7ed'],
    role: ['Indirect Ownership']
  }
}
describe('ftm/Entity class', () => {
  describe('method `getProperty`', () => {
    it('should exist', function() {
      expect(EntitySet).toHaveProperty('Entity')
    })
    it('should return a ProperyValue', function() {
      const entity = new EntitySet.Entity(
        new Schema(entityDatum.schema, schemata[entityDatum.schema]),
        entityDatum
      )

      expect(entity.getProperty('owner')).toBeInstanceOf(PropertyValue)
    })
  })
})
