module.exports = {
    Result: function topologicalSort(adjacencyMatrix) {
        let result = [];
        let leftInc = [];

        class Graph {
            constructor(adjMatrix) {
                this.adjMatrix = adjMatrix;
                this.numVertices = adjMatrix.length;
                this.index = 1;
                this.stack = [];
                this.visited = new Array(this.numVertices).fill(false);
                this.lowLink = new Array(this.numVertices).fill(0);
                this.ids = new Array(this.numVertices).fill(-1);
                this.sccCount = 0;
            }

            scc() {
                for (let i = 0; i < this.numVertices; i++) {
                    if (!this.visited[i]) {
                        this.strongConnect(i);
                    }
                }
            }

            genereteNullPlentyLeftInc(result_length) {
                for (let i = 0; i < result_length; i++) {
                    leftInc.push([])
                }
            }

            genLeftInc(result) {
                this.genereteNullPlentyLeftInc(result.length)
                for (let ires = 0; ires < result.length; ires++) {
                    for (let jres = 0; jres < result[ires].length; jres++) {
                        for (let i = 0; i < adjacencyMatrix.length; i++) {
                            if (adjacencyMatrix[i][result[ires][jres] - 1] == 1) {
                                for (let newresi = 0; newresi < result.length; newresi++) {
                                    for (let newresj = 0; newresj < result[newresi].length; newresj++) {
                                        if (result[newresi][newresj] == i + 1) {
                                            leftInc[ires].push(newresi + 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            removingDuplicates(leftInc) {
                console.log(leftInc);
                let newLeftInc = []
                for (let i = 0; i < leftInc.length; i++) {
                    let noDupl = Array.from(new Set(leftInc[i]));
                    newLeftInc.push(noDupl)
                }
                for (let i = 0; i < newLeftInc.length; i++) {
                    for (let j = 0; j < newLeftInc[i].length; j++) {
                        if (newLeftInc[i][j] === i+1) {
                            newLeftInc[i].splice(j, j + 1)
                        }
                    }
                }
                return newLeftInc
            }

            strongConnect(vertex) {
                this.visited[vertex] = true;
                this.lowLink[vertex] = this.index;
                this.ids[vertex] = this.index;
                this.index++;
                this.stack.push(vertex);

                for (let w = 0; w < this.numVertices; w++) {
                    if (this.adjMatrix[vertex][w]) {
                        if (!this.visited[w]) {
                            this.strongConnect(w);
                            this.lowLink[vertex] = Math.min(this.lowLink[vertex], this.lowLink[w]);
                        } else if (this.stack.includes(w)) {
                            this.lowLink[vertex] = Math.min(this.lowLink[vertex], this.ids[w]);
                        }
                    }
                }

                if (this.lowLink[vertex] === this.ids[vertex]) {
                    let w = -1;
                    let scc = [];

                    while (w !== vertex) {
                        w = this.stack.pop();
                        scc.push(w + 1);
                    }
                    scc.sort((a, b) => (a - b));
                    result.push(scc)
                    this.sccCount++;
                }
            }
        }
        for (let i = 0; i < adjacencyMatrix.length; i++) {
            for (let j = 0; j < adjacencyMatrix.length; j++) {
                adjacencyMatrix[i][j] = +adjacencyMatrix[i][j];
            }

        }
        const graph = new Graph(adjacencyMatrix);
        graph.scc();
        graph.genLeftInc(result)
        leftInc = graph.removingDuplicates(leftInc)
        return {
            resultMatrix: result,
            leftInc: leftInc
        }
    }
}
