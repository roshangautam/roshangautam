"use strict";(self.webpackChunkroshan_gautam_blog=self.webpackChunkroshan_gautam_blog||[]).push([[678],{6558:function(e,t,n){n.r(t),n.d(t,{onInitialClientRender:function(){return s},onRouteUpdate:function(){return p}});var a=n(7294),r=n(1883),i=n(8771),c=n(8678),l=n(8183);t.default=e=>{var t;let{data:n,location:o}=e;const s=(null===(t=n.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",p=n.allMarkdownRemark.nodes;return 0===p.length?a.createElement(c.Z,{location:o,title:s},a.createElement(l.Z,{title:"Roshan Gautam"}),a.createElement(i.Z,null),a.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):a.createElement(c.Z,{location:o,title:s},a.createElement(l.Z,{title:"Roshan Gautam"}),a.createElement(i.Z,null),a.createElement("ol",{style:{listStyle:"none"}},p.map((e=>{const t=e.frontmatter.title||e.fields.slug;return a.createElement("li",{key:e.fields.slug},a.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},a.createElement("header",null,a.createElement("h2",null,a.createElement(r.Link,{to:e.fields.slug,itemProp:"url"},a.createElement("span",{itemProp:"headline"},t))),a.createElement("small",null,e.frontmatter.date)),a.createElement("section",null,a.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))))};let o=!1;const s=()=>{var e,t;o||(e='\n    var appInsights = window.appInsights || function (a) {\n        function b(a) { c[a] = function () { var b = arguments; c.queue.push(function () { c[a].apply(c, b) }) } } var c = { config: a }, d = document, e = window; setTimeout(function () { var b = d.createElement("script"); b.src = a.url || "https://az416426.vo.msecnd.net/scripts/a/ai.0.js", d.getElementsByTagName("script")[0].parentNode.appendChild(b) }); try { c.cookie = d.cookie } catch (a) { } c.queue = []; for (var f = ["Event", "Exception", "Metric", "PageView", "Trace", "Dependency"]; f.length;)b("track" + f.pop()); if (b("setAuthenticatedUserContext"), b("clearAuthenticatedUserContext"), b("startTrackEvent"), b("stopTrackEvent"), b("startTrackPage"), b("stopTrackPage"), b("flush"), !a.disableExceptionTracking) { f = "onerror", b("_" + f); var g = e[f]; e[f] = function (a, b, d, e, h) { var i = g && g(a, b, d, e, h); return !0 !== i && c["_" + f](a, b, d, e, h), i } } return c\n    }({\n        instrumentationKey: "35cc108f-453e-4683-86c0-0565439548d6"\n    });\n\n    window.appInsights = appInsights, appInsights.queue && 0 === appInsights.queue.length && appInsights.trackPageView();\n      ',(t=document.createElement("script")).type="text/javascript",t.innerText=e,document.getElementsByTagName("head")[0].appendChild(t),o=!0)},p=e=>{let{location:t,prevLocation:n}=e;window.appInsights.trackPageView()}}}]);
//# sourceMappingURL=component---src-pages-index-js-adb33db973fc1f9d7291.js.map