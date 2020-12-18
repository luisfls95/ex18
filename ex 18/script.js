//declaração de variáveis

var timerJogo;
var count = 31;
var dir, nLampadas;


window.onload = function () {
    carrega_elementos();

    function resetLampadas () {
        for (let i=1; i<41; i++) {
            document.getElementById("lampada_" + i).src = "imagens/lampada_0.png"
            document.getElementById("lampada_" + i).alt = "apagada"
        }
    }


    function carrega_elementos() {
        window.onkeydown = function (event) {
            processa_tecla(event)
        };

        for (let i=1; i<41; i++) {
            document.getElementById("main").innerHTML += '<img src="imagens/lampada_0.png" id="lampada_' + i + '" alt="apagada">'
        }

        document.getElementById("main").innerHTML += '<img src="imagens/jogador_esquerda.png" id="jogador">'
    }

    function jogar() {
        count = 1131
        resetLampadas()
        document.getElementById("div_ajuda").style.visibility = "hidden";
        for (i=1; i<41; i++) {
            document.getElementById("lampada_" + i).style.top = parseInt(Math.random()*(window.innerHeight-44)+1) + "px";
            document.getElementById("lampada_" + i).style.left = parseInt(Math.random()*(window.innerWidth-28)+1) + "px";
        }

        document.getElementById("jogador").style.top = parseInt(Math.random()*(window.innerHeight-44)+1) + "px";
        document.getElementById("jogador").style.left = parseInt(Math.random()*(window.innerWidth-28)+1) + "px";

        timerJogo = setInterval(countdown, 1000)
    }

    document.getElementById("jogar_btn").onclick = function () {
        jogar()
    }


    function moveVertical (sinal) {
        document.getElementById("jogador").style.top = parseInt(document.getElementById("jogador").style.top) + sinal + "px"
    }

    function moveHorizontal (sinal) {
        document.getElementById("jogador").style.left = parseInt(document.getElementById("jogador").style.left) + sinal + "px"
    }

    function loopAscendente () {
        if (parseInt(document.getElementById("jogador").style.top) < -151 ) {
            document.getElementById("jogador").style.top = window.innerHeight + "px"
        }
    }
    function loopDescendente () {
        if (parseInt(document.getElementById("jogador").style.top) > window.innerHeight ) {
            document.getElementById("jogador").style.top = -150 + "px"
        }
    }

    function loopDir_Esq () {
        if (parseInt(document.getElementById("jogador").style.left) > window.innerWidth ) {
            document.getElementById("jogador").style.left = -91 + "px"
        }
    }

    function loopEsq_Dir () {
        if (parseInt(document.getElementById("jogador").style.left) < -91 ) {
            document.getElementById("jogador").style.left = window.innerWidth + "px"
        }
    }

    function limiteEcra () {
        loopAscendente()
        loopDescendente()
        loopDir_Esq()
        loopEsq_Dir()
    }


    function processa_tecla(event) {
        if (document.getElementById("div_ajuda").style.visibility === "visible") {

        }

        else {
            switch (event.key) {
                case "w":
                    moveVertical(-10)
                    break
                case "s":
                    moveVertical(10)
                    break
                case "a":
                    moveHorizontal(-10)
                    dir = 0
                    document.getElementById("jogador").src = "imagens/jogador_esquerda.png"
                    break
                case "d":
                    moveHorizontal(10)
                    dir = 91
                    document.getElementById("jogador").src = "imagens/jogador_direita.png"
                    break
                default:
                    fim_jogo()
            }
        }


        limiteEcra()
        detecta_colisao()
        checkAllLightsOn()

    }

    function countdown () {
        count--
        document.getElementById("tempo_txt").value = count;
        console.log(count)
        if (count==0) {
            fim_jogo()
        }
    }

    //

    function condicao_colisao (num, direcao) {
        return (parseInt(document.getElementById("jogador").style.left) + direcao < parseInt(document.getElementById("lampada_" + num).style.left) + 28 && parseInt(document.getElementById("jogador").style.left) + direcao > parseInt(document.getElementById("lampada_" + num).style.left) && parseInt(document.getElementById("jogador").style.top) +60 < parseInt(document.getElementById("lampada_" + num).style.top) +44 && parseInt(document.getElementById("jogador").style.top) +60 > parseInt(document.getElementById("lampada_" + num).style.top))
    }

    function checkAllLightsOn () {
        nLampadas = 0
        for (let i=1; i<41; i++) {
            if (document.getElementById("lampada_" + i).alt === "acesa") {
                nLampadas++
            }
        }
        if (nLampadas === 40) {
            fim_jogo()
        }
    }


    function detecta_colisao() {
        for (let i=1; i<41; i++) {
            if (condicao_colisao(i, dir)) {
                document.getElementById("lampada_" + i).src = "imagens/lampada_1.png"
                document.getElementById("lampada_" + i).alt = "acesa"
            }
        }
    }

    function fim_jogo() {
        document.getElementById("div_ajuda").style.visibility = "visible";
        clearInterval(timerJogo)
    }

};