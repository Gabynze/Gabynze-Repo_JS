function createCardRepo(title, url,){
  let card_el = document.createElement('article')
  card_el.classList.add("card", "mb-2", "mx-2")

  let card_body_el = document.createElement('div')
  card_body_el.classList.add("card-body")

  let title_el = document.createElement('h3')
  title_el.textContent = title
  title_el.classList.add("card-title")

  let url_el = document.createElement('a')
  url_el.innerHTML = url 
  // url_el.innerHTML = `<a href="${url}">` 
  url_el.classList.add("card-text")

  card_body_el.appendChild(title_el)
  card_body_el.appendChild(url_el)

  card_el.appendChild(card_body_el)

  return card_el
}

// function createSampleCard(){
//     return createCard ("carregando...", "...")
// }


class ApiConection {
  get API_URL() {
      return "https://api.github.com/users/Gabynze/repos"
  }

  async getrequestPortafolio() {
      const request_url = this.API_URL
      const resp = await fetch(request_url)
      if (resp.ok) {
          return await resp.json()
      }
      throw new Error("Error fetching API, status:" + resp.status)
  }
}

document.addEventListener("DOMContentLoaded", function iniciandoApp(){
  const search_results_el = document.getElementById("search-results")
  const api_connection = new ApiConection

  // for (let i=0; i < 13; i++){
  //     search_results_el.appendChild(createSampleCard())
  // }

  api_connection.getrequestPortafolio()
  .then(results => {
      // console.log(results)
      search_results_el.innerHTML = ""
      results.forEach(result => {
          search_results_el.appendChild(createCardRepo(result.name, result.html_url))  
      })
  })
  
})