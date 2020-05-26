/*****************************Setup do jogo**************************************/
window.onload = carregaJogo;
/********************funções d ecarregamento de jogo*************/
var casasPermitidas = [18, 20, 23, 25, 27, 28, 34, 37, 39, 43, 44, 45, 46, 47, 50, 51, 54, 57, 58, 59, 60, 61, 62, 63, 68, 71, 73, 75, 76, 77, 78, 79, 83, 86, 89, 90, 91, 92, 93, 95, 98, 101, 105, 106, 107, 108, 109, 110, 111, 115, 118, 119, 121, 122, 123, 124, 125, 130, 132, 135, 140, 141, 143, 146, 149, 151];
var casasDaMS = [35, 36, 41, 42, 52, 53, 55, 66, 67, 69, 70, 74, 82, 84, 85, 87, 94, 99, 100, 102, 103, 114, 116, 117, 126, 127, 131, 133, 134, 142];
//let numCasas = [];
let startPosition = [27, 60, 77, 79, 89, 91, 108, 141];
let idc3 = [5, 1, 4, 2, 6, 8, 3, 7];
let startCandeeiro = [42, 55, 69, 100, 114, 126];
let ordemCande = [4, 1, 5, 6, 2, 3];
var tuneisEsgoto = [20, 39, 57, 68, 95, 101, 122, 149];
var esgotosAbertos = [20, 57, 68, 95, 101, 149];
let starterEsgoto = [39, 122];
let starterBarreira = [23, 146];
var jackTheRipper;
var chrsShuf;
var totalTurn = 8;
let i = 1;
var total = 0;
var apagaCande = 0;
var playr1 = true;
var playr2 = false;
var lastMove;
var specMove = false;
var allMove = false;
var moves = 0;
var movEspPre = 0;
var bloqueioDeSeguranca = true;

/** carregaJogo faz:
 * cria 169 casas com umas condições verificando o se o numero de i pertence a algum dos arrays
 * caso pertenca a um dos arrays acima faz:
 * casasPermitidas <- assume uma cor
 * casasDaMs <- são ignoradas, mais tarde serão actualizadas
 * idc <-é a ordem de entrada das personagens
 * startCandeeiro <- são as casas onde os candeeiros podem ficar
 * ordemCande <- é a ordem pelo que as tiles de candeeiro entram
 * starterEsgoto <- é onde o esgoto começa
 * starterBarreira <- onde as barreiras começam
 */
function carregaJogo () {
    for (var i = 1; i < 169; i++) {
        //criar as casas do tabuleiro
        let casinhas = document.createElement("DIV");
        casinhas.setAttribute("class", "casa");
        casinhas.setAttribute("id", i);
        document.getElementById("tabuleiro").appendChild(casinhas);
        //os peões
        var f = i;
        if (startPosition.includes(f)) {
            //o idc2 é inutil?
            //let idc2 = [7, 3, 8, 6, 2, 4, 1, 5];
            let poppou = idc3.pop();
            let player = document.createElement("IMG");
            player.setAttribute("class", "plr");
            player.setAttribute("id", "drag" + poppou);
            player.setAttribute("src", "./assets/" + poppou + ".png");
            player.setAttribute("width", "35");
            player.setAttribute("height", "35");
            player.setAttribute("z-index", "10");
            document.getElementById(f).appendChild(player);
            startPosition.shift();
        };

        //candeeiros
        if (startCandeeiro.includes(f)) {
            let candou = ordemCande.pop();      
            let candeeiro = document.createElement("IMG");
            candeeiro.setAttribute("class", "cndro");
            candeeiro.setAttribute("id", "candeeiro" + candou);
            candeeiro.setAttribute("src", "./assets/cande" + candou + ".png");
            candeeiro.setAttribute("width", "49");
            candeeiro.setAttribute("height", "49");
            candeeiro.setAttribute("z-index", "-1");      
            document.getElementById(f).appendChild(candeeiro);
            startCandeeiro.shift();
        };

        //esgotos
        if (starterEsgoto.includes(f)) {
            let esgoto = document.createElement("IMG");
            esgoto.setAttribute("class", "esgoto");
            esgoto.setAttribute("id", "esgoto" + f);
            esgoto.setAttribute("src", "./assets/esgoto.png");
            esgoto.setAttribute("width", "49");
            esgoto.setAttribute("height", "49");
            esgoto.setAttribute("z-index", "-1");
            document.getElementById(f).appendChild(esgoto);
        };

        //barreiras
        if (starterBarreira.includes(f)) {
            let barreira = document.createElement("IMG");
            barreira.setAttribute("class", "barreira");
            barreira.setAttribute("id", "barreira" + f);
            barreira.setAttribute("src", "./assets/barr.png");
            barreira.setAttribute("width", "49");
            barreira.setAttribute("height", "49");
            barreira.setAttribute("padding", "none");
            barreira.setAttribute("margin", "none");
            barreira.setAttribute("z-index", "-1");
            document.getElementById(f).appendChild(barreira);
        };
    }
    var posDivX = document.getElementById("89").offsetTop;
    var posDivY = document.getElementById("89").offsetLeft;
    var lant = document.getElementById('setaimg');
    lant.style.left = (posDivY+15)+'px';
    lant.style.top = (posDivX-25)+'px';
};
/** ao pressionar o botão a funçao iniciajogo():
 * copia as personagens (numeros de chrs) para o chrsShuf e randomiza
 * adiciona a ultima casa do chrsShuf a variavel jackTheRipper
 * oculta o botão iniciar
 *  cria o botão para mostrar e ocultar a  carta testemunha que vai ser o jack
 * cria a div para mais tarde dar informação se o jack esta visivel ou invisivel~
 * chama as duas funções que vai criar o resto das informações da ronda. detalhes não explicados
 */
function iniciaJogo() {
  var chrs = [1, 2, 3, 4, 5, 6, 7, 8];
  chrsShuf = chrs.sort(function (a, b) { return 0.5 - Math.random() });
  jackTheRipper = chrsShuf.pop();
  //console.log("resta", chrsShuf, "oJack é:", jackTheRipper);
  var i = document.getElementsByClassName("inicia");
  if (i[0].style.display === "none") {
    i[0].style.display = "block";
  } else {
    i[0].style.display = "none";
  }

  /** o botão do jack *******************************************************************/
  let jackRipper = document.createElement("BUTTON");
  let textoN = document.createTextNode("Show/hide Jack");

  jackRipper.setAttribute("class", "hideJack");
  jackRipper.setAttribute("onclick", "olhoJack()");
  jackRipper.appendChild(textoN);

  document.getElementsByClassName('info')[0].appendChild(jackRipper);
  document.getElementById("crts").style.backgroundColor = "#e6e6e6";

  /**imagem com a identidade do jack, ela tem de começar hidden *****/
  let jack = document.createElement("IMG");
  jack.setAttribute("class", "jack");
  jack.setAttribute("id", "jack" + jackTheRipper);
  jack.setAttribute("src", "./assets/Scan0" + jackTheRipper + ".png");
  jack.style.display = "none";
  document.getElementsByClassName("info")[0].appendChild(jack);

  let oJackEstaVisivel = document.createElement("IMG");
  oJackEstaVisivel.setAttribute("class", "visornot");
  oJackEstaVisivel.setAttribute("id", "visornot");
  //oJackEstaVisivel.setAttribute("background-color")

  var sp0 = jackRipper; //<- botão de mostra/oculta jack
  var sp2 = jack; //<- a imagem
  var sp3 = oJackEstaVisivel; //<- a imagem que diz a todos se esta visivel
  var sp1 = document.getElementsByClassName("cartas")[0];
  var divCartas = sp1.parentNode;

  divCartas.insertBefore(sp0, sp1);//<-procurei por isto insertBefore
  divCartas.insertBefore(sp2, sp1);
  divCartas.insertBefore(sp3, sp1);
  /** o sp2, vem antes do sp1, e o sp0 vem antes do sp1 */

  carregaRonda(); //<- AQUI É CARREGADO AS CARTAS DE JOGO
  criaResto(); //<- AQUI É CARREGADO O RELOGIO E SEMELHANTES
  // FUNCÇÕES CRIADAS A BAIXO
  return chrsShuf;
}
/** carregaRonda faz o seguinte
 * pega no array com o numero das personagens
 * faz um shuffle do array
 * divide em duas partes, uma por ronda quando as duas partes forem usadas será feito o shuffle outra vez
 * a segunda parte começa hidden mas ja esta la definida
 */
function carregaRonda() {
  var cartasJogo = [1, 2, 3, 4, 5, 6, 7, 8];
  var cartasJogoShuf = cartasJogo.sort(function (a, b) { return 0.5 - Math.random() });

  let part1 = document.createElement("DIV");
  part1.setAttribute("class", "cartas1");
  part1.setAttribute("id", "cartas1");
  document.getElementsByClassName("cartas")[0].appendChild(part1);

  let part2 = document.createElement("DIV");
  part2.setAttribute("class", "cartas2");
  part2.setAttribute("id", "cartas2");
  document.getElementsByClassName("cartas")[0].appendChild(part2);
  document.getElementById("cartas2").hidden = true;

  for (i = 0; i < 8; i++) {
    if (i < 4) {
      let sChar = cartasJogoShuf.pop();
      let plChar = document.createElement("IMG");
      plChar.setAttribute("class", "plChar");
      plChar.setAttribute("id", "char" + sChar);
      plChar.setAttribute("src", "./assets/Perso0" + sChar + ".png");
      plChar.setAttribute("onclick", "escolha" + sChar + "j(this)");
      document.getElementsByClassName("cartas1")[0].appendChild(plChar);
      console.log(cartasJogoShuf);
    } else {
      let sChar = cartasJogoShuf.pop();
      let plChar = document.createElement("IMG");
      plChar.setAttribute("class", "plChar");
      plChar.setAttribute("id", "char" + sChar);
      plChar.setAttribute("src", "./assets/Perso0" + sChar + ".png");
      plChar.setAttribute("onclick", "escolha" + sChar + "j(this)");
      document.getElementsByClassName("cartas2")[0].appendChild(plChar);
    }
    console.log("falta", cartasJogoShuf);
  }
}
/** o criaResto cria:
 * o relogio que indica a passagem das rondas
 * as zonas onde estarao o restante das testemunhas
 * a zona onde estarão as proximas cartas as serem tiradas, se tiver algo é porque nao sera feito shuffle na proxima ronda,
 */
function criaResto() {
  let relogio = document.createElement("IMG");
  relogio.setAttribute("class", "relogio");
  relogio.setAttribute("id", "relogio");
  relogio.setAttribute("src", "./assets/torre8.png");
  relogio.setAttribute("height", "150px");
  document.getElementById("restoDasCoisas").appendChild(relogio);

  /** cria carta BG de testeunha */
  let testemunha = document.createElement("IMG");
  testemunha.setAttribute("class", "restoTestemunha");
  testemunha.setAttribute("id", "restoTestemunha");
  testemunha.setAttribute("src", "./assets/bgCard1.png");
  testemunha.setAttribute("height", "150px");
  document.getElementById("restoDasCoisas").appendChild(testemunha);

  /** cria proximas BG cartas */
  let proxCartas = document.createElement("IMG");
  proxCartas.setAttribute("class", "restoCartas");
  proxCartas.setAttribute("id", "restoCartas");
  proxCartas.setAttribute("src", "./assets/bgCard2.png");
  proxCartas.setAttribute("height", "150px");
  document.getElementById("restoDasCoisas").appendChild(proxCartas);
}

/** aqui definimos a função que pertime ao jogador que usa o JACK (jogador cinzento)
 * exiba ou oculte a janela com a carta que indica qual a personagem é o estripador
 */
function olhoJack() {
  var i = document.getElementsByClassName("jack");
  if (i[0].style.display === "none") {
    i[0].style.display = "block";
  } else {
    i[0].style.display = "none";
  }
}

/** aqui estão as funções que são chamadas ao clicar na carta da peça que queremos mexer
 * a função tem sempre o mesmo formato
 * retina o click dos outros peões
 * adiciona o drag aos mesmos
 * remove o onclick da carta selecionada
 */
function escolha1j(card) {
  //vermelho
  retiraClickPeoes();
  this.lastMove = card.id;
  var cardID = card.id;
  var cartaoPersona = cardID.substring(4);
  document.getElementById("drag" + cartaoPersona).setAttribute("draggable", "true");
  document.getElementById("drag" + cartaoPersona).setAttribute("ondragstart", "drag(event, this)");
  document.getElementById(card.id).style.opacity = "0.7";
  document.getElementById(card.id).removeAttribute("onclick");

  document.getElementById("restoTestemunha").setAttribute("onclick", "sacaTestemunha()");
  /** acima muda a imagem criada no carrega ronda */
  }
function escolha2j(card) {
  //castanho
  retiraClickPeoes();
  this.lastMove = card.id;
  var cardID = card.id;
  var cartaoPersona = cardID.substring(4);
  document.getElementById("drag" + cartaoPersona).setAttribute("draggable", "true");
  document.getElementById("drag" + cartaoPersona).setAttribute("ondragstart", "drag(event, this)");
  document.getElementById(card.id).style.opacity = "0.7";
  document.getElementById(card.id).removeAttribute("onclick");
}
function escolha3j(card) {
  //amarelo
  retiraClickPeoes();
  this.lastMove = card.id;
  var cardID = card.id;
  var cartaoPersona = cardID.substring(4);
  document.getElementById("drag" + cartaoPersona).setAttribute("draggable", "true");
  document.getElementById("drag" + cartaoPersona).setAttribute("ondragstart", "drag(event, this)");
  document.getElementById(card.id).style.opacity = "0.7";
  document.getElementById(card.id).removeAttribute("onclick");

  let todosOsCandeeiros = document.getElementsByClassName("cndro");
  for (let i = 0; i < todosOsCandeeiros.length; i++) {
    todosOsCandeeiros[i].setAttribute("draggable", "true");
    todosOsCandeeiros[i].setAttribute("ondragstart", "drag(event, this)");
  }

  dropCand();
}
function escolha4j(card) {
  // Azul
  retiraClickPeoes();
  this.lastMove = card.id;
  var cardID = card.id;
  var cartaoPersona = cardID.substring(4);
  document.getElementById("drag" + cartaoPersona).setAttribute("draggable", "true");
  document.getElementById("drag" + cartaoPersona).setAttribute("ondragstart", "drag(event, this)");
  document.getElementById(card.id).style.opacity = "0.7";
  document.getElementById(card.id).removeAttribute("onclick");

  let barrie = document.getElementsByClassName("barreira");
  for (let i = 0; i < barrie.length; i++) {
    barrie[i].setAttribute("draggable", "true");
    barrie[i].setAttribute("ondragstart", "drag(event, this)");

  }
   dropBarrie();
}
function escolha5j(card) {
  //verde
  retiraClickPeoes();
  this.lastMove = card.id;
  var cardID = card.id;
  var cartaoPersona = cardID.substring(4);
  document.getElementById("drag" + cartaoPersona).setAttribute("draggable", "true");
  document.getElementById("drag" + cartaoPersona).setAttribute("ondragstart", "drag(event, this)");
  document.getElementById(card.id).style.opacity = "0.7";
  document.getElementById(card.id).removeAttribute("onclick");
  missStelEsp();
}
function escolha6j(card) {
  //preto
  retiraClickPeoes();
  this.lastMove = card.id;
  var cardID = card.id;
  var cartaoPersona = cardID.substring(4);
  document.getElementById("drag" + cartaoPersona).setAttribute("draggable", "true");
  //document.getElementById("drag" + cartaoPersona).setAttribute("ondragstart", "drag(event, this)");
  document.getElementById(card.id).style.opacity = "0.7";
  document.getElementById(card.id).removeAttribute("onclick");

  this.bloqueioDeSeguranca = false;

  let pretoSpecial = document.getElementsByClassName("plr");
  for (let i = 0; i < pretoSpecial.length; i++) {
    pretoSpecial[i].setAttribute("draggable", "true");
    pretoSpecial[i].setAttribute("ondragstart", "drag(event, this)");
    //pretoSpecial[i].setAttribute("ondragstart", "pretoEspecial(event, this)");
  }
  document.getElementById("drag" + cartaoPersona).setAttribute("ondragstart", "drag(event, this)");
}
function escolha7j(card) {
  //roxo
  retiraClickPeoes();
  this.lastMove = card.id;
  var cardID = card.id;
  var cartaoPersona = cardID.substring(4);
  document.getElementById("drag" + cartaoPersona).setAttribute("draggable", "true");
  document.getElementById("drag" + cartaoPersona).setAttribute("ondragstart", "drag(event, this)");
  document.getElementById("drag" + cartaoPersona).setAttribute("onclick", "roxoSpecMov()")
  document.getElementById(card.id).style.opacity = "0.7";
  document.getElementById(card.id).removeAttribute("onclick");
}
function escolha8j(card) {
  // laranja
  retiraClickPeoes();
  this.lastMove = card.id;
  var cardID = card.id;
  var cartaoPersona = cardID.substring(4);
  document.getElementById("drag" + cartaoPersona).setAttribute("draggable", "true");
  document.getElementById("drag" + cartaoPersona).setAttribute("ondragstart", "drag(event, this)");
  document.getElementById(card.id).style.opacity = "0.7";
  document.getElementById(card.id).removeAttribute("onclick");

  let esgt = document.getElementsByClassName("esgoto");

  for (let i = 0; i < esgt.length; i++) {
    esgt[i].setAttribute("draggable", "true");
    esgt[i].setAttribute("ondragstart", "drag(event, this)");

  }

  dropEsgt();
}

/**termina mov faz coisas sempre que um movimento é terminado, entre elas
 * inicia limpando o movimento antrior reiniciando o contador para permitir o proximo LimpaMo (explicações mais abaixo)
 * cada vez que a função é chamada um candeeiro é apagado
 * caso as 8 cartas tenham sido jogadas, ele reinicia as escolhas para a posição original e carrega a ronda
 * else caso as 4 tenham sido jogadas ele mostra a segunda div de escolhas
 * muda a cor do fundo que indica de quem é a vez de jogar
 * apaga o candeeiro correspondente
*/
function terminaMov(este) {
    this.specMove = false;
    this.allMove = false;
    this.moves = 0;
    limpaMo();
    var apgd = document.getElementById("botFim");
    apgd.parentNode.removeChild(apgd);
  
    this.total++;
    this.apagaCande++;
    if (total === 8) {
      total = 0;
      /** ele aqui deveria apagar toda as cartas abrindo espaço para novas */
      var apaCard = document.getElementsByClassName("cartas1")[0];
      apaCard.parentNode.removeChild(apaCard);
      var apaCard2 = document.getElementsByClassName("cartas2")[0];
      apaCard2.parentNode.removeChild(apaCard2);
      document.getElementById("restoCartas").hidden = false;
  
      this.carregaRonda();
      console.log("nova Ronda:", this.cartasJogoShuf)
    } else if (total === 4) {
      document.getElementById("cartas1").hidden = true;
      document.getElementById("cartas2").hidden = false;
      document.getElementById("restoCartas").hidden = true;
    }
  
    /**determina de quem é a vez de jogar */
    //var p = document.getElementsByClassName("cartas");
    if (total === 0 || total === 3 || total === 5 || total === 6) {
      document.getElementById("crts").style.backgroundColor = "#e6e6e6";
      playr1 = true;
      playr2 = false;
    } else if (total === 1 || total === 2 || total === 4 || total === 7) {
      document.getElementById("crts").style.backgroundColor = "#e4cd81";
      playr1 = false;
      playr2 = true;
    }
  
    /** adicionar o apagar candeeiros */
    if (apagaCande === 4) {
      document.getElementById("candeeiro1").hidden = true;
      document.getElementById("relogio").setAttribute("src", "./assets/torre7.png");
    } else if (apagaCande === 8) {
      document.getElementById("candeeiro2").hidden = true;
      document.getElementById("relogio").setAttribute("src", "./assets/torre6.png");
      question();
    } else if (apagaCande === 12) {
      document.getElementById("candeeiro3").hidden = true;
      document.getElementById("relogio").setAttribute("src", "./assets/torre5.png");
      question();
    } else if (apagaCande === 16) {
      document.getElementById("candeeiro4").hidden = true;
      document.getElementById("relogio").setAttribute("src", "./assets/torre4.png");
      question();
    } else if (apagaCande === 20) {
      document.getElementById("relogio").setAttribute("src", "./assets/torre3.png");
      question();
    } else if (apagaCande === 24) {
      document.getElementById("relogio").setAttribute("src", "./assets/torre2.png");
      question();
    } else if (apagaCande === 28) {
      document.getElementById("relogio").setAttribute("src", "./assets/torre1.png");
      question();
    } else if (apagaCande === 32) {
      endGameJackWIN();
    }
  
}

  /**As seguintes funções fazem
   * limpaMo <- remove a possibilidade de fazer drag and drop
   * limpaCasas <- limpa as casas possiveis de serem jogadas
   * limpaSpMo <- limpa os movimentos especiais das casas possiveis de serem mudadas como candeeiros e barreiras e esgotos
   * o objectivo é evitar drags futuros e indesejados
   */
function limpaMo() {
    var y = document.getElementsByClassName("plr");
    var i;
    for (i = 0; i < y.length; i++) {
      y[i].removeAttribute("draggable");
      y[i].removeAttribute("ondragstart");
      y[i].removeAttribute("onclick")
    }
}
function limpaCasas() {
    var h = document.getElementsByClassName("casa");
    var i;
    for (i = 0; i < h.length; i++) {
      h[i].removeAttribute("ondrop");
      h[i].removeAttribute("ondragover");
    }
}  
function limpaSpMo() {  
    var x = document.getElementsByClassName("cndro");
    for (i = 0; i < x.length; i++) {
      x[i].removeAttribute("draggable");
      x[i].removeAttribute("ondragstart");
    }
  
    var w = document.getElementsByClassName("barreira");
    for (i = 0; i < w.length; i++) {
      w[i].removeAttribute("draggable");
      w[i].removeAttribute("ondragstart");
    }
  
    var z = document.getElementsByClassName("esgoto");
    for (i = 0; i < z.length; i++) {
      z[i].removeAttribute("draggable");
      z[i].removeAttribute("ondragstart");
    }
}


/**aqui estão as funções que pertime quais casas podem receber o drop
 * este função é activada sempre que uma peça é pegada (usando o drag)
 */
function adicionaDrop(casinhas) {
  let a0 = casinhas - 9;
  let a1 = casinhas - 8;
  let b1 = casinhas - 16;
  let c1 = casinhas - 7;  
  let d0 = casinhas + 7;
  let d1 = casinhas + 8;
  let e1 = casinhas + 16;
  let f1 = casinhas + 9;

  
  let possibilidades = [a0, a1, b1, c1, d0, d1, e1, f1];

  //comunicações por tuneis
  if (esgotosAbertos.includes(casinhas)){
    for(i = 0; i < esgotosAbertos.length; i++){
    let tun = document.getElementById(esgotosAbertos[i]);
    console.log(tun);
    tun.setAttribute("ondrop", "drop(event, this)");
    tun.setAttribute("ondragover", "allowDrop(event, this)");
    }
  }
  console.log("esta div:", casinhas, "e as div possiveis sao:", possibilidades);

  let am0 = document.getElementById(casinhas - 9);
  if (casasPermitidas.includes(casinhas - 9)) {
    am0.setAttribute("ondrop", "drop(event, this)");
    am0.setAttribute("ondragover", "allowDrop(event, this)");
  }
  let a = document.getElementById(casinhas - 8);
  if (casasPermitidas.includes(casinhas - 8)) {
    a.setAttribute("ondrop", "drop(event, this)");
    a.setAttribute("ondragover", "allowDrop(event, this)");
  }
  let b = document.getElementById(casinhas - 16);
  if (casasPermitidas.includes(casinhas - 16)) {
    b.setAttribute("ondrop", "drop(event, this)");
    b.setAttribute("ondragover", "allowDrop(event, this)");
  }
  let c = document.getElementById(casinhas - 7);
  if (casasPermitidas.includes(casinhas - 7)) {
    c.setAttribute("ondrop", "drop(event, this)");
    c.setAttribute("ondragover", "allowDrop(event, this)");
  }

  let dm0 = document.getElementById(casinhas + 7);
  if (casasPermitidas.includes(casinhas + 7)) {
    dm0.setAttribute("ondrop", "drop(event, this)");
    dm0.setAttribute("ondragover", "allowDrop(event, this)");
  }

  let d = document.getElementById(casinhas + 9);
  if (casasPermitidas.includes(casinhas + 9)) {
    d.setAttribute("ondrop", "drop(event, this)");
    d.setAttribute("ondragover", "allowDrop(event, this)");
  }
  let e = document.getElementById(casinhas + 16);
  if (casasPermitidas.includes(casinhas + 16)) {
    e.setAttribute("ondrop", "drop(event, this)");
    e.setAttribute("ondragover", "allowDrop(event, this)");
  }
  let f = document.getElementById(casinhas + 8);
  if (casasPermitidas.includes(casinhas + 8)) {
    f.setAttribute("ondrop", "drop(event, this)");
    f.setAttribute("ondragover", "allowDrop(event, this)");
  }
}
 
/** adicionado as funções que permite o DRAG
 * a variavel candee não foi utulizada ainda
 */
function drag(ev, cenas) {
  ev.dataTransfer.setData("text", ev.target.id);
  let estaDiv = parseInt(ev.path[1].id);
  let perMovi = ev.path[0].id;
  console.log("drag", estaDiv, ev.target, perMovi);

  //var candee = ["candeeiro1", "candeeiro2", "candeeiro3", "candeeiro4", "candeeiro5", "candeeiro6"];
  var naoJogador = ["drag1", "drag2", "drag3", "drag4", "drag5", "drag6", "drag7","drag8"];

  if (naoJogador.includes(perMovi)){
  adicionaDrop(estaDiv);
  } else if(perMovi === "esgoto39" || perMovi === "esgoto39") {
    dropEsgt();
  } else if (perMovi ==="barreira23"|| perMovi ==="barreira146") {
    dropBarrie();
  } else {
    dropCand();
  }
}

/** Adicionando a função o alow drop */
function allowDrop(ev, dedo) {
  ev.preventDefault();
  let x = document.getElementsByClassName('casa').id;
  console.log("isto e a div", x);
}

/** adiciona a função de drop ao jogo
 * esta função é chamada sempre que o drop é feito
 * é usado para limitar o maximo de movimentos permitidos e o que acontece
 * de acordo com a personagem usada diferentes efeitos surgem
 * função de cada personagem depois desta
 */
function drop(ev, nariz) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  nariz.appendChild(document.getElementById(data));

  let x = document.getElementById(nariz.id).children[0];
  let sinal = x.id;

  var outrosItems = ["candeeiro1", "candeeiro2", "candeeiro3", "candeeiro4", "candeeiro5", "candeeiro6", "esgoto39", "esgoto122", "barreira23", "barreira146"];

  /** movimento especial/ drag and drop */
  if (outrosItems.includes(sinal) && specMove === false) {
    this.specMove = true;
    limpaSpMo();
  } else {
    this.moves++;
  }

  if (sinal === "drag1" && moves > 2) {
    //var a = document.getElementById("restoTestemunha").setAttribute("onclick", "sacaTestemunha()");
    sacaTestemunha();
    this.moves = 0;
    this.specMove = false;
    this.allMove = false;
  }

  if (sinal === "drag2" && moves > 2) {
    mudaDirect();
    this.specMove = true;
  }


  if (sinal === "drag5" && moves > 3) {
    removeMsSpec();
    terminaMov();
    this.moves = 0;
    this.specMove = false;
    this.allMove = false;
  }

  if (this.bloqueioDeSeguranca === false && sinal !== "drag6") {
    this.moves--;
    this.movEspPre++;
    if (this.movEspPre > 2) {
      let ptScl = document.getElementsByClassName("plr");
      for (let i = 0; i < ptScl.length; i++) {
        ptScl[i].removeAttribute("draggable");
        ptScl[i].removeAttribute("ondragstart");
        let restoraPreto = document.getElementById("drag6");
        restoraPreto.setAttribute("draggable", "true");
        restoraPreto.setAttribute("ondragstart", "drag(event, this)");
      }
      this.bloqueioDeSeguranca = true
      this.specMove = true;
    }
  }

  if (sinal === "drag7" && moves > 0) {
    document.getElementById("drag7").removeAttribute("onclick");
    this.specMove = true;
    if (this.moves === 3) {
      terminaMov();
      this.moves = 0;
      this.specMove = false;
      this.allMove = false;
    }
  }

  if ((sinal === "drag2" || sinal === "drag3" || sinal === "drag4" || sinal === "drag6" || sinal === "drag8") && moves > 2) {
    this.allMove = true;
    if (bloqueioDeSeguranca === true) {
      var b = document.getElementById("drag6");
      b.removeAttribute("draggable");
      b.removeAttribute("ondragstart");

    }
    var a = document.getElementsByClassName("plr");
    var i;
    for (i = 0; i < a.length; i++) {
      a[i].removeAttribute("draggable");
      a[i].removeAttribute("ondragstart");
      a[i].removeAttribute("onclick");

      this.moves = 0;
    }
  }


  if (allMove === true && specMove === true) {
    terminaMov();
    this.moves = 0;
    this.specMove = false;
    this.allMove = false;
  }
  console.log("movimento", moves, "Special", specMove);
  //console.log('dentro do drop:', nariz.id, ev);
  //console.log("dentro do drop, isto e a div", x.id, specMove);
  //console.log("movimento", moves, x.class)
  limpaCasas();
}

//FUNÇÕES ESPECIAIS
/**função usada pelo Sherlock */
function sacaTestemunha(chrsShuf) {
  var t = this.chrsShuf.pop();
  let testExibit = document.createElement("IMG");
  testExibit.setAttribute("class", "testemu");
  testExibit.setAttribute("src", "./assets/Scan0" + t + ".png");
  testExibit.setAttribute("height", "100px")

  if (this.playr1 === true) {
    document.getElementsByClassName("playr1")[0].appendChild(testExibit);

    console.log("falta as seguintes t", this.chrsShuf);
    var t = this.chrsShuf.pop();
    console.log("esta t", t);
  } else if (this.playr2 === true) {
    document.getElementsByClassName("playr2")[0].appendChild(testExibit);

    console.log("falta as seguintes t", this.chrsShuf);
    var t = this.chrsShuf.pop();
    console.log("esta t", t);
  }

  document.getElementById("restoTestemunha").removeAttribute("onclick");
  terminaMov();

}

/** funções que permitem o drop dos esgotos, candeeiros e barreiras 
 * ao fazer o drag as funções são activadas consoante as necessidades
*/
function dropEsgt() {
  var casaEsgoto = [20, 39, 57, 68, 95, 101, 122, 149];
  for (i = 0; i < casaEsgoto.length; i++) {
    let a = document.getElementById(casaEsgoto[i]);
    a.setAttribute("ondrop", "drop(event, this)");
    a.setAttribute("ondragover", "allowDrop(event, this)");
  }
}
function dropCand() {
  var casaCandeeiro = [36, 42, 55, 69, 100, 114, 126, 133];
  for (i = 0; i < casaCandeeiro.length; i++) {
    let a = document.getElementById(casaCandeeiro[i]);
    a.setAttribute("ondrop", "drop(event, this)");
    a.setAttribute("ondragover", "allowDrop(event, this)");
  }
}
function dropBarrie() {
  var casaBarreira = [18, 23, 146, 143];
  for (i = 0; i < casaBarreira.length; i++) {
    let a = document.getElementById(casaBarreira[i]);
    a.setAttribute("ondrop", "drop(event, this)");
    a.setAttribute("ondragover", "allowDrop(event, this)");
  }
}

/** funções usadas pela personagem da miss Stealth
 * a função é chamada quando se seleciona a MS e é removida quando se termina o movimento
 */
function missStelEsp() {
  for (i = 0; i < jogPorMS.length; i++) {
    let a = document.getElementById(jogPorMS[i]);
    a.setAttribute("ondrop", "drop(event, this)");
    a.setAttribute("ondragover", "allowDrop(event, this)");
  }
}
function removeMsSpec() {
  for (i = 0; i < jogPorMS.length; i++) {
    let a = document.getElementById(jogPorMS[i]);
    a.removeAttribute("ondrop");
    a.removeAttribute("ondragover");
  }
}

/** o roxo esta dividido em duas partes
 * ao selecionar a carta ele actica o click event
 * ao clicar chama a primeira função que activa o click de todas as persnagens
 * ao clickar na segunda a personagem é trocada
 * activar o primeiro click impossibilita movimentos
 * movimentar impossibilita o click
 */
/** MOV ESPECIAL DO ROXO */
function roxoSpecMov() {
  let roxoSpecial = document.getElementsByClassName("plr");
  for (let i = 0; i < roxoSpecial.length; i++) {
    roxoSpecial[i].setAttribute("onclick", "roxoEspecial(this)");
  }
}
/** roxo especial part 2 */
function roxoEspecial(mud) {
  let copiaId = mud.id;
  let copiaSrc = mud.src;
  var seca = copiaSrc.lastIndexOf("assets");
  var fonte = copiaSrc.substr(seca);
  var idSimplex = copiaId.substring(4);
  console.log(fonte, seca);
  document.getElementById("drag7").setAttribute("src", "./" + fonte);
  document.getElementById(copiaId).setAttribute("src", "./assets/7.png");
  document.getElementById("drag7").setAttribute("id", "drag");
  document.getElementById(copiaId).setAttribute("id", "drag7");
  document.getElementById("drag").setAttribute("id", "drag" + idSimplex);
  terminaMov();
}

/** funções de mostra e ocultação das testemunhas de cada jogador  */
function hidepla1() {
  var i = document.getElementsByClassName("playr1");
  if (i[0].style.display === "none") {
    i[0].style.display = "block";
  } else {
    i[0].style.display = "none";
  }
}
function hidepla2() {
  var i = document.getElementsByClassName("playr2");
  if (i[0].style.display === "none") {
    i[0].style.display = "block";
  } else {
    i[0].style.display = "none";
  }
}

/** depois da segunda ronda, a cada nova é perguntado se o jack esta oculto ou não
 * oculto significa que não esta ao lado de nenhuma peça nem sob luz
 * se estiver sozinho e sem fontes de luz significa que ele esta oculto
 */
function question() {
  var cenas = document.getElementById("testConfrm");
  cenas.style.display = "block"
  let quest = document.createElement("DIV");
  quest.setAttribute("class", "testemunhaEscolha");
  quest.setAttribute("id", "testemunhaEscolha");

  let pos = document.createElement("IMG");
  pos.setAttribute("class", "jQuest");
  pos.setAttribute("id", "simesta");
  pos.setAttribute("src", "assets/test.png");
  pos.setAttribute("onclick", "estaTestemunhado()");
  pos.setAttribute("height", "250px");

  let pos2 = document.createElement("IMG");
  pos2.setAttribute("class", "jQuest");
  pos2.setAttribute("id", "naoesta");
  pos2.setAttribute("src", "assets/notTest.png");
  pos2.setAttribute("onclick", "naoEstaTestemunhado()");
  pos2.setAttribute("height", "250px");

  quest.appendChild(pos);
  quest.appendChild(pos2);
  document.getElementById("testConfrm").appendChild(quest);
}

/** depois de respondido da função questions resolvida estas funções são chamadas */
function estaTestemunhado() {
  document.getElementById("visornot").setAttribute("src", "assets/test.png");
  var cenas = document.getElementById("testConfrm");
  cenas.style.display = "none";
  let apgesc= document.getElementById("testemunhaEscolha");
  document.getElementById("testConfrm").removeChild(apgesc);
  colocaClickPeoes();
}

function naoEstaTestemunhado() {
  document.getElementById("visornot").setAttribute("src", "assets/notTest.png");
  var cenas = document.getElementById("testConfrm");
  cenas.style.display = "none";
  let apgesc= document.getElementById("testemunhaEscolha");
  document.getElementById("testConfrm").removeChild(apgesc);
  colocaClickPeoes()
}

/*permite clickar nos pões do campo quando se for respondido a testemunha*/
function colocaClickPeoes() {
  let poePeoesComClick = document.getElementsByClassName("plr");
  for (let i = 0; i < poePeoesComClick.length; i++) {
      poePeoesComClick[i].setAttribute("onclick", "cenas(this)");
  }
}

/** retira o click adicionado acima */
function retiraClickPeoes() {
  let poePeoesComClick = document.getElementsByClassName("plr");
  for (let i = 0; i < poePeoesComClick.length; i++) {
      poePeoesComClick[i].removeAttribute("onclick");
  }
}


/** função para tornar peça testemunhada
 * isso acontece após a resposta a questão que foi feita
 * é o jogador neste caso o detective que tem de cliclar nas peças uma a uma
 */
function cenas(att) {
  console.log(att.id);
  var attId = att.id;
  var idp = attId.substring(4);
  document.getElementById(att.id).setAttribute("src", "./assets/" + idp + "ds.png");
}

/** faz o hadle de clicks dos peões  */


/**função de fim do jogo esta função +e camada caso o jack consiga fugir */
function endGameJackWIN() {
  let endGame = document.createElement("IMG");
  endGame.setAttribute("class", "endGame");
  endGame.setAttribute("id", "endGame");
  endGame.setAttribute("width", "100%");
  endGame.setAttribute("src", "./assets/gameOver.png");

  document.getElementsByTagName("body")[0].appendChild(endGame);
}

/**modals de ajuda para o jogo como os abrir usar e fechar */
// Get the button that opens the modal
var btn = document.getElementById("howToPlay");

// Get the button that opens the modal 2
var btn = document.getElementById("personas");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function tutoRial() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

function personas() {
    var modal = document.getElementById("myModal2");
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function clsTur() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

function clsPrsn() {
    var modal = document.getElementById("myModal2");
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}