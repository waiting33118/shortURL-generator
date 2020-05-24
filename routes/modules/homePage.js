const express = require('express')
const router = express.Router()
const Url = require('../../models/URL')
const generator = require('../../public/javascripts/shortUrlGenerator')

router.get('/', (req, res) => {
  res.render('homePage')
})

router.post('/', (req, res) => {
  const inputUrl = req.body.url
  const hostname = req.hostname

  Url.findOne({ url: `${inputUrl}` })
    .lean()
    .then((url) => {
      console.log(url)
      if (url) return res.render('resultPage', { url, hostname })
      const newShortUrl = generator()
      Url.create({ url: `${inputUrl}`, sUrl: `${newShortUrl}` })
        .then(
          res.render('newResultPage', {
            url: inputUrl,
            sUrl: newShortUrl,
            hostname
          })
        )
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})
module.exports = router
