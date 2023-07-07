class No {
  constructor(vertice) {
    this.vertice = vertice; // índice do vértice no grafo
    this.g = Infinity; // custo do caminho do nó inicial até este nó
    this.h = 0; // heurística estimada do nó até o nó final
    this.f = Infinity; // valor total do nó (f = g + h)
    this.anterior = null; // nó anterior no caminho
  }

  // Calcula o valor f do nó
  calcularF() {
    this.f = this.g + this.h;
  }
}

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

function custoHeuristica(verticeA, verticeB) {
  return distanciasLinhaReta[verticeA][verticeB]; // Neste exemplo, usaremos uma heurística trivial (não admissível)
}

// Função para encontrar o caminho mais curto usando o algoritmo A*
function algoritmoAEstrela(grafo, inicio, objetivo) {
      
    // Inicializa os nós do grafo
    const nos = [];
    for (let i = 0; i < grafo.length; i++) {
      nos.push(new No(i));
    }

    const numVertices = grafo.length;
    const conjuntoAbertos = [];
    const conjuntoFechados = [];
  
    // Define o nó inicial
    const noInicial = nos[inicio];
    noInicial.g = 0;
    noInicial.h = custoHeuristica(inicio, objetivo);
    noInicial.calcularF();
  
    // Adiciona o nó inicial ao conjunto aberto
    conjuntoAbertos.push(noInicial);
  
    while (conjuntoAbertos.length > 0) {
      // Encontra o nó no conjunto aberto com menor valor f
      let noAtual = conjuntoAbertos[0];
      for (let i = 1; i < conjuntoAbertos.length; i++) {
        if (conjuntoAbertos[i].f < noAtual.f) {
          noAtual = conjuntoAbertos[i];
        }
      }
  
      // Se o nó atual é o nó objetivo, reconstrói o caminho e o retorna
      if (noAtual.vertice === objetivo) {
        const caminho = [];
        let atual = noAtual;
        while (atual) {
          caminho.push(atual.vertice);
          
          atual = atual.anterior;
        }
        let caminhoInvertido = caminho.reverse();
        let valorCaminhoMinimo = 0;
        //console.log(caminhoInvertido)
        for(let i = 0; i < caminhoInvertido.length - 1; i++){
            valorCaminhoMinimo += grafo[caminhoInvertido[i]][caminhoInvertido[i+1]];
            //console.log(valorCaminhoMinimo)
        }
        return valorCaminhoMinimo
      }
  
      // Remove o nó atual do conjunto aberto e o adiciona ao conjunto fechado
      conjuntoAbertos.splice(conjuntoAbertos.indexOf(noAtual), 1);
      conjuntoFechados.push(noAtual);
  
      // Para cada vizinho do nó atual
      for (let vizinho = 0; vizinho < numVertices; vizinho++) {
        if (grafo[noAtual.vertice][vizinho] > 0) {
          const noVizinho = nos[vizinho];
  
          // Se o vizinho já está no conjunto fechado, pule para o próximo vizinho
          if (conjuntoFechados.includes(noVizinho)) {
            continue;
          }
  
          // Calcula o custo do caminho até o vizinho
          const valorG = noAtual.g + grafo[noAtual.vertice][vizinho];
  
          // Verifica se o vizinho está no conjunto aberto ou se é a primeira vez que é encontrado
          const inConjuntoAbertos = conjuntoAbertos.includes(noVizinho);
          if (!inConjuntoAbertos || valorG < noVizinho.g) {
            // Atualiza os valores do vizinho
            noVizinho.anterior = noAtual;
            noVizinho.g = valorG;
            noVizinho.h = custoHeuristica(vizinho, objetivo);
            noVizinho.calcularF();
  
            // Se o vizinho não está no conjunto aberto, adiciona-o
            if (!inConjuntoAbertos) {
              conjuntoAbertos.push(noVizinho);
            }
          }
        }
      }
    }
  
    // Se não foi encontrado um caminho, retorna null
    return null;
  }
  
  
  // Matriz de adjacência representando o grafo
  const matrizAdjacencia = [
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