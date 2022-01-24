init();
async function init() {
    console.warn("giantbomb");
    const resGB = await fetch("https://www.giantbomb.com/api/games/?api_key=da8c31d3076804b6bc4e41d897cb072ddb9985bd&format=json");
    const jsonGB = await resGB.json();
    console.log("jsonGB", jsonGB);
}