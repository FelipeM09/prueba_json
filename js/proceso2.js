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

    var url = "https://raw.githubusercontent.com/madarme/persistencia_2_2020/main/previo2_estudiantes.json?token=ACGYEGDJXZZTV6YIQ3Y5GL3ASQNEG";
    var resultado = document.getElementById("r");
    var estudiantes = document.getElementById("est");
    var des = document.getElementById("descripcion");
    var tabla = document.getElementById("tabla")
    var msg = "";
  

    leerJSON(url).then(datos => {
        //console.log(datos);

        msg += "<h1>" + datos.nombreMateria + "</h1>";

        var alumnos = datos.estudiantes;
        var descripcion = datos.descripcion;

        console.log(descripcion);

        resultado.innerHTML = msg;

        estudiantes.innerHTML = "<h2>" + "Estudiantes " + "</h2>" + leerEstudiantes(alumnos);
        des.innerHTML = descripcionNota(descripcion);

        tabla.innerHTML = drawTable();
    })
  }

  function leerEstudiantes(estudiantes){

    var msg = "";

    for(let i =0; i<estudiantes.length; i++){
      msg += "<hr>" + "Nombre: " + estudiantes[i].nombre + ", Codigo: " + estudiantes[i].codigo;

      var notas = estudiantes[i].notas;
      msg += leerNotas(notas);
      // msg += drawTable(notas);
      
      // var descripcion = estudiantes[i].descripcion;
      // msg += descripcionNota(descripcion);
    }
    return msg;
  }

  function drawTable(notas) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Salary');
    data.addColumn('boolean', 'Full Time Employee');
    data.addRows([
      ['Mike',  {v: 10000, f: '$10,000'}, true],
      ['Jim',   {v:8000,   f: '$8,000'},  false],
      ['Alice', {v: 12500, f: '$12,500'}, true],
      ['Bob',   {v: 7000,  f: '$7,000'},  true]
    ]);

    var table = new google.visualization.Table(document.getElementById('table_div'));

    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
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
      // console.log(descripcon[i].id + descripcion[i].descripcion);
    }
    return msg;
  }

  mostrar();
  