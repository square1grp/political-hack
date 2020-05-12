const router = require('express').Router()
const axios = require('axios')

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

  const nodes = _candidates.map((candidate, idx) => {
    return {
      id: idx,
      c_id: candidate['candidate_id'],
      name: candidate['name'],
      party: candidate['party'],
    }
  })

  let links = []
  let c_id_history = []
  for (let c_idx = 0; c_idx < nodes.length; c_idx++) {
    const c_node = nodes[c_idx]
    c_id_history.push(c_node['c_id'])

    const o_nodes = nodes.filter(node => {
      if (c_id_history.includes(node['c_id']))
        return false

      return node['party'] == c_node['party']
    })

    const _links = o_nodes.map(node => {
      return {
        source: c_node['id'],
        target: node['id']
      }
    })

    links = [...links, ..._links]
  }

  res.status(200).send({ nodes: nodes, links: links })
})

module.exports = router