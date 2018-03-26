import _ from 'lodash'
import AWS from 'aws-sdk'
import {Logger} from 'up'
import { Config } from './config'

AWS.config.update({region: Config.region})
class DB {
  constructor (action) {
    this.param = {}
    this.action = action
    this.mockData = {}
  }
  static async Store$ (action, param) {
    return AWS.DynamoDB.DocumentClient()[action](param)
      .promise()
      .catch(err => {
        Logger.error(err)
      })
  }
  mock (mock = {message: 'set some mock data!!'}) {
    this.mockData = mock
    return this
  }
  async run$ () {
    return (_.isEmpty(this.mockData) && !process.env.nodb)
      ? DB.Store$(this.action, this.param)
      : Promise.resolve(this.mockData)
  }
}
// Read SSM Params
export class SSM {
  static async CryptedParam$ (name) {
    return new AWS.SSM()
      .getParameter({ Name: name, WithDecryption: true })
      .promise()
      .then(ret => ret.Parameter.Value)
  }
}
export class Query extends DB {
  constructor () {
    super('query')
  }
  static get Instance () {
    return new Query()
  }
  static From (name) {
    const q = Query.Instance
    q.param['TableName'] = name
    return q
  }
  desc () {
    this.param['ScanIndexForward'] = false
    return this
  }
  asc () {
    this.param['ScanIndexForward'] = true
    return this
  }
  index (index) {
    this.param['IndexName'] = index
    return this
  }
  where (query) {
    this.param['KeyConditionExpression'] = query
    return this
  }
  filter (filter) {
    this.param['FilterExpression'] = filter
    return this
  }
  limit (number) {
    this.param['Limit'] = number
    return this
  }
  select (attrs = '*') {
    if (_.isEqual(attrs, '*')) {
      return this
    }
    this.param['ProjectionExpression'] = attrs
    return this
  }
  prepare (props) {
    this.param['ExpressionAttributeValues'] = props
    return this
  }
}
export class PutItem extends DB {
  constructor () {
    super('put')
  }
  static get Instance () {
    return new PutItem()
  }
  static From (name) {
    const p = PutItem.Instance
    p.param['TableName'] = name
    return p
  }
  insert (item) {
    this.param['Item'] = item
    return this
  }
}
export class BatchWrite extends DB {
  constructor () {
    super('batchWrite')
  }
  static get Instance () {
    return new BatchWrite()
  }
  static SetBatch (batch) {
    const b = BatchWrite.Instance
    b.param = batch
    return b
  }
}
