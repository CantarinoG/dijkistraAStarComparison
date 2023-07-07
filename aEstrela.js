// Função para encontrar o caminho mais curto usando o algoritmo A*
function aStarAlgorithm(graph, start, goal) {
    // Classe para representar um nó no grafo
    class Node {
      constructor(vertex) {
        this.vertex = vertex; // índice do vértice no grafo
        this.g = Infinity; // custo do caminho do nó inicial até este nó
        this.h = 0; // heurística estimada do nó até o nó final
        this.f = Infinity; // valor total do nó (f = g + h)
        this.previous = null; // nó anterior no caminho
      }
  
      // Calcula o valor f do nó
      calculateF() {
        this.f = this.g + this.h;
      }
    }
  
    // Função para calcular a heurística (distância estimada) entre dois vértices
    function heuristicCost(vertexA, vertexB) {
      // Implemente aqui uma heurística apropriada para o seu problema
      return 0; // Neste exemplo, usaremos uma heurística trivial (não admissível)
    }
  
    const numVertices = graph.length;
    const openSet = [];
    const closedSet = [];
  
    // Inicializa os nós do grafo
    const nodes = [];
    for (let i = 0; i < numVertices; i++) {
      nodes.push(new Node(i));
    }
  
    // Define o nó inicial
    const startNode = nodes[start];
    startNode.g = 0;
    startNode.h = heuristicCost(start, goal);
    startNode.calculateF();
  
    // Adiciona o nó inicial ao conjunto aberto
    openSet.push(startNode);
  
    while (openSet.length > 0) {
      // Encontra o nó no conjunto aberto com menor valor f
      let currentNode = openSet[0];
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < currentNode.f) {
          currentNode = openSet[i];
        }
      }
  
      // Se o nó atual é o nó objetivo, reconstrói o caminho e o retorna
      if (currentNode.vertex === goal) {
        const path = [];
        let current = currentNode;
        while (current) {
          path.push(current.vertex);
          current = current.previous;
        }
        let reversedPath = path.reverse();
        let value = 0;
        console.log(reversedPath)
        for(let i = 0; i < reversedPath.length - 1; i++){
            value += graph[reversedPath[i]][reversedPath[i+1]]
            console.log(value)
        }
        return value
      }
  
      // Remove o nó atual do conjunto aberto e o adiciona ao conjunto fechado
      openSet.splice(openSet.indexOf(currentNode), 1);
      closedSet.push(currentNode);
  
      // Para cada vizinho do nó atual
      for (let neighbor = 0; neighbor < numVertices; neighbor++) {
        if (graph[currentNode.vertex][neighbor] > 0) {
          const neighborNode = nodes[neighbor];
  
          // Se o vizinho já está no conjunto fechado, pule para o próximo vizinho
          if (closedSet.includes(neighborNode)) {
            continue;
          }
  
          // Calcula o custo do caminho até o vizinho
          const gScore = currentNode.g + graph[currentNode.vertex][neighbor];
  
          // Verifica se o vizinho está no conjunto aberto ou se é a primeira vez que é encontrado
          const inOpenSet = openSet.includes(neighborNode);
          if (!inOpenSet || gScore < neighborNode.g) {
            // Atualiza os valores do vizinho
            neighborNode.previous = currentNode;
            neighborNode.g = gScore;
            neighborNode.h = heuristicCost(neighbor, goal);
            neighborNode.calculateF();
  
            // Se o vizinho não está no conjunto aberto, adiciona-o
            if (!inOpenSet) {
              openSet.push(neighborNode);
            }
          }
        }
      }
    }
  
    // Se não foi encontrado um caminho, retorna null
    return null;
  }
  
  // Exemplo de uso do algoritmo A*
  
  // Matriz de adjacência representando o grafo
  const adjacencyMatrix = [
    [0, 10, 28, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Oliveira Fortes
    [10, 0, 0, 0, 19, 0, 0, 0, 40, 0, 0, 0, 0, 0], //Paiva
    [28, 0, 0, 0, 0, 20, 30, 0, 0, 0, 0, 0, 0, 0], //São João da Serra
    [10, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 0], //Aracitaba
    [0, 19, 0, 0, 0, 0, 27, 0, 25, 0, 0, 0, 0, 0,], //Mercês
    [0, 0, 20, 0, 0, 0, 30, 24, 0, 0, 0, 0, 0, 0], //Piau
    [0, 0, 30, 24, 27, 30, 0, 40, 15, 27, 0, 0, 0, 0,], //Tabuleiro
    [0, 0, 0, 0, 0, 24, 40, 0, 0, 12, 0, 0, 0, 0], //Goianá
    [0, 40, 0, 0, 25, 0, 15, 0, 0, 0, 0, 26, 20, 0], //Rio Pomba
    [0, 0, 0, 0, 0, 0, 27, 12, 0, 0, 20, 0, 0, 0], //Rio Novo
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 11, 0], //Guarani
    [0, 0, 0, 0, 0, 0, 0, 0, 26, 0, 0, 0, 21, 13], //Tocantins
    [0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 11, 21, 0, 0], //Piraúba
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0] //Ubá
  ]
  
  const startVertex = 0; // Vértice inicial
  const goalVertex = 13; // Vértice objetivo
  
  console.log("Caminho mais curto:", aStarAlgorithm(adjacencyMatrix, startVertex, goalVertex));