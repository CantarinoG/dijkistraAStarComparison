matriz = [
    [ 0, 1, 1, 1 ],  // arestas de A
    [ 1, 0, 0, 1 ],  // arestas de B
    [ 1, 0, 0, 1 ],  // arestas de C
    [ 1, 1, 1, 0 ]   // arestas de D
  ]

function dijkstra(matriz, verticeInicial, verticeFinal)
{
    let distancias = new Array(matriz.length);
    let spt = new Array(matriz.length); //Shortest path tree: Vértices presentes na árovre de menor caminho
     
    for(let i = 0; i < matriz.length; i++)
    {
        distancias[i] = Infinity;
        spt[i] = false;
    }
     
    distancias[verticeInicial] = 0;

    for(let i = 0; i < matriz.length - 1; i++)
    {
 
        let u = distanciaMinima(matriz, distancias, spt); //Vértice de menor distancia dentre os vértices não visitados
         
        spt[u] = true;
         
        for(let v = 0; v < matriz.length; v++)
        {
            if (!spt[v] && matriz[u][v] != 0 &&
                   distancias[u] != Infinity &&
                   distancias[u] + matriz[u][v] < distancias[v])
            {
                distancias[v] = distancias[u] + matriz[u][v];
            }
        }
    }
     
    return distancias[verticeFinal]
}

function distanciaMinima(matriz, distancias, spt)
{
     
    let min = Infinity;
    let min_index = -1;
     
    for(let v = 0; v < matriz.length; v++)
    {
        if (spt[v] == false && distancias[v] <= min)
        {
            min = distancias[v];
            min_index = v;
        }
    }
    return min_index;
}

console.log(dijkstra(matriz, 1, 2))

