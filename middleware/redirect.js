import redirects from '../static/redirects.json'
export default function (req, res, next) {
  const redirect = redirects.find((r) => r.link === req.url)
  if (redirect) {
    res.writeHead(301, { Location: redirect.redirect })
    res.end()
  } else {
    next()
  }
}
