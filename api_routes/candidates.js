const router = require('express').Router()
const axios = require('axios')

const API_ENDPOINT = process.env.DATA_GOV_API_ENDPOINT + '/candidates'
const API_KEY = process.env.DATA_GOV_API_KEY

router.get('/search', async (req, res) => {

  const candidates = await axios.get(API_ENDPOINT + '/search', {
    params: {
      api_key: API_KEY,
      per_page: 50
    }
  }).then(response => {
    return response.data.results
  }).catch(() => {
    return []
  })

  res.status(200).send(candidates)

})

module.exports = router