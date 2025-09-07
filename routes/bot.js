const express = require('express')
const router = express.Router()
// define the home page route
router.get('/', (req, res) => {
  console.log(req)
})
// define the about route


module.exports = router