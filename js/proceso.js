async function leerJSON(url) {

  try {
    let response = await fetch(url);
    let user = await response.json();
    return user;
  } catch(err) {
    
    alert(err);
  }
}


function mostrar(){

  var titulo = document.getElementById("titulo");
  var url = "https://raw.githubusercontent.com/madarme/persistencia_2_2020/main/previo2_estudiantes.json?token=ACGYEGDJXZZTV6YIQ3Y5GL3ASQNEG";
  var resultado = document.getElementById("r");
  var des = document.getElementById("table_div");
  


  leerJSON(url).then(datos => {
      titulo.innerHTML = "<h1>" + datos.nombreMateria + "</h1>";
      var alumnos = datos.estudiantes;
      var descripcion = datos.descripcion;
      resultado.innerHTML = drawTable(alumnos) ;
  })
}

function leerEstudiantes(estudiantes){

  var msg = "";

  for(let i =0; i<estudiantes.length; i++){
    msg += "<hr>" + "Nombre: " + estudiantes[i].nombre + ", Codigo: " + estudiantes[i].codigo;

    var notas = estudiantes[i].notas;
    
    msg += leerNotas(notas);
    drawTable(estudiantes[i],i);
  }
  return msg;
}


function leerEstudiante(estudiante, posicion){
  // console.log(estudiante[posicion].nombre);
  // console.log(estudiante[posicion].codigo);
  // console.log(estudiante[posicion].notas);
  return estudiante[posicion];
}



function leerNotas(notas){
  var msg ="";

  for(let i =0; i<notas.length; i++){
    msg += "<br>" + "id: " + notas[i].id + " valor: " + notas[i].valor;
  }

  return msg;
}




function descripcionNota(descripcion){

  var msg = "";

  for(let i =0; i<descripcion.length; i++){
    msg += "<br>" + "el id es: " + descripcion[i].id + " Descripción: " + descripcion[i].descripcion;
  }
  return msg;
}



  
function drawTable(datos) {
  
  var data = new google.visualization.DataTable();

  let valor =0;
  let posicion =0;
  data.addColumn('number', 'CODIGO');
  data.addColumn('string', 'ESTUDIANTE');

  // let notass = datos[0].notas;
  // console.log("tamaño " + notass.length);

  for(let i=0; i<datos[0].notas.length; i++){
     data.addColumn("number", "NOTA");
  }

  
  data.addRows(datos.length);

 
  for(let i=0; i<datos.length; i++){
    let estudiante = leerEstudiante(datos, i);
    data.setCell(i,0, estudiante.codigo);
    data.setCell(i,1, estudiante.nombre);

    for(let j=2; j<=datos[0].notas.length+1; j++){
      data.setCell(i,j, leerNota(estudiante.notas, posicion));
      posicion++;
    }
    posicion=0;
  }

  var table = new google.visualization.Table(document.getElementById('table_div'));

  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}




function leerNota(notas, posicion){
  let nota = notas[posicion].valor;
  return nota;
}


function calcularPromedio(){

}

// function llenarTabla(){
//   let valores = [];

//   for(let i=0; i<datos.length; i++){
//     let estudiante = leerEstudiante(datos, i);
//     data.setCell(i,0, estudiante.codigo);
//     data.setCell(i,1, estudiante.nombre);

//     for(let j=2; j<=datos[0].notas.length+1; j++){
//       data.setCell(i,j, leerNota(estudiante.notas, posicion));
//       posicion++;
//     }
//     posicion=0;
//   }


//   return
// }



mostrar();
