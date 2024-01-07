const base_api = "https://api.genderize.io"
const imgFemale = "https://static.vecteezy.com/system/resources/previews/009/749/643/original/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
const imgMale = "https://static.vecteezy.com/system/resources/previews/009/749/751/original/avatar-man-icon-cartoon-male-profile-mascot-illustration-head-face-business-user-logo-free-vector.jpg"

const loader = document.querySelector('.custom-loader')
const main = document.querySelector('main')

const showResult = (name, gender, probability) => {
    const predictionElement = document.getElementById('prediction')
    const pictureElement = document.getElementById('picture')
    const image = document.createElement('img')

    const percentage = probability * 100;
    let genderTranslate

    if (pictureElement.childElementCount === 1) {
        const img = document.getElementById('img')
        pictureElement.removeChild(img)
    }

    gender === "male" ? (genderTranslate = "cowok", image.src = imgMale) : (genderTranslate = "cewek", image.src = imgFemale)
    image.id = 'img'

    const response = `Hello ${name}, jenis kelamin kamu kemungkinan ${genderTranslate}, dengan akurasi ${percentage}%`
    predictionElement.classList.add('card_message')
    predictionElement.textContent = response
    pictureElement.appendChild(image)
    loader.classList.remove('loading')
    main.style.filter = 'blur(0px)'

}

const predict = async(event) => {
    if (event.key === "Enter") {
        event.preventDefault()
        document.getElementById('myInput').blur()
        loader.classList.add('loading')
        main.style.filter = 'blur(10px)'

        const firstName = event.target.value
        const queryUrl = `${base_api}/?name=${firstName}&country_id=ID`

        const response = await fetch(queryUrl)
        const result = await response.json()

        showResult(result.name, result.gender, result.probability)
    }
}
