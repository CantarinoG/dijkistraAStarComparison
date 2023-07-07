matriz = [
    [0, 10, 28, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Oliveira Fortes
    [10, 0, 0, 0, 19, 0, 0, 0, 40, 0, 0, 0, 0, 0], //Paiva
    [28, 0, 0, 0, 0, 20, 30, 0, 0, 0, 0, 0, 0, 0], //São João da Serra
    [10, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0], //Aracitaba
    [0, 19, 0, 0, 0, 0, 27, 0, 25, 0, 0, 0, 0, 0,], //Mercês
    [0, 0, 20, 0, 0, 0, 30, 24, 0, 0, 0, 0, 0, 0], //Piau
    [0, 0, 30, 24, 27, 30, 0, 40, 16, 27, 0, 0, 0, 0,], //Tabuleiro
    [0, 0, 0, 0, 0, 24, 40, 0, 0, 12, 0, 0, 0, 0], //Goianá
    [0, 40, 0, 0, 25, 0, 16, 0, 0, 0, 0, 26, 20, 0], //Rio Pomba
    [0, 0, 0, 0, 0, 0, 27, 12, 0, 0, 20, 0, 0, 0], //Rio Novo
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 11, 0], //Guarani
    [0, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 21, 13], //Tocantins
    [0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 11, 21, 0, 0], //Piraúba
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0] //Ubá
]

const distanciasLinhaReta = [
    [0, 7, 15, 8, 19, 23, 21, 33, 30, 37, 42, 49, 45, 59], //Oliveira Fortes
    [7, 0, 20, 7, 12, 26, 19, 35, 25, 36, 38, 42, 40, 52], //Paiva
    [15, 20, 0, 17, 32, 13, 24, 25, 35, 31, 43, 54, 48, 64], //São João da Serra
    [8, 7, 17, 0, 16, 19, 14, 28, 22, 30, 34, 41, 37, 51], //Aracitaba
    [19, 12, 32, 16, 0, 34, 20, 40, 18, 36, 35, 33, 34, 42], //Mercês
    [23, 26, 13, 19, 34, 0, 18, 13, 30, 20, 33, 18, 40, 57], //Piau
    [21, 19, 24, 14, 20, 18, 0, 20, 12, 18, 21, 31, 25, 41], //Tabuleiro
    [33, 35, 25, 28, 40, 13, 20, 0, 29, 10, 25, 44, 34, 53], //Goianá
    [30, 25, 35, 22, 18, 30, 12, 29, 0, 22, 16, 19, 16, 29], //Rio Pomba
    [37, 36, 31, 30, 36, 20, 18, 10, 22, 0, 11, 35, 25, 43], //Rio Novo
    [42, 38, 43, 34, 35, 33, 21, 25, 16, 11, 0, 21, 9, 28], //Guarani
    [49, 42, 54, 41, 33, 48, 31, 44, 19, 35, 21, 0, 11, 11], //Tocantins
    [45, 40, 48, 37, 34, 40, 25, 34, 16, 25, 9, 11, 0, 19], //Piraúba
    [59, 52, 64, 51, 42, 57, 41, 53, 29, 43, 28, 11, 19, 0] //Ubá
]
  

function dijkstra(matriz, verticeInicial, verticeFinal)
{
    let distancias = new Array(matriz.length); 
    let spt = new Array(matriz.length);  
     
    for(let i = 0; i < matriz.length; i++) { 
        distancias[i] = Infinity;
        spt[i] = false; 
    }
     
    distancias[verticeInicial] = 0;

    for(let i = 0; i < matriz.length - 1; i++) { 
        let u = distanciaMinima(matriz, distancias, spt); 
         
        spt[u] = true;
         
        for(let v = 0; v < matriz.length; v++) {
            if (!spt[v] && matriz[u][v] != 0 && distancias[u] != Infinity && distancias[u] + matriz[u][v] < distancias[v]) {
                distancias[v] = distancias[u] + matriz[u][v];
            }
        }
    }
     return distancias[verticeFinal]
}

function distanciaMinima(matriz, distancias, spt) {
    let min = Infinity;
    let min_index = -1;
     
    for(let v = 0; v < matriz.length; v++) {
        if (spt[v] == false && distancias[v] <= min) {
            min = distancias[v];
            min_index = v;
        }
    }
    return min_index;
}

class No {
    constructor(vertice) {
      this.vertice = vertice; 
      this.g = Infinity;
      this.h = 0;
      this.f = Infinity; 
      this.anterior = null; 
    }
  

    calcularF() {
      this.f = this.g + this.h;
    }
  }

function custoHeuristica(verticeA, verticeB) {
    return distanciasLinhaReta[verticeA][verticeB]; 
}

function algoritmoAEstrela(grafo, inicio, objetivo) {
    
    const nos = [];
    for (let i = 0; i < grafo.length; i++) {
    nos.push(new No(i));
    }

    const numVertices = grafo.length;
    const conjuntoAbertos = [];
    const conjuntoFechados = [];

    const noInicial = nos[inicio];
    noInicial.g = 0;
    noInicial.h = custoHeuristica(inicio, objetivo);
    noInicial.calcularF();

    conjuntoAbertos.push(noInicial);

    while (conjuntoAbertos.length > 0) {

    let noAtual = conjuntoAbertos[0];
    for (let i = 1; i < conjuntoAbertos.length; i++) {
        if (conjuntoAbertos[i].f < noAtual.f) {
        noAtual = conjuntoAbertos[i];
        }
    }

    if (noAtual.vertice === objetivo) {
        const caminho = [];
        let atual = noAtual;
        while (atual) {
        caminho.push(atual.vertice);
        
        atual = atual.anterior;
        }
        let caminhoInvertido = caminho.reverse();
        let valorCaminhoMinimo = 0;

        for(let i = 0; i < caminhoInvertido.length - 1; i++){
            valorCaminhoMinimo += grafo[caminhoInvertido[i]][caminhoInvertido[i+1]];

        }
        return valorCaminhoMinimo
    }

    conjuntoAbertos.splice(conjuntoAbertos.indexOf(noAtual), 1);
    conjuntoFechados.push(noAtual);

    for (let vizinho = 0; vizinho < numVertices; vizinho++) {
        if (grafo[noAtual.vertice][vizinho] > 0) {
        const noVizinho = nos[vizinho];

        if (conjuntoFechados.includes(noVizinho)) {
            continue;
        }

        const valorG = noAtual.g + grafo[noAtual.vertice][vizinho];

        const inConjuntoAbertos = conjuntoAbertos.includes(noVizinho);
        if (!inConjuntoAbertos || valorG < noVizinho.g) {
       
            noVizinho.anterior = noAtual;
            noVizinho.g = valorG;
            noVizinho.h = custoHeuristica(vizinho, objetivo);
            noVizinho.calcularF();

            if (!inConjuntoAbertos) {
            conjuntoAbertos.push(noVizinho);
            }
        }
        }
    }
    }

    return null;
}

const botaoReset = document.getElementById("reset");
const botoesVertices = document.querySelectorAll('.vertex');
const h2Instrucao = document.getElementById("instruction");
let vertice1 = null;
let vertice2 = null;

botaoReset.addEventListener('click', event => {
    vertice1 = null;
    vertice2 = null;
    h2Instrucao.innerText = "Selecione o vértice de início..."
    botoesVertices.forEach(botao => {
        botao.style.backgroundColor = '';
        botao.style.width = 'calc(100vw * 0.01)';
        botao.style.height = 'calc(100vw * 0.01)';
    });
});

botoesVertices.forEach(botao => {
    botao.addEventListener('click', event => {
      
        if(vertice1 === null && vertice2 === null) {
            botao.style.backgroundColor = 'red';
            botao.style.width = 'calc(100vw * 0.015)';
            botao.style.height = 'calc(100vw * 0.015)';
            h2Instrucao.innerText = "Selecione o vértice de destino..."
            vertice1 = parseInt(botao.id.slice(1))
        } else if(vertice1 !== null && vertice2 === null && vertice1 != botao.id.slice(1)) {
            botao.style.backgroundColor = 'red';
            botao.style.width = 'calc(100vw * 0.015)';
            botao.style.height = 'calc(100vw * 0.015)';
            vertice2 = parseInt(botao.id.slice(1))
            let resultadoDijkstra = dijkstra(matriz, vertice1, vertice2)
            let resultadoAEstrela = algoritmoAEstrela(matriz, vertice1, vertice2)
            h2Instrucao.innerText = `Resultado dos algoritmos - Dijkstra: ${resultadoDijkstra}km | A*: ${resultadoAEstrela}km`
        }

    });
});


