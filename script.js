let countries = document.querySelector(".countries");
	let numberOfCountries = document.querySelector('.number')
    let form = document.querySelector("form")
      let spinner = document.querySelector('.spinner')
         


///////Show Country
let showCountry = (nation) =>{
  let html = ` <article class="country">
          <img class="country__img" src="${nation.flag}" />
          <div class="country__data">
            <h3 class="country__name">${nation.name}</h3>
            <h4 class="country__region">${nation.region}</h4>
            <p class="country__row"><span>👫</span>${nation.population}</p>
            <p class="country__row"><span>🗣️</span>${nation.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${nation.currencies[0].name}</p>
          </div>
        </article>`

        countries.insertAdjacentHTML('beforeend', html)
}

//////////////////API call
const getCountriesData = (region) =>{
numberOfCountries.innerHTML = "";
  spinner.classList.toggle('display_none');
		fetch(`https://restcountries.eu/rest/v2/region/${region}`)
		.then(response => {

      if(!response.ok) {
        throw new Error('Region does not exist')
      }
      return response.json()
    })
		.then(data => {
      data.forEach( function(nation, index) {
        showCountry(nation);
      });
      let countryNumber = `Number of countries: ${data.length}`
      numberOfCountries.insertAdjacentHTML('beforeend', countryNumber)
    })
    .catch((err) =>{
              Swal.fire({
        icon: 'error',
        title: `${err}`,
      })
    })
	   .finally(() => {
      countries.style.opacity = 1;
      spinner.classList.toggle('display_none')
    })
	}




///receive data from input

form.addEventListener('submit',function (e) {
    e.preventDefault()
    let inputData = document.querySelector("input");
    countries.innerHTML = "";

  if(inputData.value.length > 0 ){
    getCountriesData(inputData.value);
  }
else {
    Swal.fire({
  icon: 'error',
  title: 'Input a region to continue',
  })
 }

 inputData.value =""
})

	