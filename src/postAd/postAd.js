import { postAdToDb } from "../config/firebase.js"

window.onSubmit = function() {
    const allInputs = document.getElementsByTagName('input')
    const title = allInputs[0].value
    const description = allInputs[1].value
    const amount = allInputs[2].value
    const image = allInputs[3].files[0]

    const ad = {
        title,
        description,
        amount,
        image
    }
    
    postAdToDb(ad)
}