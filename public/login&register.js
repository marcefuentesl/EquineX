var counter = 0;
//login and register buttons

// const button = document.getElementById('registerButton');
// button.addEventListener('click', function(e) {
//   console.log('button was clicked');
// });


function validarContenido(field) {
  var text = field.value;
  field.style.background = "white";     
  if( text.length <= 0){
    field.style.background = "red";   
  }
    
}

function validarCURP(field){
  var curp = field.value;
  field.style.background = "white";
  if(curp.length != 18){
    field.style.background = "red";
  }
}

function dividedForm() {
    var w = document.getElementById("div1");
    var x = document.getElementById("div2");
    var y = document.getElementById("div3");
    var z = document.getElementById("div4");

    if (counter==0) {
      counter++;
    } else if (counter==1) {
      w.style.display = "none";
      x.style.display = "block";
      y.style.display = "none";
      z.style.display = "none";
      counter++;
    } else if (counter==2) {
      w.style.display = "none";
      x.style.display = "none";
      y.style.display = "block";
      z.style.display = "none";
      counter++;
    } else {
      w.style.display = "none";
      x.style.display = "none";
      y.style.display = "none";
      z.style.display = "block";
    }
}