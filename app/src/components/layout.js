import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children, status }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const cwd = isRootPath ? `~` : `~/posts`
  const year = new Date().getFullYear()

  return (
    <div className="t-shell" data-is-root-path={isRootPath}>
      <header className="tnav">
        <div className="wrap tnav__row">
          <Link to="/" className="tnav__prompt">
            <b>roshangautam</b>@blog<span className="dim">:</span>
            {cwd}$
          </Link>
          <nav className="tnav__links" aria-label="Primary">
            <Link to="/">posts</Link>
            <Link to="/#about">about</Link>
            <a href="/rss.xml">rss</a>
            <a
              href="https://github.com/roshangautam"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="statusbar">
        <div className="wrap statusbar__row">
          <span className="seg">
            {status || (
              <>
                <b>~</b> · utf-8
              </>
            )}
          </span>
          <nav aria-label="Social">
            <a
              href="https://github.com/roshangautam"
              target="_blank"
              rel="noopener noreferrer"
            >
              github
            </a>
            <a
              href="https://twitter.com/roshangautam"
              target="_blank"
              rel="noopener noreferrer"
            >
              twitter
            </a>
            <a href="/rss.xml">rss</a>
          </nav>
          <span className="seg">© 2014–{year} roshan gautam</span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
