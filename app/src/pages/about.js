import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const SITE_TITLE = `Reveries of a software engineer`
const SECTION_COUNT = 7

const contactHref = (key, value) => {
  if (key === "email") {
    return `mailto:${value}`
  }

  return `https://${value.replace(/^https?:\/\//, "")}`
}

const AboutPage = ({ location }) => {
  const [about, setAbout] = React.useState(null)
  const [error, setError] = React.useState(false)
  const sectionCount = about && !error ? SECTION_COUNT : 0
  const status = (
    <>
      <b>~/about</b> · {sectionCount} sections · utf-8
    </>
  )

  React.useEffect(() => {
    let mounted = true

    fetch("/api/about")
      .then(res => {
        if (!res.ok) {
          throw new Error("Could not load about data")
        }

        return res.json()
      })
      .then(data => {
        if (mounted) {
          setAbout(data)
        }
      })
      .catch(() => {
        if (mounted) {
          setError(true)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  if (error) {
    return (
      <Layout location={location} title={SITE_TITLE} status={status}>
        <Seo title="About" />
        <section className="wrap hero">
          <p className="line">
            <span className="pr">❯</span> cat about.json
          </p>
          <p className="line dim">cat: about.json: could not load</p>
        </section>
      </Layout>
    )
  }

  if (!about) {
    return (
      <Layout location={location} title={SITE_TITLE} status={status}>
        <Seo title="About" />
        <section className="wrap hero">
          <p className="line about-loading">
            <span className="pr">❯</span> cat about.json
            <span className="blink">_</span>
          </p>
        </section>
      </Layout>
    )
  }

  const experience = about.experience || []
  const projects = about.projects || []
  const skills = about.skills || {}
  const contact = about.contact || {}
  const education = about.education || []
  const certifications = about.certifications || []
  const skillRows = ["languages", "systems", "platforms", "leadership"]
  const contactRows = ["email", "github", "linkedin", "twitter"]

  return (
    <Layout location={location} title={SITE_TITLE} status={status}>
      <Seo title="About" />

      <section className="wrap hero reveal">
        <p className="line">
          <span className="pr">❯</span> whoami
        </p>
        <h1 className="hero__name">
          Roshan Gautam<span className="blink">_</span>
        </h1>
        <p className="line">
          <span className="pr">❯</span> cat about.txt
        </p>
        <p className="hero__about">{about.bio}</p>
      </section>

      <section className="wrap reveal">
        <p className="line">
          <span className="pr">❯</span> cat experience.log
        </p>
        <div className="log">
          {experience.map(item => (
            <div key={`${item.period}-${item.org}-${item.role}`}>
              <span>{item.period}</span>
              <span>
                <b>
                  {item.org} · {item.role}
                </b>
                {item.note ? <span>{item.note}</span> : null}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap listing reveal">
        <p className="line">
          <span className="pr">❯</span> ls -lt ~/projects
        </p>
        <div className="listing__head" aria-hidden="true">
          <span>stars</span>
          <span>name</span>
          <span>lang</span>
        </div>
        {projects.map(project => (
          <a
            href={project.url}
            className="row reveal"
            key={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="row__date">
              {project.stars > 0 ? `★${project.stars}` : ``}
            </span>
            <span className="row__main">
              <span className="row__title">{project.name}</span>
              <span className="row__desc">{project.desc}</span>
            </span>
            <span className="row__ext">{project.lang}</span>
          </a>
        ))}
      </section>

      <section className="wrap reveal">
        <p className="line">
          <span className="pr">❯</span> cat skills.txt
        </p>
        <div className="kv">
          {skillRows.map(key => (
            <div key={key}>
              <span>{key}</span>
              <span>{skills[key]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap reveal">
        <p className="line">
          <span className="pr">❯</span> cat contact.txt
        </p>
        <div className="kv">
          {contactRows.map(key => (
            <div key={key}>
              <span>{key}</span>
              <span>
                {contact[key] ? (
                  <a
                    href={contactHref(key, contact[key])}
                    target={key === "email" ? undefined : "_blank"}
                    rel={key === "email" ? undefined : "noopener noreferrer"}
                  >
                    {contact[key]}
                  </a>
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap reveal">
        <p className="line">
          <span className="pr">❯</span> cat education.txt
        </p>
        <div className="kv">
          {education.map(item => (
            <div key={`${item.year}-${item.degree}`}>
              <span>{item.year}</span>
              <span>
                {item.degree} · {item.org}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap reveal">
        <p className="line">
          <span className="pr">❯</span> cat certs.txt
        </p>
        <p className="line">{certifications.join(" · ")}</p>
      </section>
    </Layout>
  )
}

export default AboutPage
