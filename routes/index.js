const express = require('express')
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

router

.get('/', (req, res)=>{
  res.render('index', {
    title: 'Scrollbook CRUD | Author',
  })
})

.post('/', (req, res)=>{
  const {name, surname, initials, date_of_birth} = req.body
  
  // Checking for any errors
  let errors = []
  if(!verifyDate(date_of_birth)) errors.push('Date of Birth not valid')
  const hasEmptyValues = checkNotEmpty([name, surname, initials, date_of_birth])
  if(hasEmptyValues) errors.push('Please fill out all fields')

  //Proceeding if there are not errors
  if(errors.length <= 0) {
    const author = JSON.stringify({name, surname, initials, date_of_birth: reverseDate(date_of_birth)})
    const options = {
      method: 'POST',
      body: author,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('https://scrollbook.api.fdnd.nl/v1/author', options)
    .then(response => response.json())
    .then(data => {
      res.render('result', {
        title: 'Scrollbook CRUD | Author',
        data: data.data
      })
    })
    .catch(err => {
      errors.push('Oops, something went wrong!')
      errors.push(err)
      res.render('result', {
        title: 'Scrollbook CRUD | Author',
        errors: errors
      })
    })
  } else {
    res.render('result', {
      title: 'Scrollbook CRUD | Author',
      errors: errors
    })
  }
})

module.exports = router

function verifyDate(date) {
  const regex = new RegExp(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
  return regex.test(date.split('-').reverse().join('-'))
}

function reverseDate(date) {
  return date.split('-').reverse().join('-')
}

function checkNotEmpty(strings) {
  return strings.includes('')
}