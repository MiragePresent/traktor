import gql from 'graphql-tag'

export const FETCH_POSTS = gql`
    query fetchPostsQuery (
        $id: Int, 
        $title: String, 
        $slug: String,
        $limit: Int,
        $offset: Int
    ) {
        posts (
            id: $id,
            slug: $slug,
            title: $title,
            limit: $limit,
            offset: $offset
        ) {
            id
            slug
            title
            preview
            content,
            author {
                name
            }
        }
    }
`

export const FETCH_AUTHORS = gql`
    query fetchAuthors (
        $id: Int,
        $name: String
    ) {
        authors (
            id: $id,
            name: $name
        ) {
            id
            name
        }
    }
`

export const ADD_POST = gql`
    mutation AddPostMutation(
        $authorId: Int!,
        $title: String!,
        $content: String!
        $slug: String,
        $preview: String
    ) {
        createPost(
            authorId: $authorId,
            title: $title, 
            content: $content,
            slug: $slug,
            preview: $preview
        ) {
            id
            slug
            title
            preview
            content
            author {
                name
            }
        }
    }
`
