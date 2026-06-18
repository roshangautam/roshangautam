import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const status = (
    <>
      <b>404</b> · no such file or directory
    </>
  )

  return (
    <Layout location={location} title={siteTitle} status={status}>
      <Seo title="404: Not Found" />
      <section className="wrap hero">
        <p className="line">
          <span className="pr">❯</span> cat {location.pathname}
        </p>
        <h1 className="hero__name">404</h1>
        <p className="article__meta">
          bash: {location.pathname}: command not found
        </p>
        <p className="hero__about">
          That route doesn&#39;t exist. Try{" "}
          <Link to="/" className="accent">
            cd ~
          </Link>{" "}
          to get back home.
        </p>
        <p className="line" style={{ marginTop: `var(--space-lg)` }}>
          <span className="pr">❯</span>{" "}
          <Link to="/" className="accent">
            cd ~
          </Link>
        </p>
      </section>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
