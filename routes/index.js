const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

router

.get('/', (req, res)=>{
  const errorKeys = Object.keys(req.query).filter(key => key.includes('err'))
  const errors = errorKeys.map(key => req.query[key])
  res.render('index', {
    title: 'Scrollbook CRUD | Author',
    errors
  })
})

.post('/', (req, res)=>{
  const {name, surname, initials, date_of_birth} = req.body
  let errors = []
  if(!verifyDate(date_of_birth)) errors.push('Date of Birth not valid')
  if(errors.length <= 0) {
    const author = JSON.stringify({name, surname, initials, date_of_birth})
    const options = {
      method: 'POST',
      body: author,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('https://scrollbook.api.fdnd.nl/v1/author', options)
    .then(res => res.json())
    .then(data => {
      console.log('data?!', data);
      res.redirect('/?status=success')
    })
    .catch(err => {
      console.log(err);
      errors.push('Oops, something went wrong!')
      const query = errors.reduce((prev, curr, index) => prev+= `&err${index}=${curr}`)
      res.redirect(`/?status=error&err0=${query}`)
    })
  } else {
    const query = errors.reduce((prev, curr, index) => prev+= `&err${index}=${curr}`)
    res.redirect(`/?status=error&err0=${query}`)
  }
})

module.exports = router

function verifyDate(date) {
  const regex = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
  return regex.test(date.split('-').reverse().join('-'))
}