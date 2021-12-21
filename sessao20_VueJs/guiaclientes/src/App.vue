<template>
  <div id="app">
    <h1>Guia Clientes</h1>
    <cliente/>
    <hr>
    <h4>Lista de produtos</h4>
    <hr>
    <produto/>
    <produto/>
    <produto/>
  </div>
</template>

<script>
    import Cliente from './components/Cliente';
    import Produto from './components/Produto';
    export default {
      name: 'App',

      components:{
        Cliente,
        Produto
      }
    
    }
</script>

<style>

</style>
