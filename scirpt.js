const apiurl = "https://api.jikan.moe/v3";


//------------------------  Topnav anf from function  ----------------------
function Topnav_And_Form() {
    //navbar 
    const nav = document.createElement("nav");
    const h1 = document.createElement("h1");
    h1.textContent = "Anime App";
    h1.setAttribute("class", "title");
    nav.append(h1);
    const formdiv = document.createElement("div");
    formdiv.setAttribute("class", "conatiner");
    formdiv.innerHTML = `
    <form>
    <input type="text" name="search" id="search" placeholder="search">
    <button type="button" onclick="searchAnime(event)">search</button>
    </form>
    `;
    document.querySelector(".form").append(nav, formdiv);
}
Topnav_And_Form();

//------------------------ searching Anime name in the search box ----------------------
function searchAnime(event) {
    event.preventDefault();
    let inputtext = document.getElementById("search");
    let tobefindtext = inputtext.value;
    // getAnime(tobefindtext);
   
    if(tobefindtext == ""){
       alert("please!!! Enter the Name to find anime");
      }else{
        getAnime(tobefindtext);
      }
     inputtext.value = "";
      
}
//-------------------------- setting  initial API to be loaded ---------------------------
async function getAnime(find) {
    try {
        const data = await fetch(`${apiurl}/search/anime?q=${find}&page=1`,{
            method: "GET"
        });
        const initial_datas = await data.json();
        console.log(initial_datas);
        document.querySelector(".image-conatiner").innerHTML = "";
        displayAnime(initial_datas.results);
    }
    catch (err) {
        document.querySelector(".image-conatiner").append("Details Cannot be  Founded");
    }
}

//-------------------------- displayAnime  ---------------------------
function displayAnime(anime) {
    for (let i = 0; i <= anime.length; i++) {
        //anime card
        var image_box = document.createElement("div");
        image_box.innerHTML = `
        <div class="card">
                <div class="image">
                  <img src=${anime[i].image_url} alt="image">
                </div>
                <div class="content">
                  <h2>${anime[i].title}</h2>
                  <p><strong>Start Date:</strong>    ${new Date (anime[i].start_date).toDateString()}</p>
                  <p><strong>End Date:</strong>      ${new Date (anime[i].end_date).toDateString()}</p>
                  <p><strong>Type:</strong>          ${anime[i].type}</p>    
                  <p><strong>Rating:</strong> <i class="fas fa-star"></i> ${anime[i].score}</p> 
                </div>
       </div>

`;
        document.querySelector(".image-conatiner").append(image_box);
    }
   

}

