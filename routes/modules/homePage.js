const express = require('express')
const router = express.Router()
const Url = require('../../models/URL')
const generator = require('../../public/javascripts/shortUrlGenerator')

// 渲染主頁面
router.get('/', (req, res) => {
  res.render('homePage')
})

// 產生短網址
router.post('/', (req, res) => {
  const inputUrl = req.body.url
  const hostname = req.hostname

  Url.findOne({ url: `${inputUrl}` })
    .lean()
    .then((url) => {
      if (url) return res.render('resultPage', { url })
      const newShortUrl = generator()
      const shortUrlLink = `${hostname}/${newShortUrl}`
      Url.create({
        url: `${inputUrl}`,
        shortUrlLink,
        sUrl: newShortUrl
      })
        .then(
          res.render('newResultPage', {
            url: inputUrl,
            shortUrlLink
          })
        )
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
})

// 短網址轉址
router.get('/:_sUrl', (req, res) => {
  const sUrl = req.params._sUrl
  Url.findOne({ sUrl: `${sUrl}` })
    .lean()
    .then((url) => {
      if (url) return res.redirect(url.url)
      return res.redirect(404)
    })
    .catch((err) => console.log(err))
})
module.exports = router
