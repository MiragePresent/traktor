import BaseModel from './BaseModel'
import { POSTS_QUERY } from '../graphql/shema'

export default class Post extends BaseModel {
  fields () {
    return Object.assign(super.fields(), {
      id: null,
      authorId: null,
      slug: null,
      title: null,
      preview: null,
      content: null
    })
  }

  query () {
    return POSTS_QUERY
  }
}
