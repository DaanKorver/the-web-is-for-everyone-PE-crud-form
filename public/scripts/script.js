var submitBtn = document.getElementById('submit')
var inputs = document.getElementsByTagName('input')


submitBtn.onclick = onSubmit

function onSubmit(e) {

  if(!window.fetch) {
    var author = prepareForInsert(getFormValues())
    var options = {
      method: 'POST',
      body: author,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    fetch('https://scrollbook.api.fdnd.nl/v1/author', options)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
      console.log(data);
    })
    e.preventDefault()
  }

  // if(window.XMLHttpRequest) {
  //   var author = prepareForInsert(getFormValues())
  //   var xhr = new XMLHttpRequest()
  //   xhr.onreadystatechange = function(e) {
  //     if(xhr.status === 200 && xhr.readyState === 4) {
  //       var res = JSON.parse(xhr.responseText)
  //       console.log(res.data);
  //     }
  //   }

  //   xhr.open('POST', 'https://scrollbook.api.fdnd.nl/v1/author')
  //   xhr.send(author)

  //   e.preventDefault()
  // }

}

function getFormValues() {
  var formValues = []

  for (var index in inputs) {
    if(inputs[index].type !== 'text') break
    formValues.push(inputs[index].value)
  }
  return formValues
}

function prepareForInsert(values) {
  return JSON.stringify({
    name: values[0],
    surname: values[1],
    initials: values[2],
    date_of_birth: values[3].split('-').reverse().join('-')
  })
}