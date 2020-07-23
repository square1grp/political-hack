const router = require('express').Router()
const axios = require('axios')
const { v4: uuidv4 } = require('uuid');
const API_ENDPOINT = process.env.DATA_GOV_API_ENDPOINT + '/candidates' // campaign api endpoint
const API_KEY = process.env.DATA_GOV_API_KEY // api key

// create api endpoint under /candidates. so this endpoint will be used under "/candidates/search"
router.get('/search', async (req, res) => {
  // send api requests the campagin service
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

  // return data to the frontend
  res.status(200).send(_candidates)
})

module.exports = router