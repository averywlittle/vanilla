const endpoint = 'https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new'

let arr = null
let map = new Map()

function generateHistogram() {

    console.log('map', map)
    let target = document.querySelector('.histogram')
    let labelTarget = document.querySelector('.labels')

    for (let i = 1; i <= 10; i++) {
        let data = map.get(i.toString())

        let div = document.createElement('div')
        div.innerHTML = `<p class="info">${data}</p>`
        div.className = 'bar'
        div.style.height = `${data * 10}px`
        target.append(div)

        let infoDiv = document.createElement('div')
        infoDiv.innerHTML = `<p class="info">${i}</p>`
        infoDiv.className = 'info'
        labelTarget.append(infoDiv)
    }
}

function formatData() {
    console.log('arr', arr)

    let len = arr.length
    while (len--) {
        let arrEntry = arr[len]
        let item = map.get(arrEntry) 
        // test if item is in map
        if (item === undefined) {
            map.set(arrEntry, 1)
        } else { // increment count in map
            map.set(arrEntry, item + 1)
        }
    }

    generateHistogram()
}

fetch(endpoint)
    .then(response => {
        if (response.ok) {
            return response.text()
        }
    })
    .then(text => {
        text = text.slice(0, -1) // get rid of trailing newline
        arr = text.split('\n') // get the numbers in an array
        formatData()
    })

// Get frequency data of each unique number in the list

// Plot the frequency data on the histogram