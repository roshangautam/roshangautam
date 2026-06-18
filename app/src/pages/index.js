import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const TOPICS = ["mysql", "laravel", "bash", "gatsby", "ai-dev"]

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteDescription = data.site.siteMetadata?.description || ``
  const posts = data.allMarkdownRemark.nodes
  const status = (
    <>
      <b>~/posts</b> · {posts.length} files · utf-8
    </>
  )

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle} status={status}>
        <Seo title="Roshan Gautam" />
        <section className="wrap hero">
          <p className="line">
            <span className="pr">❯</span> ls -lt ~/posts
          </p>
          <p className="hero__about" id="about">
            No posts found. Add markdown to <b>content/blog</b>.
          </p>
        </section>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle} status={status}>
      <Seo title="Roshan Gautam" />

      <section className="wrap hero">
        <p className="line">
          <span className="pr">❯</span> whoami
        </p>
        <h1 className="hero__name">
          Roshan Gautam<span className="blink">_</span>
        </h1>
        <p className="line">
          <span className="pr">❯</span> cat about.txt
        </p>
        <p className="hero__about" id="about">
          {siteDescription}
        </p>
        <div className="hero__chips">
          {TOPICS.map(t => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="wrap listing">
        <p className="listing__cmd">
          <span className="pr">❯</span> ls -lt ~/posts{" "}
          <span className="dim"># {posts.length} entries, newest first</span>
        </p>
        <div className="listing__head" aria-hidden="true">
          <span>date</span>
          <span>title</span>
          <span>type</span>
        </div>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <Link
              to={post.fields.slug}
              className="row reveal"
              key={post.fields.slug}
              itemScope
              itemType="http://schema.org/Article"
            >
              <span className="row__date">{post.frontmatter.date}</span>
              <span className="row__main">
                <span className="row__title" itemProp="headline">
                  {title}
                </span>
                <span className="row__desc" itemProp="description">
                  {post.excerpt}
                </span>
              </span>
              <span className="row__ext">.md</span>
            </Link>
          )
        })}
      </section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
        }
      }
    }
  }
`
let injectedScript = false

export const onInitialClientRender = () => {
    function addJS(jsCode) {
        var s = document.createElement(`script`);
        s.type = `text/javascript`;
        s.innerText = jsCode;
        document.getElementsByTagName(`head`)[0].appendChild(s);
    }
    if (!injectedScript) {
        addJS(`
    var appInsights = window.appInsights || function (a) {
        function b(a) { c[a] = function () { var b = arguments; c.queue.push(function () { c[a].apply(c, b) }) } } var c = { config: a }, d = document, e = window; setTimeout(function () { var b = d.createElement("script"); b.src = a.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js", d.getElementsByTagName("script")[0].parentNode.appendChild(b) }); try { c.cookie = d.cookie } catch (a) { } c.queue = []; for (var f = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; f.length;)b("track" + f.pop()); if (b("setAuthenticatedUserContext"), b("clearAuthenticatedUserContext"), b("startTrackEvent"), b("stopTrackEvent"), b("startTrackPage"), b("stopTrackPage"), b("flush"), !a.disableExceptionTracking) { f = "onerror", b("_" + f); var g = e[f]; e[f] = function (a, b, d, e, h) { var i = g && g(a, b, d, e, h); return !0 !== i && c["_" + f](a, b, d, e, h), i } } return c
    }({
        instrumentationKey: "35cc108f-453e-4683-86c0-0565439548d6"
    });

    window.appInsights = appInsights, appInsights.queue && 0 === appInsights.queue.length && appInsights.trackPageView();
      `);
        injectedScript = true;
    }
}

export const onRouteUpdate = ({ location, prevLocation }) => {
    window.appInsights.trackPageView();
}