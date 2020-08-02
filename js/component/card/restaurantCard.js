

export const getRestrauntCard = ({featured_image, name, id, rating})=>{
    const card = document.createElement('div')
    card.classList.add('restaraunt-card')
    const imgContainer = document.createElement("div")
    imgContainer.classList.add("img-container");
    const img = document.createElement("img")
    const nameDiv = document.createElement('div')
    nameDiv.classList.add("r-name");
    const ratingElement = document.createElement('p');
    ratingElement.innerText = rating;
    nameDiv.innerText = name
    img.classList.add('r-image');
    featured_image.length>0 ? img.src = featured_image : img.src = "../public/img/zomato-logo.svg"
    imgContainer.appendChild(img);
    card.appendChild(imgContainer);
    card.appendChild(nameDiv)
    card.append(ratingElement)
    return card
}