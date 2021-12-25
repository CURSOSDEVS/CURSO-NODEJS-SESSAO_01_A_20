<template>
  <div id="app">

    <!--Codigo de teste do bulma no projeto-->
    <div class="buttons">
      <button class="button is-primary is-light">Primary</button>
      <button class="button is-link is-light">Link</button>
    </div>

    <!--Final do cógido de teste do bulma-->

    <h1>Guia Clientes</h1>
    <h3>Cadastro:</h3>
    <small id="nomeErro" v-show="deuErro">O nome é invalido!, tente novamente</small><br>
    <input type="text" placeholder="nome" v-model="nomeField"><br>
    <input type="email" placeholder="email" v-model="emailField"><br>
    <input type="number" placeholder="idade" v-model="idadeField"><br>
    <button @click="cadastrarUsuario">Cadastrar</button>

    <div v-for="(cliente,index) in orderClientes" :key="cliente.id">
      <h4> {{index + 1}} </h4>
      <cliente :cliente="cliente" @meDelete="deletarUsuario($event)" />
      <hr>
    </div>

  </div>
</template>

<script>
    import _ from '../node_modules/lodash';
    import Cliente from './components/Cliente';

    export default {
      name: 'App',

      components:{
        Cliente
      },

      data(){
        return {
          //variáveis temporárias para salvar os dados no array clientes
          nomeField:"",
          emailField:"",
          idadeField: 0,

          //variavel para verificar se o usuário digitou corretamente o nome do usuário
          deuErro: false,

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
      },

      methods:{
        cadastrarUsuario: function(){
          //verificando se o campo é vazio
          if(this.nomeField =="" || this.nomeField==" "|| this.nomeField < 3){
            //console.log("Erro de validação")
            this.deuErro= true;
          }else{
            this.deuErro=false;
            this.clientes.push({nome: this.nomeField, email: this.emailField, idade: this.idadeField, id: Date.now()}),
            this.nomeField= "",
            this.idadeField="",
            this.emailField=""
          }
        },

        deletarUsuario: function($event){
         // console.log("Recebendo evento!");
         // console.log($event);
         // console.log($event.component.idCliente);
         // $event.component.testar();
         var id = $event.idCliente;
         var novoArray = this.clientes.filter(cliente => cliente.id != id)
         this.clientes = novoArray;
          
        }
      },

      computed: {
          orderClientes: function(){
            return _.orderBy(this.clientes,['nome'],['asc']);
          }
        }
    
    }
</script>

<style>
  #nomeErro{
    color: red;
  }
</style>
