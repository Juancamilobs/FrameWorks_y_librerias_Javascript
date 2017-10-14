/* Animacion del titulo*/
function cambioColor(){
    $('.main-titulo').css('color','white')
    setTimeout(function(){
        $('.main-titulo').css('color','yellow')
    },500)
}
function inicioVariables(){
  i=0;
  score=Number($('#score-text').html());
  indice = new Array;
  indicador = false;
  numDulces = 0;
  segundos = 10;
  minutos = 0;
}
function lineaDulces(){
  i=i+1
    if (i<8){
    for (j=1;j<8;j++){
      numero = Math.floor(Math.random()*4)+1
      ruta = "image/"+numero+".png"
      $('.col-'+j).prepend('<img src="'+ruta+'"class="elemento" >').css("justify-content","flex-start")
    }
  }
  if(i==8){
    clearInterval(crearDulces)
    indicador = true;
    eliminar = setInterval(function (){eliminarActivos()},150);

  }
}
function bHorizontal(){
  for (x=1;x<8;x++){
    for (y=1;y<6;y++){
      var pos1 = $('.col-'+y).children("img:nth-last-child("+x+")").attr('src')
      var pos2 = $('.col-'+(y+1)).children("img:nth-last-child("+x+")").attr('src')
      var pos3 = $('.col-'+(y+2)).children("img:nth-last-child("+x+")").attr('src')
      if ((pos1==pos2) && (pos2==pos3) && (pos1!=null) && (pos2!=null) && (pos3!=null)){
          $('.col-'+y).children("img:nth-last-child("+x+")").attr('class','elemento activo')
          $('.col-'+(y+1)).children("img:nth-last-child("+x+")").attr('class','elemento activo')
          $('.col-'+(y+2)).children("img:nth-last-child("+x+")").attr('class','elemento activo')
        }
    }
  }
  if ($('.activo').length>0){
    return true
  }else{
    return false
  }
}
function bVertical(){
  for (y=1;y<8;y++){
    for (x=1;x<6;x++){
      var pos1 = $('.col-'+y).children("img:nth-last-child("+x+")").attr('src')
      var pos2 = $('.col-'+y).children("img:nth-last-child("+(x+1)+")").attr('src')
      var pos3 = $('.col-'+y).children("img:nth-last-child("+(x+2)+")").attr('src')
      if ((pos1==pos2) && (pos2==pos3) && (pos1!=null) && (pos2!=null) && (pos3!=null)){
          $('.col-'+y).children("img:nth-last-child("+x+")").attr('class','elemento activo')
          $('.col-'+y).children("img:nth-last-child("+(x+1)+")").attr('class','elemento activo')
          $('.col-'+y).children("img:nth-last-child("+(x+2)+")").attr('class','elemento activo')
      }
    }
  }
  if ($('.activo').length>0){
    return true
  }else{
    return false
  }
}
function nuevosDulces(indice){
  numDulces=0;
  for(var j=1;j<8;j++)
    {
      numDulces=numDulces+$(".col-"+j).children().length;
    }
  if (numDulces!=49){
    for  (j=1;j<8;j++){
          if (indice[j-1]>0){
            numero = Math.floor(Math.random()*4)+1;
            ruta = "image/"+numero+".png"
            $('.col-'+j).prepend('<img src="'+ruta+'"class="elemento" >').css("justify-content","flex-start")
            $("div[class^='col']").css("justify-content","flex-end")
            indice[j-1]=indice[j-1]-1;
          }
      }
  }

  if (numDulces==49){
    clearInterval(rellenarDulces);
    eliminar = setInterval(function (){eliminarActivos()},150);
  }

  }
function tiempo(){

  if (segundos == 0){
    segundos = 60;
    minutos = minutos - 1;
  }
  if (segundos!=0){
    segundos = segundos - 1
  }
  if( segundos == 0 && minutos == 0){
    clearInterval(timer);
    $('.panel-tablero').hide();
    $('.elemento').hide();
    $('.panel-score').css('width','100%')
    $('div.time').hide();
  }
  if(segundos > 9 )
  {
      $('#timer').html("0"+minutos+":"+segundos)
  }else{
    $('#timer').html("0"+minutos+":0"+segundos)
  }


}
function eliminarActivos(){
  numDulces = 0;
  for(var j=1;j<8;j++)
    {
      numDulces=numDulces+$(".col-"+j).children().length;
    }
  if (bVertical() || bHorizontal() && numDulces==49){

    $("div[class^='col']").css("justify-content","flex-end")
    $('.activo').hide('pulsate',1000,function(){
    var activos = $('.activo').length;
        $('.activo').remove('img');
        score = score+activos;
        $('#score-text').html(score)
    })
  }
  if (!bVertical() && !bHorizontal() && numDulces!=49 && indicador == true){
    for (j=1;j<8;j++){
        indice [j-1] = 7 - $(".col-"+j).children().length
    }
    clearInterval(eliminar)
    rellenarDulces = setInterval(function(){nuevosDulces(indice)},800)

  }


};
$(function (){
  setInterval(function(){cambioColor()},1100);
  $('.btn-reinicio').on('click',function(){
    inicioVariables();
    timer = setInterval(function(){tiempo()},1000)
    crearDulces = setInterval(function(){lineaDulces()},800)



  })

})
