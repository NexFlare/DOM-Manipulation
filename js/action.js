export const getCompleteData = async ()=>{
    let url = new URL('https://developers.zomato.com/api/v2.1/geocode')
    url.search = new URLSearchParams({
        lat : 27.183986,
        lon : 77.962195
    })
    const response =  await fetch(url,{
        method : "GET",
        headers : {
            "user-key" : "<YOUR_API_KEY>"        }
    })
    const data = await response.json()
    return data
}

export const getSearchedData = async ({query})=>{
    console.log("Called ", query)
    let url = new URL('https://developers.zomato.com/api/v2.1/search')
    url.search = new URLSearchParams({
        q : query,
        lat : 27.183986,
        lon : 77.962195
    })
    const response = await fetch(url , {
        method : "GET",
        headers : {
            "user-key" : "<YOUR_API_KEY>"
        }
    })
    const data = await response.json()
    return data;
}
