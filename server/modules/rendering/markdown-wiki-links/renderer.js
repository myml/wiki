const mdWikiLinks = require("markdown-it-wikilinks");

// ------------------------------------
// Markdown - Wiki Links
// ------------------------------------

module.exports = {
  init(md, conf) {
    opt = {
      baseURL: conf.baseURL,
      relativeBaseURL: conf.relativeBaseURL,
      makeAllLinksAbsolute: conf.makeAllLinksAbsolute,
      uriSuffix: conf.uriSuffix
    };
    if (conf.encodeURI) {
      opt['postProcessPageName'] = v => {
        return encodeURI(v.trim());
      };
    }
    md.use(mdWikiLinks(opt), {});
  }
};
