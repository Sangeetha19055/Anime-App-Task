const apiurl = "https://api.jikan.moe/v3";

//------------------------  Topnav anf from function  ----------------------
function Topnav_And_Form() {
    //navbar 
    const nav = document.createElement("nav");
    const img = document.createElement("img");
    img.setAttribute("src","images/anime.png");
    img.style.position="absolute";
    img.style.top="-28px";
    img.style.width="130px";
    img.style.height="130px"
    

    const h1 = document.createElement("h1");
    // h1.textContent = "Anime App";
    h1.setAttribute("class", "title");
    nav.append(img,h1);

    const section = document.createElement("section");

    const formdiv = document.createElement("div");
    formdiv.setAttribute("class", "conatiner");
    formdiv.innerHTML = `
     <form>
        <input type="text" name="search" id="search" placeholder="search">
        <button type="button" onclick="searchAnime(event)">search</button>
     </form>`;
    section.append(formdiv);
    document.querySelector(".form").append(nav, section);
}
Topnav_And_Form();

//------------------------ searching Anime name in the search box ----------------------
function searchAnime(event) {
    event.preventDefault();
    let inputtext = document.getElementById("search");
    let tobefindtext = inputtext.value;
    // getAnime(tobefindtext);

    if (tobefindtext == "") {
        window.alert("Please!!! Enter the name to find Anime 😀");
    } else {
        getAnime(tobefindtext);
    }

}

//-------------------------- setting  initial API to be loaded ---------------------------
async function getAnime(find) {
    try {
        const data = await fetch(`${apiurl}/search/anime?q=${find}&page=1`, {
            method: "GET"
        });
        const initial_datas = await data.json();
        console.log(initial_datas);
        document.querySelector(".image-conatiner").innerHTML = "";
        displayAnime(initial_datas.results);
    }
    catch (err) {
        document.querySelector(".form").append("Details Cannot be  Founded");
//         console.log(err);

    }
}

//-------------------------- displayAnime  ---------------------------
function displayAnime(animes) {
    animes.forEach((anime) => {
        var image_box = document.createElement("div");
        image_box.innerHTML = `
<div class="card">
        <div class="image">
          <img src=${anime.image_url} alt="image">
        </div>
        <div class="content">
          <h2>${anime.title}</h2>
          <p><strong>Start Date:</strong>    ${new Date(anime.start_date).toDateString()}</p>
          <p><strong>End Date:</strong>      ${new Date(anime.end_date).toDateString()}</p>
          <p><strong>Type:</strong>          ${anime.type}</p>    
          <p><strong>Rating:</strong> <i class="fas fa-star"></i> ${anime.score}</p> 
        </div>
</div>`;
        document.querySelector(".image-conatiner").append(image_box);

    });
}
