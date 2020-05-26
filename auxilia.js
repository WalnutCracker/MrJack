/**ficheiro de funções auxiliares */
/********* OCULTA A DIV JACK**********/


/**questiona se o jack esta sobre luz */

/** CODIGO DE LIMITAÇÂO DE CASAS */

/**fução duplicada */
function limpaCasas() {
  var y = document.getElementsByClassName("casa");
  var i;
  for (i = 0; i < y.length; i++) {
    y[i].removeAttribute("ondrop");
    y[i].removeAttribute("ondragover");
  }
}
