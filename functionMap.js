

carregaJogo() -> 33

iniciaJogo() -> 98

carregaRonda() -> 149

makeRest() -> 185

olhoJack() -> 208

escolhas1j() -> 217
escolhas2j() -> 225
escolhas3j() -> 232
escolhas4j() -> 245
escolhas5j() -> 257
escolhas6j() -> 264
escolhas7j() -> 276
escolhas8j() -> 284

drag() -> 297

addAllowDrop() -> 310

allowDrop() -> 334

drop() -> 340

cleanMove() -> 434

removePawnOnClick() -> 442

teminaMov() -> 449

sacaTestemunha() -> 516

lixo

/* 
    switch (sinal, this.moves) {
        case this.moves === 1:
            document.getElementById("botFim").style.display = "block";
            console.log("2,5 na switch", moves, "1", sinal);
            break;
        case this.moves === 3:
            console.log( moves, "merda funcional");
          break;
        case (sinal === "drag1" && moves > 2):
            console.log(moves, "2");
            sacaTestemunha();
            break;
        case (sinal === "drag2" && moves > 2):
            let rdrg = document.getElementById("drag2");
            rdrg.removeAttribute("draggable", "true");
            rdrg.removeAttribute("ondragstart", "drag(event, this)");
            document.getElementById("drag2").addAttribute("onclick", "useLantern()");
            console.log(moves, "3");
            break;
        case ((sinal === "drag3" || sinal === "drag4" || sinal === "drag6" || sinal === "drag8") && moves > 2 && this.specialMoveUsed === true):
            terminaMov();
            break;
        case (sinal === "drag5" && moves > 3):
            terminaMov();
            break;
        case (sinal === "drag7" && moves > 0):
            document.getElementById("drag7").removeAttribute("onclick");
            this.specialMoveUsed = true;
            break;
        case (sinal === "drag7" && moves > 2):
            terminaMov();
            console.log("drag7");
            break;*/
