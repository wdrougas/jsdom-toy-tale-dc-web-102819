let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  getToys()
  createToyListener()
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})

const toyCollectionURL = 'http://localhost:3000/toys'


function getJSON(url) {
  return fetch(url)
  .then(response => response.json())
}

function getToys(){ 
  getJSON(toyCollectionURL)
  .then(toys => toys.forEach(toy => renderToys(toy)) )
}



function renderToys(toy) {
  
  const toyContainer = document.querySelector("#toy-collection")
  let toyDiv = document.createElement('div')
  toyDiv.classList.add('card')
  toyContainer.appendChild(toyDiv)
  
  let toyHeader = document.createElement('h3')
  toyHeader.innerText = `Name: ${toy.name}`
  toyDiv.appendChild(toyHeader)
  
  let imageElement = document.createElement('img')
  imageElement.classList.add('toy-avatar')
  imageElement.src = toy.image
  toyDiv.appendChild(imageElement)
  
  let toyLikesElement = document.createElement('p')
  toyLikesElement.id = toy.id
  toyLikesElement.innerText = `${toy.likes} Likes`
  toyDiv.appendChild(toyLikesElement)
  
  let toyLikeButton = document.createElement('button')
  toyLikeButton.id = toy.id
  toyLikeButton.classList.add('like-btn')
  toyLikeButton.addEventListener('click', incrementToyLikes)
  toyDiv.appendChild(toyLikeButton)

}


function addNewToy (event) {
  event.preventDefault()
  let newToyData = {
    'name': document.querySelector("#toy-name").value,
    'image': document.querySelector("#toy-image").value,
    'likes': '0'
  }

  let configObject = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToyData)
  }
  fetch(toyCollectionURL, configObject).then(response => response.json())
  .then(data => renderToys(data))
}

function createToyListener() {
  getForm().addEventListener('submit', addNewToy)
}



function getForm() {
  return document.querySelector('form')
}


function incrementToyLikes (event) {
  event.preventDefault()
  let toyId = event.target.id
  let likesString = event.target.parentNode.children[2].innerText.split(' ')[0]
  let likesNumber = parseInt(likesString)

  event.target.parentNode.children[2].innerText = `${likesNumber += 1} Likes`

  let configObject = {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(
      {'likes': likesNumber})
}
  fetch(`http://localhost:3000/toys/${toyId}`, configObject)
}

