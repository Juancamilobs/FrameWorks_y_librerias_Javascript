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
function getUbicacion(element){
  informativos = new Array
  informativos[0] = $(element).next()[0];
  informativos[1] = $(element).prev()[0];
  informativos[2] = $(element).nextAll()
  informativos[3] = $(element).prevAll()
  informativos[4] = $(element).parent().nextAll()
  informativos[5] = $(element).parent().prevAll()
  informativos[6] = 5-Number(informativos[2].length)
  informativos[7] = 7-Number(informativos[4].length)
  colSiguiente=informativos[4]=$(element).parent().next();
  colAnterior=informativos[5]=$(element).parent().prev();
  informativos[8] = $(colSiguiente).children()[informativos[6]-1]
  informativos[9] = $(colAnterior).children()[informativos[6]-1]
  return informativos
}

function buscarIguales (element,direccion){
  e=getUbicacion(element);
  switch(direccion) {

    case "abajo":
      while(e[2]!=undefined){
        if($(element).attr('src')==$(e[0]).attr('src')){
          $(e[0]).addClass('igual');
          elemento=e[0];
          e=getUbicacion(elemento)
        }else{
          break;
        }
      }
      break;
    case "arriba":
    while(e[3]!=undefined){
      if($(element).attr('src')==$(e[1]).attr('src')){
        $(e[1]).addClass('igual');
        elemento=e[1];
        e=getUbicacion(elemento)
      }else{
        break;
      }
    }
      break;
    case "derecha":
    while(e[4]!=undefined){
      if($(element).attr('src')==$(e[8]).attr('src')){
        $(e[8]).addClass('igual');
        elemento=e[8];
        e=getUbicacion(elemento)
      }else{
        break;
      }
    }
      break;
    case "izquierda":
    while(e[5]!=undefined){
      if($(element).attr('src')==$(e[9]).attr('src')){
        $(e[9]).addClass('igual');
        elemento=e[9];
        e=getUbicacion(elemento)
      }else{
        break;
      }
    }
      break;
    default:
  }
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



function eliminarCoincidencia(element){
  if($('.igual').length>2){
    movimientos=Number($('#movimientos-text').text())
    movimientos=movimientos+1;
    puntaje=Number($('#score-text').text())
    puntaje=puntaje+($('.igual').length)
    $('#movimientos-text').text(movimientos)
    $('#score-text').text(puntaje)
    $('.igual').remove();
  }else{
    $('.igual').removeClass('igual')
    alert('no hay mas de tres dulces juntos!')
  }
}


$(function() {
  color1($('.main-titulo'));
  fillBoard();
  $('.element').on('click',function (event){
      $(this).toggleClass('igual')
      buscarIguales(this,"izquierda")
      buscarIguales(this,"derecha")
      buscarIguales(this,"abajo")
      buscarIguales(this,"arriba")
      eliminarCoincidencia(this)





  })



  });
