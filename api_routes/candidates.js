const router = require('express').Router()
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const API_ENDPOINT = process.env.DATA_GOV_API_ENDPOINT + '/candidates'
const API_KEY = process.env.DATA_GOV_API_KEY

router.get('/search', async (req, res) => {

  let _candidates = await axios.get(API_ENDPOINT + '/search', {
    params: {
      api_key: API_KEY,
      per_page: 10
    }
  }).then(response => {
    return response.data.results
  }).catch(() => {
    return []
  })

  res.status(200).send(_candidates)
})

module.exports = router