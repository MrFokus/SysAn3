<template>
  <main class="adjacency-incident-L_incident">
    <div class="content">
      <h2 style="color: white">Лабораторная работа №3</h2>
      <h3>Введите размер матрицы смежности</h3> <br>
      <select v-model="sizeMatrix">
        <option v-for="val in 10">{{ val }}</option>
      </select>
      <button class="result" @click="Result">Расчитать</button>
      <div class="matrixs">
        <div v-if="sizeMatrix>0" class="input">
          <table>
            <tr>
              <th></th>
              <th v-for="i in +sizeMatrix">{{ i }}</th>
            </tr>
            <tr v-for="j in +sizeMatrix">
              <td style="font-weight: bold; color: white">{{ j }}</td>
              <td v-for="i in +sizeMatrix">
                <input class="cell" type="text" v-model="matrix[+j-1][+i-1]">
              </td>
            </tr>
          </table>
          <br>
          <p class="error" v-if="error">{{ error }}</p>
        </div>
        <div v-if="isMatrix" class="levels">
          <h3>Выделенные подграфы</h3>
          <div  class="level" v-for="(graph,index) in result.resultMatrix">
            <p>Подграф G({{index+1}}) :</p>
            <span v-for="(node) in graph"> {{node}}</span>
          </div>
        </div>
        <div v-if="isMatrix" class="left-incident">
          <h3>Список множества левых инциденций подграфов</h3>
          <ul>
            <li v-for="[key, value] of Object.entries(left_matrix_incident)">{{ `G(${+key+1})` }}<sup>-</sup> =
              {{ `(${value})` }}
            </li>
          </ul>
        </div>
        </div>

      </div>

  </main>
</template>

<script>
export default {
  data() {
    return {
      result: null,
      isMatrix: false,
      sizeMatrix: null,
      matrix: [],
      new_matrix_adjacencies: [],
      left_matrix_incident: {},
      error: null,
    }
  },
  watch: {
    sizeMatrix() {
      if (this.sizeMatrix !== null) {
        this.error = null
      }
      this.isMatrix = false
      this.matrix = [];
      for (let i = 0; i < this.sizeMatrix; i++) {
        this.matrix.push([])
        for (let j = 0; j < this.sizeMatrix; j++) {
          this.matrix[i].push(0)
        }

      }
      console.log(this.matrix)
    },
  },
  methods: {
    async Result() {
      this.error=null;
      this.left_matrix_incident={};
      this.result = await this.$axios.$post('http://localhost:3001/', {
        matrix: this.matrix
      });
      if (typeof this.result!=="object"){
        this.error=this.result;
        this.left_matrix_incident={}
        this.isMatrix=false
        return;
      }
      console.log(this.result);
      this.isMatrix=true;
      this.left_matrix_incident=this.result.leftInc
    },
  },

  mounted() {
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue", serif;
}

body {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(static/background.png);

}

.adjacency-incident-L_incident {
  max-width: 80vw;
  width: 1400px;
  min-width: 600px;
  max-height: 98vh;
  overflow-y: scroll;
  margin: 1vw;

  background: rgba(237, 228, 228, 0.40);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12.5px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 26px;

}

.content {
  padding: 3vw;
  max-width: 80%;
}

.matrixs {
  display: flex;
  flex-wrap: wrap;
}

.row > p {
  display: inline;
  margin-left: 1.8vw;
}

.row > p:nth-child(n+10) {
  margin-left: 1.4vw;
}

p {
  font-size: 1vw;
  color: white;
}

h3, .result, th {
  color: white;
}

td > input, td {
  width: 3vw;
  height: 3vw;
  border: none;
}


tr, input {
  text-align: center;

}

.left-incident > h3, .levels>h3 {
  margin-top: -1.5vw;
  margin-bottom: 1.5vw;
}
.levels{
  margin: 0 2vw;
}
span,.levels p{
  color: white;
}
.levels p{
  font-weight: bold;
  margin-bottom: 1vw;
}
.left-incident > ul > li {
  color: white;
  font-family: "Helvetica Neue", serif;
  list-style-type: none;
  font-weight: bold;
}

.error {
  color: red;
  font-size: 1vw;
  font-weight: bold;
}

.result {
  width: 6vw;
  height: 2vw;
  border-radius: 0.2vw;
  background-color: #00b600;
  font-weight: bold;
  border: none;
  margin-bottom: 2vw;
  font-size: 1vw;
}

.result:active {
  background-color: #00a000;
}

select {
  width: 6vw;
  height: 2vw;
}

.matrix {
  display: inline-block;
  max-width: 100%;
  margin-right: 3vw;
}

.matrix > .table {
  max-width: 90%;
  overflow-x: scroll;
}

.input {
  margin-right: 5vw;
  margin-bottom: 3vw;
}

.matrix > h3 {
  margin-top: -1.5vw;
}
</style>
