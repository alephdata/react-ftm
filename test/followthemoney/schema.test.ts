import { schemata } from './_schemata'
import Schema from '../../src/followthemoney/schema'
describe('ftm/Schema class', () => {
  /*`Schema`
   * `name`, `label`
   * `is_a`, `schemata`, `descendants`
   * `featured`, `sorted` (properties)
   * `isDocument`, `isThing`*/
  let schema: Schema
  beforeEach(() => {
    schema = new Schema(schemata.Airplane.name, schemata.Airplane)
  })
  const requiredProperties = ['name', 'label', 'schemata', 'featured', 'properties']
  requiredProperties.forEach(propertyName => {
    it(`should have property ${propertyName}`, () => {
      expect(schema).toHaveProperty(propertyName)
    })
  })
  describe('method isThing', () => {
    it('should exist', () => {
      expect(schema.isThing).toBeDefined()
    })
    it('should be a function', () => {
      expect(schema.isThing).toBeInstanceOf(Function)
    })
    it('should return true for things', () => {
      expect(schema.isThing()).toBe(true)
    })
    it('should return false for Intervals', () => {
      const theSchema = new Schema(schemata.Interval.name, schemata.Interval)
      expect(theSchema.isThing()).toBe(false)
    })
  })
  describe('method isDocument', () => {
    let document: Schema
    beforeEach(() => {
      document = new Schema(schemata.Audio.name, schemata.Audio)
    })
    it('should exist', () => {
      expect(document.isDocument).toBeDefined()
    })
    it('should be a function', () => {
      expect(document.isDocument).toBeInstanceOf(Function)
    })
    it('should return true for documents', () => {
      expect(document.isDocument()).toBe(true)
    })
    it('should return false for non-documents', () => {
      const nonDocument = new Schema(schemata.Interval.name, schemata.Interval)
      expect(nonDocument.isDocument()).toBe(false)
    })
  })
})
