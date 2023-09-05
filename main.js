const colorContainer = document.querySelector('.color-container');
const generateBtn = document.querySelector('.generate-btn');

getColors();

async function getColors () {
    var url = "http://colormind.io/api/";
    var data = {
        model : "default"
    }

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var palette = JSON.parse(http.responseText).result;

            const names = [];
            const colorPaletteNames = document.createElement("ul");
            colorPaletteNames.classList.add("palette-name");
            for (let i = 0; i<=10; i++){
                const colorPal = palette[i];
                if (colorPal && colorPal !== "") {
                    names.push(colorPal);
                }
            }
            const paletteNamesList = names.map(colorPal => `
                <li class="indiv-name">${colorPal}</li>
            `).join("");
            colorPaletteNames.innerHTML = `
                ${paletteNamesList}
            `
            colorContainer.appendChild(colorPaletteNames);

            const colorPalette = document.createElement("ul");
            colorPalette.classList.add("palette-container");
            const palettes = [];
            for (let i = 0; i<=10; i++){
                const colorPal = palette[i];
                if (colorPal && colorPal !== "") {
                    palettes.push(colorPal);
                }
            }
            const palettesList = palettes.map(colorPal => `
                <li class="indiv-color" style="background:rgb(${colorPal});"></li>
            `).join("");
            colorPalette.innerHTML = `
                ${palettesList}
            `
            colorContainer.appendChild(colorPalette);
        }
    }

    http.open("POST", url, true);
    http.send(JSON.stringify(data));
}

generateBtn.addEventListener("click", () => {
    getColors();
    window.location.reload();
})