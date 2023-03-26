
const URL = (page) => `https://jsonmock.hackerrank.com/api/countries?page=${page}`

export const $ = (query) => document.querySelector(query);
export const countries = async() => {
   const valueCountry = ($('.codeCountry').value).toUpperCase()   
   for (let index = 0; index < 25; index++) {

      const response = await fetch(URL(index+1))
      const {data} = await response.json()
      const valuefinded = data.find(({alpha2Code, name}) => alpha2Code === valueCountry || name.toUpperCase()==valueCountry)
      
      if(valuefinded)
         return $('.result').innerHTML = `<div><span>Country:</span>  ${valuefinded.name} </br>
                                          <span>Code:</span> ${valuefinded.alpha2Code}</div>`
      if(!valuefinded && index===24)
      $('.result').innerHTML = `Country not found` 
      
   }

}

//callsbacks
// const sumar = (num1, num2, callback) => {
//     const resultado = num1 + num2
//     setTimeout(()=>{
//         callback(resultado)
//     }, 3000)
    
// }

// sumar(1,2, (result)=>{
//     console.log("resultado: " + result )
// })