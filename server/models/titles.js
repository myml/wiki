const Model = require('objection').Model
const _ = require('lodash')

/* global WIKI */

/**
 * Tags model
 */
module.exports = class Title extends Model {
  static get tableName() { return 'titles' }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['pageID', 'localeCode', 'localeTitle'],

      properties: {
        id: {type: 'integer'},
        pageID: {type: 'integer'},
        localeCode: {type: 'string'},
        localeTitle: {type: 'string'},
      }
    }
  }

  static async updateTitles ({ titles, id, title, locale }) {
    if(!titles || !titles.length){
      return
    }
    const pageID = WIKI.models.titles.query().select("pageID").where({localeCode: locale, localeTitle: title})
    await WIKI.models.titles.query().delete().where('pageID', pageID).orWhere('pageID', id)
    for(const title of titles){
      const r = { pageID: id, localeCode: title.localeCode, localeTitle: title.localeTitle }
      await WIKI.models.titles.query().insert(r)
    }
  }

  static async getTitleLocales({locale, title}) {
    const pageID = WIKI.models.titles.query().select("pageID").limit(1).where({localeCode: locale, localeTitle: title})
    return WIKI.models.titles.query().select("localeCode", "localeTitle").where('pageID', pageID)
  }
}