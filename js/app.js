import {getCompleteData, getSearchedData} from './action.js'
import {getRestrauntCard} from './component/card/restaurantCard.js'
import {debounce} from '../js/helper/index.js'
// import '../stylesheet/style.css'


const search = document.querySelector('.search-box')
const restrauntListContainer = document.createElement('div');
const pageContainer = document.querySelector(".page-container");
const sortList = document.querySelector(".sort-list");
const debounceSearch = debounce(getSearchedData,500)
search.addEventListener('keyup',e=>{
      debounceSearch({query : e.target.value}).then(response => renderRestaraunts(response.restaurants))
   }
)

sortList.addEventListener('click',handleSortClicked)

restrauntListContainer.classList.add('restraunt-container');
pageContainer.appendChild(restrauntListContainer);
restrauntListContainer.addEventListener("click", e=>{
   
})

getCompleteData().then(response=>{
   renderRestaraunts(response.nearby_restaurants)
})

const getRestrauntData = (restraunt)=>{
   console.log(restraunt)
   const {name, id , featured_image, user_rating: {
      aggregate_rating : rating
   }
} = restraunt;
   console.log(rating)
   return {name, id, featured_image, rating}
}

const renderRestaraunts = (data)=>{
   restrauntListContainer.innerHTML = "";
   localStorage.setItem('rest', JSON.stringify([]))
   data.forEach(restaurant => {
      let dataRequired = getRestrauntData(restaurant.restaurant)
      if(localStorage.getItem('rest')){
         const arr = JSON.parse(localStorage.getItem('rest'))
         arr.push(dataRequired)
         localStorage.setItem('rest',JSON.stringify(arr))
         //localStorage.setItem('rest',JSON.stringify(JSON.parse(localStorage.getItem('rest')).push(dataRequired)))
      }
      
   })
   console.log(JSON.parse(localStorage.getItem('rest')))
   JSON.parse(localStorage.getItem('rest')).forEach(rest=>restrauntListContainer.appendChild(getRestrauntCard(rest)))
   
}

function handleSortClicked(e){
   console.log(e.target.id)
   let comparator;
   if(e.target.id.toLowerCase() === 'name'){
      comparator = (a,b)=>{
         let aValue = a.name.toLowerCase();
         let bValue = b.name.toLowerCase();
         if(aValue > bValue){
            return 1;
         }
         else if(aValue<bValue){
            return -1;
         }
         else {
            return 0;
         }
      }
   }
   else{
      comparator = (a,b)=>{
         return b.rating - a.rating;
      }
   }
   let arr = JSON.parse(localStorage.getItem('rest')).sort(comparator)
   localStorage.setItem('rest',JSON.stringify(arr))
   restrauntListContainer.innerHTML = "";
   JSON.parse(localStorage.getItem('rest')).forEach(rest=>restrauntListContainer.appendChild(getRestrauntCard(rest)))
}


