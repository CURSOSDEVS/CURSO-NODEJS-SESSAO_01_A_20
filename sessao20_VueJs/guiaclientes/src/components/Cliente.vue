<template>
    <div :class="{'cliente': !isPremiun,'cliente-premium':isPremiun}">
        <h4>Nome: {{cliente.nome}}</h4>
        <hr>
        <p>Email: {{cliente.email | processarEmail}}</p>
        <p v-if="showIdade == false">Idade: {{cliente.idade}}</p>
        <p v-else >O Usuário escondeu a idade</p>
        <button @click="mudarCor($event)">Mudar a cor</button>
        <button @click="emitirEventoDelete">Deletar</button>
        <hr>
        <h4>Id Especial: {{idEspecial}}</h4>

    </div>  
</template>

<script>
export default {

    data(){
        return {
           isPremiun: false
        }
    },

    props: {

        //tipo objeto
        cliente: Object,
        showIdade: Boolean
    },

    methods: {
        mudarCor: function($event){
            console.log($event);
            this.isPremiun = !this.isPremiun;
        },

        emitirEventoDelete: function(){
            //console.log("Emitindo um filho");
            //utilizamos este atributo para emitir um evento que será chamado meDelete para o app Pai
            //podemos enviar qualque dados pelo evento
            this.$emit("meDelete", {idCliente:this.cliente.id, component: this});
        }     
    },
    filters:{
        processarEmail: function(value){
            return value.toUpperCase();
        }
    },
    computed:{
        idEspecial: function(){
            return (this.cliente.email + this.cliente.nome + this.cliente.id).toUpperCase(); 
           
        }
    }
}
</script>

<style scoped>
    .cliente{
        background-color: #ECE5E3;
        max-width: 600px;
        height: auto;
        padding: 1%;
        margin-top: 2%;
    }

    .cliente-premium{
        background-color: black;
        color: yellow;
        max-width: 600px;
        height: auto;
        padding: 1%;
        margin-top: 2%;
    }
    
</style>