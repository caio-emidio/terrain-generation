# Gerador de Terreno com Cellular Automata

Este é um simples gerador de terreno implementado em JavaScript usando o algoritmo de 'Cellular Automata Cave Generation'.

## Descrição

Esse gerador utiliza regras simples para simular a formação de terrenos em um mapa 2D. Ele funciona através de iterações sobre uma matriz de células, aplicando regras de vizinhança para gerar padrões de terreno.

## Funcionamento

O código utiliza o algoritmo de 'Cellular Automata' para gerar terrenos. Aqui estão os passos principais:

1. Inicialização de um mapa com valores aleatórios representando diferentes tipos de blocos (água, grama, etc.).
2. Execução de iterações para aplicar regras de vizinhança para cada célula do mapa.
3. Baseado na contagem de vizinhos de um determinado tipo, atualiza o tipo da célula para água ou grama.

## Como Usar

1. Clone ou faça o download deste repositório.
2. Abra o arquivo `index.html` em um navegador da web.
3. O código fornecido no arquivo JavaScript `script.js` gera automaticamente um mapa de terreno na tela.

## Modificações

Você pode ajustar o tamanho do mapa (`side`) para gerar terrenos maiores ou menores. Além disso, pode experimentar modificando as regras de geração para criar diferentes tipos de terrenos.