import _ from 'lodash'
import uuid from 'uuid/v4'
import { Response } from '../net/io'
import crypto from 'crypto'
export class Atom {
  constructor () {
    this.constructor.Instance(this)
  }
  static SignPass (password, pubKey) {
    const cipher = crypto.createCipher('aes192', pubKey)
    return `${cipher.update(password, 'utf8', 'hex')}${cipher.final('hex')}`
  }
  static TimeStampFormatter (mill) {
    const date = new Date(mill)
    const timeZone = { 'timeZone': 'Asia/Shanghai' }
    return `${date.toLocaleDateString('zh-CN', timeZone)} ${date.toLocaleTimeString('zh-CN', timeZone)}`
  }
  static get schema () {
    return {}
  }
  static get DEFAULT_STRING () {
    return 'NULL!'
  }
  static get DEFAULT_NUMBER () {
    return 0
  }
  static get DEFAULT_ARRAY () {
    return []
  }
  static get DEFAULT_OBJECT () {
    return {}
  }
  static get BOOL_FALSE () {
    return false
  }
  static get BOOL_TRUE () {
    return true
  }
  static get schemaTypes () {
    return {
      'string-uuid': uuid(),
      'string': Atom.DEFAULT_STRING,
      'number': Atom.DEFAULT_NUMBER,
      'array': Atom.DEFAULT_ARRAY,
      'object': Atom.DEFAULT_OBJECT,
      'bool-true': Atom.BOOL_TRUE,
      'bool-false': Atom.BOOL_FALSE

    }
  }
  static Instance (proto) {
    return _.assign(proto, proto.constructor.meta(proto.constructor.schema, proto))
  }
  static meta (attries, proto) {
    const baseTypes = Atom.schemaTypes
    const instanceTypes = proto.constructor.schemaTypes || {}
    const Types = {
      ...baseTypes,
      ...instanceTypes
    }
    return _.reduce(attries, (result, value, key) => {
      result[key] = Types[value]
      return result
    }, {})
  }
}
export class Payload extends Atom {
}

export class Model extends Atom {
  constructor () {
    super()
    this.createdAt = Date.now()
    this.updatedAt = Date.now()
  }
  static get TableName () {
    return 'Model_core'
  }
  static RandomInt (range = 1000) {
    return parseInt(Math.random() * 1000) % range
  }
  static RandomURL (ext = 'jpg') {
    return `http://image.${parseInt(Math.random() * 10000)}.com/${parseInt(Math.random() * 10000)}.jpg`
  }
  static RandomName () {
    const noun = ['神仙', '小姐', '美国', '土肥圆', '悟空', '八戒', '变态', '脚本', '总统', '红衣女', '少年', '少女', '女神']
    const verb = ['踢', '喜欢上', '翻', '念经', '打', '变大', '思念', '讨厌', '骑', '磴']
    const guest = [ '大叔', '萝莉', '白骨精', '老诗', '白眼', '老爷' ]
    return `${noun[(Date.now() + parseInt(Math.random() * 1000)) % noun.length]}${verb[(Date.now() + parseInt(Math.random() * 1000)) % verb.length]}${guest[(Date.now() + parseInt(Math.random() * 1000)) % guest.length]}`
  }
  static Modelize (...props) {
    const proto = new this()
    const deta = _.reduce(props, (o, i) => {
      return Object.assign(o, _.pick(i, Object.keys(proto)))
    }, {})
    return Object.assign(proto, deta)
  }
  static async Query$ (props) {
    return Promise.resolve([])
  }
  static async Save$ (props) {
    console.log('save', props, 'success')
    return Promise.resolve(props)
  }
  static mock () {
    return this
  }
  formatDate () {
    this.createdDate = Atom.TimeStampFormatter(this.createdAt)
    return this
  }
}
export class Resource {
  static Show () {
    return async ctx => {
      ctx.body = Response.Ok({})
    }
  }
  static List () {
    return async ctx => {
      ctx.body = Response.Ok({})
    }
  }
  static Add () {
    return async ctx => {
      ctx.body = Response.Ok({message: 'add success'})
    }
  }
  static Edit () {
    return async ctx => {
      ctx.body = Response.Ok({message: 'edit success'})
    }
  }
  static Delete () {
    return async ctx => {
      ctx.body = Response.Ok({message: 'delete success'})
    }
  }
}
