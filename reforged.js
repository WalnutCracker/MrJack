/** Mr jack reforged 
Passo 1 -> criar o jogo -> feito
passo 2 -> movimentar as personagens 
passo 3 -> movimentos especiais
passo 4 -> fim do turno -> feito
passo 5 -> fim do jogo
**/
window.onload = carregaJogo;
//variaveis
var autorizedHoles = [18, 20, 23, 25, 27, 28, 34, 37, 39, 43, 44, 45, 46, 47, 50, 51, 54, 57, 58, 59, 60, 61, 62, 63, 68, 71, 73, 75, 76, 77, 78, 79, 83, 86, 89, 90, 91, 92, 93, 95, 98, 101, 105, 106, 107, 108, 109, 110, 111, 115, 118, 119, 121, 122, 123, 124, 125, 130, 132, 135, 140, 141, 143, 146, 149, 151];
var missStealthHoles = [35, 36, 41, 42, 52, 53, 55, 66, 67, 69, 70, 74, 82, 84, 85, 87, 94, 99, 100, 102, 103, 114, 116, 117, 126, 127, 131, 133, 134, 142];
var startPawnPosition = [27, 60, 77, 79, 89, 91, 108, 141];
var ordemEntradaPawn = [5, 1, 4, 2, 6, 8, 3, 7];
var startCandeeiro = [42, 55, 69, 100, 114, 126];
var orderCande = [4, 1, 5, 6, 2, 3];

var startTampaEsgoto = [39, 122];

var startBarreiras = [23, 146];
var sewerHoles = [20, 57, 68, 95, 101, 149]; //need be changed each time sewer is dropped
var whoIsJack;
var chrsShufle;
var totalRounds = 0;
var rotacao = 60;
var moves = 0;
var blackSpecial = 0;
var specialMoveUsed = false;
var allMovesSpend = false;
var apagaCandeiro = 0;
var player1 = true;
var player2 = false;
var securityBlock = true; //quando o preto é chamado ele fica true. bloqueio de segurança para outros ifs

/** passo 1*/
/** passo 1.1 criar tabuleiro */
function carregaJogo() {
    //criar tauleiro de jogo, iniciando nas casas
    for (var i = 1; i < 169; i++) {
        let casasTabuleiro = document.createElement("DIV");
        casasTabuleiro.setAttribute("class", "casa");
        casasTabuleiro.setAttribute("id", i);
        document.getElementById("tabuleiro").appendChild(casasTabuleiro);
        // de seguida os peões
        var f = i;
        if (startPawnPosition.includes(f)) {
            let populate = ordemEntradaPawn.pop();
            let player = document.createElement("IMG");
            player.setAttribute("class", "plr");
            player.setAttribute("id", "drag" + populate);
            player.setAttribute("src", "./assets/" + populate + ".png");
            player.setAttribute("width", "35");
            player.setAttribute("height", "35");
            player.setAttribute("z-index", "10");
            document.getElementById(f).appendChild(player);
            startPawnPosition.shift();
        };
        //candeeiros
        if (startCandeeiro.includes(f)) {
            let candou = orderCande.pop();
            let lighter = document.createElement("IMG");
            lighter.setAttribute("class", "cande");
            lighter.setAttribute("id", "cande" + candou);
            lighter.setAttribute("src", "./assets/cande" + candou + ".png");
            lighter.setAttribute("width", "49");
            lighter.setAttribute("height", "49");
            lighter.setAttribute("z-index", "-1");
            document.getElementById(f).appendChild(lighter);
        };
        //esgotos
        if (startTampaEsgoto.includes(f)) {
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
        if (startBarreiras.includes(f)) {
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
    var lant = document.getElementById("setaimg");
    lant.style.left = (posDivY + 15) + "px";
    lant.style.top = (posDivX - 25) + "px";
};
/** passo 1.5 funções de inicio de jogo */
function iniciaJogo() {
    var chrs = [1, 2, 3, 4, 5, 6, 7, 8];
    chrsShufle = chrs.sort(function (a, b) { return 0.5 - Math.random() });
    whoIsJack = chrsShufle.pop();
    var i = document.getElementsByClassName("inicia");
    if (i[0].style.display === "none") {
        i[0].style.display = "block";
    } else {
        i[0].style.display = "none";
    }
    /** acima faz o sort da carta do Jack abaixo o botão */
    /**criado o botão que oculta a carta do jack */
    let buttonJack = document.createElement("BUTTON");
    let textoN = document.createTextNode("Show/hide Jack");

    buttonJack.setAttribute("class", "hideJack");
    buttonJack.setAttribute("onclick", "olhoJack()");
    buttonJack.appendChild(textoN);

    document.getElementsByClassName("info")[0].appendChild(buttonJack);
    document.getElementById("crts").style.backgroundColor = "#e6e6e6";

    /** a imagem com a identidade do jack
     * a mesma alterada pelo botão. tem de começar hidden*/
    let jack = document.createElement("IMG");
    jack.setAttribute("class", "jack");
    jack.setAttribute("id", "jack" + whoIsJack);
    jack.setAttribute("src", "./assets/Scan0" + whoIsJack + ".png");
    jack.style.display = "none";
    document.getElementsByClassName("info")[0].appendChild(jack);

    let jackIsVisible = document.createElement("IMG");
    jackIsVisible.setAttribute("class", "visornot");
    jackIsVisible.setAttribute("id", "visornot");

    var sp0 = buttonJack;
    var sp2 = jack;
    var sp3 = jackIsVisible;
    var sp1 = document.getElementsByClassName("cards")[0];
    var divCartas = sp1.parentNode;
    divCartas.insertBefore(sp0, sp1);
    divCartas.insertBefore(sp2, sp1);
    divCartas.insertBefore(sp3, sp1);
    /** o sp2, vem antes do sp1, e o sp0 vem antes do sp1 */

    carregaRonda();
    makeRest();

    return chrsShufle;
};

function carregaRonda() {
    var gameCards = [1, 2, 3, 4, 5, 6, 7, 8];
    var shuffleGameCards = gameCards.sort(function (a, b) { return 0.5 - Math.random() });

    let part1 = document.createElement("DIV");
    part1.setAttribute("class", "cards1");
    part1.setAttribute("id", "cards1");
    document.getElementsByClassName("cards")[0].appendChild(part1);

    let part2 = document.createElement("DIV");
    part2.setAttribute("class", "cards2");
    part2.setAttribute("id", "cards2");
    document.getElementsByClassName("cards")[0].appendChild(part2);
    document.getElementById("cards2").hidden = true;

    for (i = 0; i < 8; i++) {
        if (i < 4) {
            let sChar = shuffleGameCards.pop();
            let plChar = document.createElement("IMG");
            plChar.setAttribute("class", "plChar");
            plChar.setAttribute("id", "char" + sChar);
            plChar.setAttribute("src", "./assets/Perso0" + sChar + ".png");
            plChar.setAttribute("onclick", "escolha" + sChar + "j(this)");
            document.getElementsByClassName("cards1")[0].appendChild(plChar);
        } else {
            let sChar = shuffleGameCards.pop();
            let plChar = document.createElement("IMG");
            plChar.setAttribute("class", "plChar");
            plChar.setAttribute("id", "char" + sChar);
            plChar.setAttribute("src", "./assets/Perso0" + sChar + ".png");
            plChar.setAttribute("onclick", "escolha" + sChar + "j(this)");
            document.getElementsByClassName("cards2")[0].appendChild(plChar);
        }
    }
}

function makeRest() {
    let watch = document.createElement("IMG");
    watch.setAttribute("class", "relogio");
    watch.setAttribute("id", "relogio");
    watch.setAttribute("src", "./assets/torre8.png");
    watch.setAttribute("height", "150px");
    document.getElementById("restoDasCoisas").appendChild(watch);

    let testemony = document.createElement("IMG");
    testemony.setAttribute("class", "restoTestemunha");
    testemony.setAttribute("Id", "restoTestemunha");
    testemony.setAttribute("src", "./assets/bgCard1.png");
    testemony.setAttribute("height", "150px");
    document.getElementById("restoDasCoisas").appendChild(testemony);

    let nextCards = document.createElement("IMG");
    nextCards.setAttribute("class", "restoCartas");
    nextCards.setAttribute("id", "restoCartas");
    nextCards.setAttribute("src", "./assets/bgCard2.png");
    nextCards.setAttribute("height", "150px");
    document.getElementById("restoDasCoisas").appendChild(nextCards);
}

function olhoJack() {
    var i = document.getElementsByClassName("jack");
    if (i[0].style.display === "none") {
        i[0].style.display = "block";
    } else {
        i[0].style.display = "none";
    }
};

function escolha1j(cards) {
    removePawnOnClick();
    document.getElementById("drag1").setAttribute("draggable", "true");
    document.getElementById("drag1").setAttribute("ondragstart", "drag(event, this)");
    document.getElementById("char1").style.opacity = "0.7";
    document.getElementById("char1").removeAttribute("onclick");
    document.getElementById("restoTestemunha").setAttribute("onclick", "sacaTestemunha()");
}
function escolha2j(cards) {
    removePawnOnClick();
    document.getElementById("drag2").setAttribute("draggable", "true");
    document.getElementById("drag2").setAttribute("ondragstart", "drag(event, this)");
    document.getElementById("char2").style.opacity = "0.7";
    document.getElementById("char2").removeAttribute("onclick");
}
function escolha3j(cards) {
    removePawnOnClick();
    document.getElementById("drag3").setAttribute("draggable", "true");
    document.getElementById("drag3").setAttribute("ondragstart", "drag(event, this)");
    document.getElementById("char3").style.opacity = "0.7";
    document.getElementById("char3").removeAttribute("onclick");

    let allLighters = document.getElementsByClassName("cande");
    for (let i = 0; i < allLighters.length; i++) {
        allLighters[i].setAttribute("draggable", "true");
        allLighters[i].setAttribute("ondragstart", "drag(event, this)");
    }
}
function escolha4j(cards) {
    removePawnOnClick();
    document.getElementById("drag4").setAttribute("draggable", "true");
    document.getElementById("drag4").setAttribute("ondragstart", "drag(event, this)");
    document.getElementById("char4").style.opacity = "0.7";
    document.getElementById("char4").removeAttribute("onclick");
    let allBlockates = document.getElementsByClassName("barreira");
    for (let i = 0; i < allBlockates.length; i++) {
        allBlockates[i].setAttribute("draggable", "true");
        allBlockates[i].setAttribute("ondragstart", "drag(event, this)");
    }
}
function escolha5j(cards) {
    removePawnOnClick();
    document.getElementById("drag5").setAttribute("draggable", "true");
    document.getElementById("drag5").setAttribute("ondragstart", "drag(event, this)");
    document.getElementById("char5").style.opacity = "0.7";
    document.getElementById("char5").removeAttribute("onclick");
}
function escolha6j(cards) {
    removePawnOnClick();
    this.securityBlock = false;
    let allChars = document.getElementsByClassName("plr");
    for (let i = 0; i < allChars.length; i++) {
        allChars[i].setAttribute("draggable", "true");
        allChars[i].setAttribute("ondragstart", "drag(event, this)");
    }
    document.getElementById("char6").style.opacity = "0.7";
    document.getElementById("char6").removeAttribute("onclick");
}
function escolha7j(cards) {
    removePawnOnClick();
    document.getElementById("drag7").setAttribute("draggable", "true");
    document.getElementById("drag7").setAttribute("ondragstart", "drag(event, this)");
    document.getElementById("drag7").setAttribute("onclick", "purpleSpecMov()");
    document.getElementById("char7").style.opacity = "0.7";
    document.getElementById("char7").removeAttribute("onclick");
}
function escolha8j(cards) {
    removePawnOnClick();
    document.getElementById("drag8").setAttribute("draggable", "true");
    document.getElementById("drag8").setAttribute("ondragstart", "drag(event, this)");
    document.getElementById("char8").style.opacity = "0.7";
    document.getElementById("char8").removeAttribute("onclick");
    let allSewers = document.getElementsByClassName("esgoto");
    for (let i = 0; i < allSewers.length; i++) {
        allSewers[i].setAttribute("draggable", "true");
        allSewers[i].setAttribute("ondragstart", "drag(event, this)");
    }
}
// ainda em duvidas porque coloco olhos e porque só assim funciona
function drag(ev, olhos) {
    ev.dataTransfer.setData("text", ev.target.id);
    let estaDiv = parseInt(ev.path[1].id);
    let perMovi = ev.path[0].id;

    var gplrj = ["drag1", "drag2", "drag3", "drag4", "drag5", "drag6", "drag7", "drag8"];

    if (gplrj.includes(perMovi)) {
        addTheAllowDrop(estaDiv, olhos);
    } else if (perMovi === "esgoto39" || perMovi === "esgoto122") {
        var possibleSewerDroper = [20, 39, 57, 68, 95, 101, 122, 149];
        for (i = 0; i < possibleSewerDroper.length; i++) {
            let a = document.getElementById(possibleSewerDroper[i]);
            a.setAttribute("ondrop", "drop(event, this)");
            a.setAttribute("ondragover", "allowDrop(event, this)");
        }
    } else if (perMovi === "barreira23" || perMovi === "barreira146") {
        var casaBarreira = [18, 23, 146, 143];
        for (i = 0; i < casaBarreira.length; i++) {
            let a = document.getElementById(casaBarreira[i]);
            a.setAttribute("ondrop", "drop(event, this)");
            a.setAttribute("ondragover", "allowDrop(event, this)");
        }
    } else {
        var possibleLightDroper = [36, 42, 55, 69, 100, 114, 126, 133];
        for (i = 0; i < possibleLightDroper.length; i++) {
            let a = document.getElementById(possibleLightDroper[i]);
            a.setAttribute("ondrop", "drop(event, this)");
            a.setAttribute("ondragover", "allowDrop(event, this)");
        }
    }
    //console.log("drag", estaDiv, ev.target, perMovi);
    console.log(sewerHoles);
}

function addTheAllowDrop(startpoint, player) {
    let a0 = startpoint - 9;
    let b0 = startpoint - 8;
    let c0 = startpoint - 16;
    let a1 = startpoint + 7;
    let d0 = startpoint - 7;
    let b1 = startpoint + 8;
    let c1 = startpoint + 16;
    let d1 = startpoint + 9;

    var destinyAllowed = [a0, b0, c0, d0, a1, b1, c1, d1];

    var possibilidades = [];

    destinyAllowed.forEach(function (item) {
        possibilidades.push(item);
    });

    if (player.id === "drag5") {
        possibilidades.forEach(function (item) {
            var cptds = document.getElementById(item);
            cptds.setAttribute("ondrop", "drop(event, this)");
            cptds.setAttribute("ondragover", "allowDrop(event, this)");
            console.log("isto é a miss Stealth");
        });
    } else if (sewerHoles.includes(startpoint)) {
        let maxdrops = sewerHoles.concat(possibilidades);
        maxdrops.forEach(function (item) {
            if (autorizedHoles.includes(item)) {
                var maxDrp = document.getElementById(item);
                maxDrp.setAttribute("ondrop", "drop(event, this)");
                maxDrp.setAttribute("ondragover", "allowDrop(event, this)");
                console.log("aqui é um esgoto");
            }
        });
    } else {
        possibilidades.forEach(function (item) {
            if (autorizedHoles.includes(item)) {
                var cptds = document.getElementById(item);
                cptds.setAttribute("ondrop", "drop(event, this)");
                cptds.setAttribute("ondragover", "allowDrop(event, this)");
                console.log("isto é uma casa normal");
            }
        });
    }
};

function allowDrop(ev, dedo) {
    ev.preventDefault();
    /**let x = document.getElementsByClassName("casa").id;
    console.log("isto é a div", x); */
}

function drop(ev, nariz) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    nariz.appendChild(document.getElementById(data));
    let x = document.getElementById(nariz.id).children[0];
    let sinal = x.id;
    let whatitsClass = x.className;
    var outrosItems = ["cande1", "cande2", "cande3", "cande4", "cande5", "cande6", "esgoto39", "esgoto122", "barreira23", "barreira146"];

    if (outrosItems.includes(sinal) && specialMoveUsed === false) {
        limpaSpecialMove(whatitsClass);
        this.specialMoveUsed = true;
    } else {
        this.moves++;
    }

    if (sinal === "drag1" && moves > 2 && this.securityBlock === true) {
        sacaTestemunha();
        this.moves = 0;
        this.allMove = false;
    } else if (sinal === "drag2" && moves > 2 && this.securityBlock === true) {
        let rdrg = document.getElementById("drag2");
        rdrg.removeAttribute("draggable");
        rdrg.removeAttribute("ondragstart");
    } else if (sinal === "drag3" && moves > 2 && this.securityBlock === true) {
        let movAm = document.getElementById("drag3");
        movAm.removeAttribute("draggable");
        movAm.removeAttribute("ondragstart");
        terminaMov();
    } else if (sinal === "drag4" && moves > 2 && this.securityBlock === true) {
        let movAz = document.getElementById("drag3");
        movAz.removeAttribute("draggable");
        movAz.removeAttribute("ondragstart");
        terminaMov();
    } else if (sinal === "drag5" && moves > 3 && this.securityBlock === true) {
        //removeMsSpec();
        terminaMov(); //<- spec move é decidido no drop
        this.allMove = false;
    } else if (sinal === "drag6" && moves > 2) {
        document.getElementById("drag6").removeAttribute("draggable");
        document.getElementById("drag6").removeAttribute("ondragstart");
    } else if (sinal === "drag7") {
        document.getElementById("drag7").removeAttribute("onclick");
        this.specialMoveUsed = true;
        if (this.moves === 3) {
            terminaMov();
        }
    } else if (sinal === "drag8" && moves > 2 && this.securityBlock === true) {
        let movOrange = document.getElementById("drag8");
        movOrange.removeAttribute("draggable");
        movOrange.removeAttribute("ondragstart");
        terminaMov();
    } else if (whatitsClass === "esgoto") {
        //refresh open sewers
        var coveredHoles = [];
        this.sewerHoles = [];
        for (i = 0; i < 2; i++) {
            let b = document.getElementsByClassName("esgoto")[i].parentNode.id;
            var d = parseInt(b, 10);//no final coveredHoles aparecia como array de strings
            coveredHoles.push(d);
        }
        var allSewer = [20, 39, 57, 68, 95, 101, 122, 149];
        for (i = 0; i < allSewer.length; i++) {
            //console.log(allSewer);
            if (coveredHoles.includes(allSewer[i])) {
                //console.log("inside", allSewer[i]);
            } else {
                sewerHoles.push(allSewer[i]);
                //console.log("esgotos disponiveis", sewerHoles, "todos", allSewer, "tapados", coveredHoles);
                //console.log("os buracos deviam ser:", sewerHoles);
            }
        }
    }

    if (moves > 0 && specialMoveUsed === true) {
        document.getElementById("botFim").style.display = "block";
    } else if (sinal === "drag2" && moves > 0) {
        document.getElementById("drag2").setAttribute("onclick", "useLantern()");
        let possitionXafter = document.getElementById(ev.target.id).offsetTop;
        let possitionYafter = document.getElementById(ev.target.id).offsetLeft;
        document.getElementById("setaimg").style.left = (possitionYafter + 15) + "px";
        document.getElementById("setaimg").style.top = (possitionXafter - 25) + "px";
    } else if (sinal === "drag5" && moves > 0) {
        var f = parseInt(nariz.id, 10);
        if (autorizedHoles.includes(f)) {
            var i = document.getElementById("botFim");
            i.style.display = "block";
        } else {
            var i = document.getElementById("botFim");
            i.style.display = "none";
        }
    }

    if (this.securityBlock === false && sinal !== "drag6") {
        this.moves--;
        this.blackSpecial++;
        document.getElementById("botFim").style.display = "block";
        if (this.blackSpecial >= 3) {
            let ptSpl = document.getElementsByClassName("plr");
            for (let i = 0; i < ptSpl.length; i++) {
                ptSpl[i].removeAttribute("draggable");
                ptSpl[i].removeAttribute("ondragstart");
                let blackAternative = document.getElementById("drag6");
                blackAternative.setAttribute("draggable", "true");
                blackAternative.setAttribute("ondragstart", "drag(event, this)");
            }
            this.securityBlock = true;
            this.specialMoveUsed = true;
        }
    }
    cleanDivs();
}


function cleanMoves() {
    var y = document.getElementsByClassName("plr");
    for (var i = 0; i < y.length; i++) {
        y[i].removeAttribute("draggable");
        y[i].removeAttribute("ondragstart");
        y[i].removeAttribute("onclick");
    }
}
function cleanDivs() {
    var h = document.getElementsByClassName("casa");
    for (var i = 0; i < h.length; i++) {
        h[i].removeAttribute("ondrop");
        h[i].removeAttribute("ondragover")
    }
}

function removePawnOnClick() {
    let pawnsWithClick = document.getElementsByClassName("plr");
    for (let i = 0; i < pawnsWithClick.length; i++) {
        pawnsWithClick[i].removeAttribute("onclick");
    }
}

function terminaMov() {
    console.log("movimento terminado", moves);
    this.moves = 0;
    this.specialMoveUsed = false;
    this.allMovesSpend = false;
    this.securityBlock = true;
    cleanMoves();
    document.getElementById("botFim").style.display = "none";

    this.totalRounds++;
    this.apagaCandeiro++;
    if (totalRounds === 8) {
        totalRounds = 0;
        var rebotCards = document.getElementsByClassName("cards1")[0];
        rebotCards.parentNode.removeChild(rebotCards);
        var rebotCards2 = document.getElementsByClassName("cards2")[0];
        rebotCards2.parentNode.removeChild(rebotCards2);
        document.getElementById("restoCartas").hidden = false;

        this.carregaRonda();
        console.log("nova Ronda:", this.shuffleGameCards);
    } else if (totalRounds === 4) {
        document.getElementById("cards1").hidden = true;
        document.getElementById("cards2").hidden = false;
        document.getElementById("restoCartas").hidden = true;
    }

    if (totalRounds === 0 || totalRounds === 3 || totalRounds === 5 || totalRounds === 6) {
        document.getElementById("crts").style.backgroundColor = "#e6e6e6";
        player1 = true;
        player2 = false;
    } else if (totalRounds === 1 || totalRounds === 2 || totalRounds === 4 || totalRounds === 7) {
        document.getElementById("crts").style.backgroundColor = "#e4cd81";
        player1 = false;
        player2 = true;
    }
    console.log("candeeiros não são apagados", apagaCandeiro);
    switch (apagaCandeiro) {
        case 4:
            console.log("devia entrar aqui");
            document.getElementById("cande1").hidden = true;
            document.getElementById("relogio").setAttribute("src", "./assets/torre7.png");
            break;
        case 8:
            document.getElementById("cande2").hidden = true;
            document.getElementById("relogio").setAttribute("src", "./assets/torre6.png");
            question();
            break;
        case 12:
            document.getElementById("cande3").hidden = true;
            document.getElementById("relogio").setAttribute("src", "./assets/torre5.png");
            question();
            break;
        case 16:
            document.getElementById("cande4").hidden = true;
            document.getElementById("relogio").setAttribute("src", "./assets/torre4.png");
            question();
            break;
        case 20:
            document.getElementById("relogio").setAttribute("src", "./assets/torre3.png");
            question();
            break;
        case 24:
            document.getElementById("relogio").setAttribute("src", "./assets/torre2.png");
            question();
            break;
        case 28:
            document.getElementById("relogio").setAttribute("src", "./assets/torre1.png");
            question();
            break;
        case 32:
            endGameJackWIN(); //player2
    }
    console.log("total rounds", totalRounds);
    console.log("movimento terminado", moves);
    console.log("candeeiros", apagaCandeiro);
};

//** Movimentos Especiais */
/**vermelho */
function sacaTestemunha(chrsShufle) {
    var t = this.chrsShufle.pop();
    let testExibit = document.createElement("IMG")
    testExibit.setAttribute("class", "testemu");
    testExibit.setAttribute("src", "./assets/Scan0" + t + ".png");
    testExibit.setAttribute("height", "100px");

    if (this.player1 === true) {
        document.getElementsByClassName("playr1")[0].appendChild(testExibit);
        var d = this.chrsShufle.pop();
    } else if (this.player2 === true) {
        document.getElementsByClassName("playr2")[0].appendChild(testExibit);
        var d = this.chrsShufle.pop();
    }
    document.getElementById("restoTestemunha").removeAttribute("onclick");
    terminaMov();
}
/*castanho*/
function useLantern() {
    var brown = document.getElementById("drag2");
    brown.removeAttribute("draggable");
    brown.removeAttribute("ondragstart");
    rotacao += 60;
    document.getElementById("setaimg").style.transform = "rotate(" + rotacao + "deg)";
    document.getElementById("botFim").style.display = "block";
}
/**roxo */
function purpleSpecMov() {
    let otherPlayers = document.getElementsByClassName("plr");
    for (let i = 0; i < otherPlayers.length; i++) {
        otherPlayers[i].setAttribute("onclick", "bodyChange(this)");
    }
}
function bodyChange(purp) {
    let copiaId = purp.id;
    let copiaSrc = purp.src;
    var seca = copiaSrc.lastIndexOf("assets");
    var fonte = copiaSrc.substr(seca);
    var idSimplex = copiaId.substring(4);
    document.getElementById("drag7").setAttribute("src", "./" + fonte);
    document.getElementById(copiaId).setAttribute("src", "./assets/7.png");
    document.getElementById("drag7").setAttribute("id", "drag");
    document.getElementById(copiaId).setAttribute("id", "drag7");
    document.getElementById("drag").setAttribute("id", "drag" + idSimplex);
    terminaMov();
}

/*depois de usado tem de impedir de voltarem a ser utilizados*/
function limpaSpecialMove(geral) {
    var x = document.getElementsByClassName(geral);
    for (i = 0; i < x.length; i++) {
        x[i].removeAttribute("draggable");
        x[i].removeAttribute("ondragstart");
    }
}

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

/**questiona se o jack esta visivel */
function question() {
    var cenas = document.getElementById("testConfrm");
    cenas.style.display = "block";
    let quest = document.createElement("div");
    quest.setAttribute("class", "testemunhaEscolha");
    quest.setAttribute("id", "testemunhaEscolha");

    let pos = document.createElement("img");
    pos.setAttribute("class", "jQuest");
    pos.setAttribute("id", "simesta");
    pos.setAttribute("src", "assets/test.png");
    pos.setAttribute("onclick", "estaTestemunha()");
    pos.setAttribute("height", "250px");

    let pos2 = document.createElement("img");
    pos2.setAttribute("class", "jQuest");
    pos2.setAttribute("id", "naoesta");
    pos2.setAttribute("src", "assets/notTest.png");
    pos2.setAttribute("onclick", "naoEstaTestemunha()");
    pos2.setAttribute("height", "250px");

    quest.appendChild(pos);
    quest.appendChild(pos2);
    document.getElementById("testConfrm").appendChild(quest);
}

function estaTestemunha() {
  document.getElementById("visornot").setAttribute("src", "assets/test.png");
  var cenas = document.getElementById("testConfrm");
  cenas.style.display = "none";
  let apgesc= document.getElementById("testemunhaEscolha");
  document.getElementById("testConfrm").removeChild(apgesc);
  colocaClickPeoes();
}

function naoEstaTestemunha() {
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

/** sistema de mensagens */
function caixaDeMensagens() {
    //coloquei varios tipos de variavies para treino
    const inicio = "escolha a personagem";
    const meio = "mova o peão";
    const meioRed = "Pode continuar a mover ou tirar uma testemunha (max 3 movimentos)";
    const meioBrown = "Pode continuar a mover ou rodar a lanterna (max 3 movimentos)";
    const yellow = "pode arrastar um candeeiro ou mover-se (max 3 movimentos)";
    const blue = "pode arastastar uma barreira ou mover-se (max 3 movimentos)";
    const green = "pode mover-se (max 4 movimentos)";
    const black = "pode mover-se ou chamar personagens";
    const purple = "pode mover-se ou trocar de lugar ";
    const orange = "pode arastastar um esgoto ou mover-se (max 3 movimentos)";
    const final = "pressine Finaliza Mov";

    const hint = ["Tirar testemunha termina movimento",
        "Rodar lanterna termina movimento",
        "apenas pode arrastar um candeeiro uma unica vez",
        "Apenas pode arrastar uma barreira uma unica vez",
        "Miss Stealth pode caminhar sobre casas mas tem de terminar nas ruas",
        "Movendo outras personagens não usam habilidades",
        "Não pode fazer as duas coisas",
        "Apenas pode arrastar uma tampa de esgoto uma unica vez"];
}
console.log(
    "rever que todos os jogadores tem o terminar movimento",
    "miss stealth nos esgotos",
    "ainda tenho de programar as mensagens de alerta e ajuda",
    "apagar candeeiros",
    "jack testemundado"
);