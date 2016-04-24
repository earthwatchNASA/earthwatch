
var nuevasCoords;
$(document).ready(function() 
{
   var cat = $_GET('cat');
   var title = decodeURI($_GET('title'));
   console.log(title);
	 $.ajax({
  	url : "http://eonet.sci.gsfc.nasa.gov/api/v2.1/categories/"+cat,
  	dataType:"json",
  	success:function(result)
  	{
      document.getElementById("banner").src="images/banners/"+title+".png";
    

      console.log(document.getElementById("banner").src);
      //Encontrar el array de eventos
  		var eventos = result ["events"];

      //Meter los eventos a un arreglo
      var geometria = [];
      var losEventos = [];
      console.log(eventos.length);
      for(var i = 0; i<eventos.length; i++){
        geometria.push(eventos[i]["geometries"][0]);
        losEventos.push(eventos[i]["title"]);
      }

      if(geometria.length>0){
        updateMap(geometria[0]);
        console.log(losEventos);
      }

      var comboBox = document.createElement("select");
        comboBox.setAttribute("id","combo");

        for(var i = 0; i<losEventos.length; i++){
          var option = document.createElement("option");
          option.text=losEventos[i];
          comboBox.add(option);
        }

        document.getElementById("select").appendChild(comboBox);


        $("#combo").change(function () {
          var index = $("#combo").prop('selectedIndex');
         
          console.log(index);

          updateMap(geometria[index]);

        });


  	}//end success

  	});//end ajax



   document.getElementById("mainLogo").onclick = function () {
    location.href = "index.php";
  };




  

 




});//end ready

var map;
function initMap(Lat,Lng) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:parseFloat(Lat), lng:parseFloat(Lng)},
    zoom: 8
  });


   // Construct the polygon.
  var bermudaTriangle = new google.maps.Polygon({
    paths: nuevasCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);


}

function voltearCoords(arreglo)
{
	for(var i=0; i< arreglo.length; i++)
	{
		var aux = arreglo[i][0];
		arreglo[i][0] = arreglo[i][1];
		arreglo[i][1] = aux;

	}

	var a=[];
	for(var i=0; i< arreglo.length; i++)
	{
		var b = {lat: arreglo[i][0], lng:arreglo[i][1]};

		a.push(b);	
	}




	return a;
}


//Actualizar el mapa
function updateMap(geo){

    var coords = geo["coordinates"];
    var tipo = geo["type"];
    console.log(geo);

    //Checar si es de tipo polígono o punto
    if(tipo.localeCompare("Polygon")== 0)
    {
      nuevasCoords = voltearCoords(coords[0]);
      console.log(nuevasCoords);
      initMap(nuevasCoords[0]["lat"],nuevasCoords[0]["lng"]);
    }
    else{ 
    initMap(coords[1],coords[0]);
    }

  
}


//Conseguir los parámetros de la url
function $_GET(param) {
  var vars = {};
  window.location.href.replace( location.hash, '' ).replace( 
    /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
    function( m, key, value ) { // callback
      vars[key] = value !== undefined ? value : '';
    }
  );

  if ( param ) {
    return vars[param] ? vars[param] : null;  
  }
  return vars;
}