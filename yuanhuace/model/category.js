import { Model } from '../../core/model/atom'

export class Category extends Model {
  static get cates () {
    return [
      { name: '相册', class: 'Album' },
      { name: '设计', class: 'Design' },
      { name: '动态', class: 'Event' }
    ]
  }
}
