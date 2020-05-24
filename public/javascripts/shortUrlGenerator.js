const Url = require('../../models/URL')

function generate() {
  const shortUrl = Math.random().toString(36).slice(-5)
  const regex = /[0-9]/
  Url.findOne({ sUrl: `${shortUrl}` })
    .lean()
    .then((item) => {
      if (item) return generate()
    })
  if (shortUrl.match(regex)) return shortUrl
  return generate()
}

module.exports = generate
