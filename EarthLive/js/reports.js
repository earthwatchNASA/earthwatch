
var categorias;
$(document).ready(function() {
  // Handler for .ready() called.
  $.ajax({
  	url : "http://eonet.sci.gsfc.nasa.gov/api/v2.1/categories",
  	dataType:"json",
  	success:function(result){
  		
  		categorias = result['categories'];
  		
  		//Crear de manera dinámica las categorías
  		for(var i = 0; i<categorias.length; i++){
  			console.log(categorias[i]['title']);

  			//Get work
  			var work = document.getElementById("works")

  			//Crear la figure
			var figure = document.createElement("figure");
			figure.className += " effect-oscar";
			figure.className += " wowload";
			figure.className += " fadeIn";
			
			work.appendChild(figure);

			//Crear la imagen
			var img = document.createElement("img");
			img.setAttribute("src", "images/thumbs/"+categorias[i]['title']+".png");
			img.setAttribute("alt", categorias[i]['title']);
			figure.appendChild(img);

			//Crear el figcaption
			var figcaption = document.createElement("figcaption");
			figure.appendChild(figcaption);

			//Título
			var h2 = document.createElement("h2");
			var titulo = document.createTextNode(categorias[i]['title']);
			h2.appendChild(titulo);
			figcaption.appendChild(h2);

			//Descripción
			var p = document.createElement("p");
			var descripcion = document.createTextNode(categorias[i]['description']);
			p.appendChild(descripcion);
			figcaption.appendChild(p);

			//Url
			var a = document.createElement("a");
			a.setAttribute("href", "event.php?cat="+categorias[i]['id']+"&title="+categorias[i]['title']);
			a.setAttribute("title", categorias[i]['title']);
			a.setAttribute("class", "data-gallery");
			figcaption.appendChild(a);


			/*<figure class="effect-oscar  wowload fadeIn">
				<img src="images/portfolio/1.jpg" alt="img01"/>
				<figcaption>
					<h2>Nature</h2>
					<p>Lily likes to play with crayons and pencils<br>
					<a href="images/portfolio/1.jpg" title="1" data-gallery>View more</a></p>            
				</figcaption>
			</figure>*/


  		}


  	}

  });


document.getElementById("knowMore").onclick = function () {
    location.href = "https://2016.spaceappschallenge.org/challenges/earth/earth-live";
};

document.getElementById("mainLogo").onclick = function () {
    location.href = "#";
};

});



