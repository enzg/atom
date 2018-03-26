import _ from 'lodash'
import { Album, Photo } from '../model/album'
import { Design, Article } from '../model/design'
import { Tag } from '../model/tag'

export const mockAlbum = (tag) => {
  const album = new Album()
  album.tag = tag
  album.title = Album.RandomName()
  album.cover = Album.RandomURL()
  album.likes = Album.RandomInt()
  album.views = Album.RandomInt()
  return album
}
export const mockAlbums = (count = 10, key) => {
  return _.map(new Array(count), () => {
    return mockAlbum(key)
  })
}
export const mockPhoto = (gid) => {
  const photo = new Photo()
  photo.gid = gid
  photo.desc = Photo.RandomName()
  photo.url = Photo.RandomURL()
  return photo
}
export const mockPhotos = (count = 10, key) => {
  return _.map(new Array(count), () => {
    return mockPhoto(key)
  })
}
export const mockArticle = (gid) => {
  const article = new Article()
  article.gid = gid
  article.url = Article.RandomURL()
  article.author = Article.RandomName()
  return article
}
export const mockArticles = (count = 10, key) => {
  return _.map(new Array(count), () => {
    return mockArticle(key)
  })
}
export const mockDesign = (tag) => {
  const design = new Design()
  design.tag = tag
  design.title = Design.RandomName()
  design.cover = Design.RandomURL()
  design.likes = Design.RandomInt()
  design.views = Design.RandomInt()
  return design
}
export const mockDesigns = (count = 10, key) => {
  return _.map(new Array(count), () => {
    return mockDesign(key)
  })
}
export const mockTag = (type) => {
  const tag = new Tag()
  tag.type = type
  tag.name = Tag.RandomName()
  return tag
}
export const mockTags = (count = 10, key) => {
  return _.map(new Array(count), () => {
    return mockTag(key)
  })
}
