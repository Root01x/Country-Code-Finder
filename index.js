const $ = (query) => document.querySelector(query);
const url = (page) => `https://jsonmock.hackerrank.com/api/countries?page=${page}`
let countryNames = []
const getDataCountry = async() => {

    for(let i= 0; i<=25; i++){
        
        const response = await fetch(url(i))
        const {data} = await response.json()
        const pages = await data.map(names=>({name:names.name, code:names.alpha2Code}))
        countryNames = countryNames.concat(pages)
        
    }  
    console.log(countryNames)
}

getDataCountry()

const  countryFinder = async () => {
    const codeCountry = $('.codeCountry').value
    let result = await countryNames.find(country => country.code ==  codeCountry.toUpperCase() ) 
    $('.result').innerHTML= result ? result.name : "No found"
}

$(".btn").addEventListener('click', countryFinder)

