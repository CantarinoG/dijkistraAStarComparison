matriz = [
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

console.log(dijkstra(matriz, 0, 13))

