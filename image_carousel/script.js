const endpoint = 'https://www.reddit.com/r/aww/top/.json?t=all'
let intervalId = null
let ctr = 0
let linkCollection = null

function next() {
    let currentImageContainer = document.querySelector(".imgContainer")
    currentImageContainer.remove()
    clearInterval(intervalId)
    if (ctr === linkCollection.length -1) displayCarousel(0)
    else displayCarousel(ctr + 1)
}

function previous() {
    let currentImageContainer = document.querySelector(".imgContainer")
    currentImageContainer.remove()
    clearInterval(intervalId)
    if (ctr === 0) displayCarousel(linkCollection.length -1)
    else displayCarousel(ctr - 1)
    
}

function counterLoop() {
    if (ctr >= linkCollection.length - 1) ctr = 0
    else ctr++
}

function displayCarousel(counter) {

    if (counter >= 0) {
        ctr = counter
    }
    const div = document.querySelector(".carousel")

    let initialImage = displayImage()
    div.append(initialImage)

    intervalId = setInterval(function() {
        counterLoop()
        let prevImageContainer = document.querySelector(".imgContainer")
        let imageContainer = displayImage()

        div.replaceChild(imageContainer, prevImageContainer)
    }, 5000)

    function displayImage() {
        let imageContainer = document.createElement('div')
        imageContainer.className = 'imgContainer'

        let image = document.createElement('img')
        image.className = 'display'
        image.src = linkCollection[ctr]

        imageContainer.append(image)

        return imageContainer
    }
}

function formatData(data) {
    let links = data.data.children.map(child => child.data.url_overridden_by_dest)
    links = links.filter(link => {
        return link.slice(-4) === '.jpg'
    })
    console.log('links', links)
    linkCollection = links
    displayCarousel()
}

fetch(endpoint)
    .then(response => response.json())
    .then(data => formatData(data))