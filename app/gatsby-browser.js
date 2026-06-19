// JetBrains Mono — the single typeface for the Terminal design system.
// Weights: 400 (body) · 500 (titles) · 700 (headings) · 800 (display) · 400 italic (emphasis).
import "@fontsource/jetbrains-mono/400.css"
import "@fontsource/jetbrains-mono/500.css"
import "@fontsource/jetbrains-mono/700.css"
import "@fontsource/jetbrains-mono/800.css"
import "@fontsource/jetbrains-mono/400-italic.css"

// normalize CSS across browsers
import "./src/normalize.css"

// Syntax highlighting for fenced code blocks (dark theme, restyled in style.css)
import "prismjs/themes/prism-tomorrow.css"

// custom CSS styles
import "./src/style.css"

import { ApplicationInsights } from "@microsoft/applicationinsights-web"

// Azure Application Insights browser telemetry. These lifecycle exports only run
// when defined in gatsby-browser.js — Gatsby ignores them from page components.
//
// The connection string (not a bare instrumentation key) is required: this
// resource is workspace-based (LogAnalytics ingestion), so the SDK must post to
// the regional IngestionEndpoint carried by the connection string. A v1 snippet
// using only the instrumentation key posts to the legacy global endpoint and is
// rejected with "Invalid workspace".
const AI_CONNECTION_STRING = process.env.GATSBY_APPINSIGHTS_CONNECTION_STRING

let appInsights

export const onClientEntry = () => {
  if (process.env.NODE_ENV !== "production") return
  if (!AI_CONNECTION_STRING) return
  appInsights = new ApplicationInsights({
    config: {
      connectionString: AI_CONNECTION_STRING,
      enableAutoRouteTracking: false,
    },
  })
  appInsights.loadAppInsights()
  appInsights.trackPageView()
}

// Track client-side route changes. The initial pageview is tracked above on
// load, so skip the first render (prevLocation is null) to avoid double-counting.
export const onRouteUpdate = ({ prevLocation }) => {
  if (prevLocation && appInsights) {
    appInsights.trackPageView()
  }
}
