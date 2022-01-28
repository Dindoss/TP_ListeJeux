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

    sectionPage = document.querySelector(".sectionPage");
    if (!sectionPage) {
        throw new Error("sectionPage introuvable");
    }

    const buttonSearch = document.getElementById("btn_search");
    if (!buttonSearch) {
        throw new Error("buttonSearch introuvable");
    }
    buttonSearch.addEventListener('click', searchGames);

    const buttonFavoris = document.getElementById("btn_favoris");
    if (!buttonFavoris) {
        throw new Error("buttonFavoris introuvable");
    }
    buttonFavoris.addEventListener('click', showFavoris);

}
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
            <div class="divImage">
                <img src="${game.imageScreen}" alt="Image game ${game.nom}">
            </div>
            <div class="divName">
                <span class="nomGame">${game.nom}</span>
            </div>
            <div class="divPlatform">
            </div>
        `;
        divGame.onclick = ()=>{
            try{
                showGame(game);

            }catch(e){
                sectionPage.innerHTML = `Erreur pendant le chargement de l'aperçu de : ${game.nom}`;
            }
        }
        /* AFFICHAGE LE NOMBRE DE PLATEFORMES D'UN JEU, SI CELLE CI EST SUPERIEUR A 4 */
        let k = 0;
        const divPlatform = divGame.querySelector(".divPlatform");
        for (let i=0; i < game.platforms.length; i++){
            if (i>=4){
                k++;
            }
            else{
                const spanPlatformsGame = document.createElement("span");
                spanPlatformsGame.classList.add("spanGame");
                spanPlatformsGame.innerText = game.platforms[i].abbreviation;
                divPlatform.append(spanPlatformsGame);
            }
        }
        if (k === 0){
            divGamedex.append(divGame);
        }
        else{
            const spanPlatformsGame = document.createElement("span");
            spanPlatformsGame.classList.add("spanGame");
            spanPlatformsGame.innerText = "+ " + k ;
            divPlatform.append(spanPlatformsGame);
            divGamedex.append(divGame);
        }
    }
}
/*----------------------------------------------------------------------------------------------------------------------> VISIONNER FICHE JEU */
async function showGame(game){
    sectionPage.innerHTML = "";

    const divFicheGame = document.createElement("div");
    divFicheGame.classList.add("divFicheGame");
    divFicheGame.innerHTML = `
        <div class="divFicheCol">
            <div class="divFicheName">
                <span class="nomFicheGame">${game.nom}</span>
            </div>
             <div class="divFicheImage">
                <img src="${game.imageSmall}" alt="Image game ${game.nom}">
            </div>
        </div>
        <div class="separateur"></div>
        <div class="divFicheCol">
            <div class="divFichePlatform">
            </div>
            <div class="divFicheDateSortie">
                <span class="title">Sortie</span>
                <span class="DateSortieFicheGame">${game.dateSortie ? game.dateSortie : "Aucune date de sortie."}</span> 
            </div>
            <div class="divFicheDatePrevue">
                <span class="title">Sortie prévue</span>
                <span class="DatePrevuFicheGame">${game.datePrevue ? game.datePrevue : "Aucune date prévue."}</span>
            </div>
        </div>
        <div class="separateur"></div>
        </div>
        <div class="divFicheDeck">
            <span class="title"> Description courte :</span>
            <span class="deckFicheGame">${game.desCourte ? game.desCourte : "Ce jeu n'a pas de description courte."}</span>
        </div>
        <div class="divFicheDesc">
            <span class="title">Decription longue :</span>
            <span class="descFicheGame">${game.desLongue ? game.desLongue : "Ce jeu n'a pas de description longue."}</span>
        </div>
    `;
    /* AFFICHAGE LE NOMBRE DE PLATEFORMES D'UN JEU, SI CELLE CI EST SUPERIEUR A 4 */
    let k = 0;
    const divFichePlatform = divFicheGame.querySelector(".divFichePlatform");
    for (let i=0; i < game.platforms.length; i++){
        if (i>=4){
            k++;
        }
        else{
            const spanPlatformsFicheGame = document.createElement("span");
            spanPlatformsFicheGame.classList.add("spanFicheGame");
            spanPlatformsFicheGame.innerText = game.platforms[i].abbreviation;
            divFichePlatform.append(spanPlatformsFicheGame);
        }
    }
    if (k === 0){
        sectionPage.append(divFicheGame);
    }
    else{
        const spanPlatformsFicheGame = document.createElement("span");
        spanPlatformsFicheGame.classList.add("spanFicheGame");
        spanPlatformsFicheGame.innerText = "+ " + k ;
        divFichePlatform.append(spanPlatformsFicheGame);
        sectionPage.append(divFicheGame);
    }

}
/*----------------------------------------------------------------------------------------------------------------------> AFFICHER JEUX FAVORIS */
async function showFavoris(){
    sectionPage.innerHTML = "";
}
/*----------------------------------------------------------------------------------------------------------------------> CLASSE JEU */
class Game {

    constructor(oneGame){
        this.nom = oneGame.name;
        this.imageScreen = oneGame.image.screen_url;
        this.imageSmall = oneGame.image.small_url;
        this.platforms = oneGame.platforms;
        this.dateSortie = oneGame.original_release_date;
        this.datePrevue = oneGame.expected_release_year;
        this.desCourte = oneGame.deck;
        this.desLongue = oneGame.description;
    }
}

