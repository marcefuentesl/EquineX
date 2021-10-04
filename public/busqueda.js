// Desarrollo de Aplicaciones Web, Marcela Fuentes y Víctor Coeto
// Funciones JS para buscar

function sumopt(cosa) {
    var option = cosa.value;
    console.log(option);
    var x = document.getElementById("div2");
    var y = document.getElementById("div3");
    switch(option) {
        case "jinete":
            x.style.display = "block";
            y.style.display = "none";
            break;
        case "caballo":
            x.style.display = "none";
            y.style.display = "block";
    }
}