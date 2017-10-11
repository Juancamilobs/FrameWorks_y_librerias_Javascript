function color1 (elemento){
  $(elemento).animate(
    {
      color: "red"
    },700,function(){
      color2(elemento)
    }
  )
};
function color2 (elemento){
  $(elemento).animate(
    {
      color: "yellow"
    },700,function(){
      color1(elemento)
    }
  )
};
function getRandomInt(b,a){
  numero = Math.floor(Math.random()*a )+b
  //ruta = "<img src='image/"+numero+".png' id='dulce' alt='dulce'>";
  return numero
};

function fillBoard() {
var top = 5;
var column = $('[class^="col-"]');

column.each(function () {
  var candys = $(this).children().length;
  var agrega = top - candys;
  for (var i = 0; i < agrega; i++) {
      var candyType = getRandomInt(1, 4);
      if (i === 0 && candys < 1) {
        $(this).append('<img src="image/' + candyType + '.png" class="element col-"></img>');
      } else {
        $(this).find('img:eq(0)').before('<img src="image/' + candyType + '.png" class="element"></img>');
      }
    }
  });
}
function buscarIguales (element,direccion){
  indexCon = 0;
  coincidencias= new Array
  lSiguientes=$(element).nextAll()
  lAnteriores=$(element).prevAll()
  cSiguientes=$(element).parent().nextAll()
  cAnteriores=$(element).parent().prevAll()
  indexL=5-lSiguientes.length
  indexC= 7-cSiguientes.length
  switch(direccion) {

    case "arriba":
    siguiente=getSiguiente(element)
      if($(element).attr('src')==$(siguiente).attr('src')){
        $(siguiente).addClass('igual')
      }

      break;
    case "abajo":
      anterior=getAnterior(element)
      if($(element).attr('src')==$(anterior).attr('src')){
        $(anterior).addClass('igual')
      }
      break;
    case "derecha":
      var colSiguiente=$(cSiguientes[0]).children()[indexL-1];
      if($(colSiguiente).attr('src')==$(element).attr('src')){
        $(colSiguiente).addClass('igual')
      }
      break;
    case "izquierda":
      var colAnterior=$(cAnteriores[0]).children()[indexL-1];
      if($(colAnterior).attr('src')==$(element).attr('src')){
        $(colAnterior).addClass('igual')
      }
      break;
    default:alert('no hay coincidencias')

  }
}
function getSiguiente(element){
  siguiente = $(element).next()[0];
  return siguiente
}

function getAnterior(element){
  anterior = $(element).prev()[0];
  return anterior
}
// function lineaIndex(element){
//  LSiguientes=$(element).nextAll()
//  LAnteriores=$(element).prevAll()
//  if($(element).attr('src')==$(siguientes[0]).attr('src')){
//    alert('el de abajo es igual')
//  }
//  if ($(element).attr('src')==$(anteriores[0]).attr('src')){
//    alert('el de arriba es igual')
//  }
//  indexL=5-siguientes.length
//  return indexL
//}
//function columnaIndex(element){
//  cSiguientes=$(element).parent().nextAll()
  //CAnteriores=$(element).parent().prevAll()
  //indexC= 7-siguientes.length
  //var colSiguiente=$(siguientes[0]).children()[indexL-1];
  //if($(colSiguiente).attr('src')==$(element).attr('src')){
  //  alert('el de la derecha es igual')
  //}
  //var colAnterior=$(anteriores[0]).children()[indexL-1];
  //if($(colAnterior).attr('src')==$(element).attr('src')){
  //  alert('el de la izquierda es igual')
  //}

  //console.log("El objeto esta en la columna "+indexC)
  //return indexC
//}



function dulceClick(element){
  $(element).remove();
  puntaje=Number($('#movimientos-text').text())
  puntaje=puntaje+1;
  $('#movimientos-text').text(puntaje)
}


$(function() {
  color1($('.main-titulo'));
  fillBoard();
  $('.element').on('click',function (event){
      $(this).toggleClass('igual')
      buscarIguales(this,"arriba")
      buscarIguales(this,"abajo")



  })



  });
