var submitBtn = document.getElementById('submit')

submitBtn.onclick = onSubmit

function onSubmit(e) {

  if(window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function(e) {
      if(xhr.status === 200 && xhr.readyState === 4) {
        var res = JSON.parse(xhr.responseText)
        console.log(res.data);
      }
    }

    xhr.open('GET', 'https://scrollbook.api.fdnd.nl/v1/author')
    xhr.send()


    e.preventDefault()
  }

  
}