<template>
  <div id="app">
    <h1>Guia Clientes</h1>
    <input type="text" v-model="clienteVictor.nome" />
    
    <div v-for="(cliente,index) in clientes" :key="cliente.id">
      <h4> {{index + 1}} </h4>
      <cliente :cliente="cliente"/>
      <hr>
      <h4>Edição:</h4>
      <input type="text" v-model="cliente.nome">
      <input type="text" v-model="cliente.email">
    </div>

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
            nome: "Debora Sobrinho",
            email: "debora@s",
            idade: 40
          },
          clientes: [
            {
              id: 2,
              nome: "Sthefany S alves",
            email: "sth@alves",
            idade: 18
            },
            {
              id: 3,
              nome: "Carolina S Alves",
            email: "Carol@alves",
            idade: 14
            },
            {
              id: 5,
              nome: "Claudisnei Bello",
            email: "cba@alves",
            idade: 48
            },
            {
              id: 8,
              nome: "Debora Sobrinho",
            email: "debora@s",
            idade: 40
            }
          ]
        }
      }
    
    }
</script>

<style>

</style>
