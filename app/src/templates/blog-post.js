import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const slug = post.fields?.slug || `/`
  const filename = slug.replace(/\//g, ``) || `post`
  const description = post.frontmatter.description
  const words = post.wordCount?.words
  const status = (
    <>
      <b>{filename}.md</b> · {words} words · utf-8
    </>
  )

  return (
    <Layout location={location} title={siteTitle} status={status}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={post.frontmatter.coverImage}
      />
      <article
        className="wrap article"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className="article__inner">
          <Link to="/" className="back">
            <span className="pr">❯</span> cd ..
          </Link>
          <p className="article__cmd">
            <span className="pr">❯</span> cat {filename}.md
          </p>
          <h1 className="article__title" itemProp="headline">
            {post.frontmatter.title}
          </h1>
          <p className="article__meta">
            {post.frontmatter.date}
            {post.timeToRead ? (
              <>
                {" "}
                <span className="accent">·</span> read: {post.timeToRead} min
              </>
            ) : null}
          </p>
          {description ? <p className="lede">{description}</p> : null}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
          />
        </div>
      </article>

      <nav className="wrap article__nextprev" aria-label="Older and newer posts">
        {previous && (
          <Link to={previous.fields.slug} rel="prev" className="np np--prev">
            <span className="np__label">❮ prev</span>
            <span className="np__title">{previous.frontmatter.title}</span>
          </Link>
        )}
        {next && (
          <Link to={next.fields.slug} rel="next" className="np np--next">
            <span className="np__label">next ❯</span>
            <span className="np__title">{next.frontmatter.title}</span>
          </Link>
        )}
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      timeToRead
      wordCount {
        words
      }
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        description
        coverImage
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
