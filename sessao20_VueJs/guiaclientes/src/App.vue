<template>
  <div id="app">
    <h1>Guia Clientes</h1>
    <input type="text" v-model="clienteVictor.nome" />

    <cliente :cliente="clienteVictor" :showIdade="false"/>
    <cliente :cliente="clienteVictor" :showIdade="true"/>
    <cliente :cliente="clienteVictor" :showIdade="false"/>
    <cliente :cliente="clienteVictor" :showIdade="true"/>
  </div>
</template>

<script>
    import Cliente from './components/Cliente';

    export default {
      name: 'App',

      components:{
        Cliente
      },

      data(){
        return {
          clienteVictor: {
            nome: "Victor Lima",
            email: "Victor@lima",
            idade: 23
          }
        }
      }
    
    }
</script>

<style>

</style>
