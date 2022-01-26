// init();
// async function init() {
//     console.warn("giantbomb");
//     const resGB = await fetch("https://www.giantbomb.com/api/games/?api_key=da8c31d3076804b6bc4e41d897cb072ddb9985bd&format=json");
//     const jsonGB = await resGB.json();
//     console.log("jsonGB", jsonGB);
// }
let sectionPage;
window.onload = init;

function init() {
    const buttonSearch = document.getElementById("btn_search");
    buttonSearch.addEventListener('click', searchGames);
    sectionPage = document.querySelector(".sectionPage");
    if (!sectionPage) {
        throw new Error("sectionPage introuvable");
    }
    window.onload = downloadGames();
}

/*----------------------------------------------------------------------------------------------------------------------> TELECHARGEMENT DU JEU AU CHARGEMENT DE LA PAGE */
async function downloadGames(){

    /* LOADER */
    sectionPage.innerHTML = "";
    const loader = document.createElement("div");
    loader.classList.add("loader");
    sectionPage.append(loader);

    const listApi = await fetch (`https://www.giantbomb.com/api/games/?api_key=da8c31d3076804b6bc4e41d897cb072ddb9985bd&format=json`);
    const reqList = await listApi.json();
    const listGames = reqList.results;

    sectionPage.innerHTML = "";
    const divGamedex = document.createElement("div");
    divGamedex.classList.add("divGamedex");
    sectionPage.append(divGamedex);
    for (let i = 0; i < listGames.length; i++){
        const oneGame = listGames[i];
        const game = new Game(oneGame);
        const divGame = document.createElement("div");
        divGame.classList.add("divSelectionGame");
        divGame.innerHTML =  `
            <div class="lignImage">
                <img src="${game.image}" alt="Image game ${game.nom}">
            </div>
            <div class="lignName">
                <span class="nomGame">${game.nom}</span>
            </div>
            <div class="lignPlatform">
                <span class="platformsGame">${game.platforms}</span>
            </div>
		`;
        divGame.onclick = ()=>{
            showGame(game);
        };
        divGamedex.append(divGame);
    };
}
/*----------------------------------------------------------------------------------------------------------------------> VISIONNER FICHE JEU */
// function showGame(game){
//     sectionPage.innerHTML = "";
// }

/*----------------------------------------------------------------------------------------------------------------------> RECHERCHER JEU */
async function searchGames(){

    /* LOADER */
    sectionPage.innerHTML = "";
    const loader = document.createElement("div");
    loader.classList.add("loader");
    sectionPage.append(loader);

    const inputSearch = document.querySelector("input.input_search").value;
    const listApi = await fetch (`https://www.giantbomb.com/api/games/?api_key=da8c31d3076804b6bc4e41d897cb072ddb9985bd&format=json&filter=name:${inputSearch}`);
    const reqList = await listApi.json();
    const listGames = reqList.results;

    sectionPage.innerHTML = "";
    const divGamedex = document.createElement("div");
    divGamedex.classList.add("divGamedex");
    sectionPage.append(divGamedex);
    for (let i = 0; i < listGames.length; i++){
        const oneGame = listGames[i];
        const game = new Game(oneGame);
        const divGame = document.createElement("div");
        divGame.classList.add("divSelectionGame");
        divGame.innerHTML =  `
            <img src="${game.image}" alt="Image game ${game.nom}">
            <span class="nomGame">${game.nom}</span>
			<span class="platformsGame">${game.platforms}</span>
		`;
        divGame.onclick = ()=>{
            showGame(game);
        };
        divGamedex.append(divGame);
    };
}

/*----------------------------------------------------------------------------------------------------------------------> CLASSE JEU */
class Game {

    constructor(oneGame){
        this.nom = oneGame.name;
        this.image = oneGame.image.screen_url;
        this.platforms = oneGame.platforms.map((platforms) => platforms.name).join(', ').toUpperCase();
    }
}

