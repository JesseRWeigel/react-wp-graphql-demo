import gql from 'graphql-tag'
import React, { Component } from 'react'
import { Query } from 'react-apollo'
import App from '../components/App'

class Home extends Component {
  render() {
    const PostsQuery = gql`
      {
        posts {
          edges {
            node {
              id
              slug
              title
              date
              content
            }
          }
        }
      }
    `
    return (
      <App>
        <Query query={PostsQuery}>
          {result => {
            if (result.loading) {
              return <h1>Loading</h1>
            }
            if (result.error) return <h3>{result.error}</h3>

            const { data } = result
            const posts = data.posts.edges

            return (
              <ul className="no-bullet">
                <li>
                  <h2>Posts</h2>
                </li>
                {posts.map(post => (
                  <li key={post.node.slug}>
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: post.node.title,
                      }}
                    />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: post.node.content,
                      }}
                    />
                  </li>
                ))}
              </ul>
            )
          }}
        </Query>
      </App>
    )
  }
}

export default Home
