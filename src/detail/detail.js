import { getSingleAd } from '../config/firebase.js'

async function getAdDetail() {
    const adId = location.search.slice(6)

    const ad = await getSingleAd(adId)

    const container = document.getElementById('container')

    const card = document.createElement('div')
    card.className = 'card'

    const img = document.createElement('img')
    img.src = ad.image
    img.style.width = '300px'
    img.style.height = '300px'

    const title = document.createElement('h3')
    title.innerHTML = ad.title

    const amount = document.createElement('h4')
    amount.innerHTML = `Rs. ${ad.amount}`

    const description = document.createElement('p')
    description.innerHTML = ad.description

    card.append(img)
    card.append(title)
    card.append(amount)
    card.append(description)

    container.append(card)
}

getAdDetail()