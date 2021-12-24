<template>
    <div :class="{'cliente': !isPremiun,'cliente-premium':isPremiun}">
        <h4>Nome: {{cliente.nome}}</h4>
        <hr>
        <p>Email: {{cliente.email}}</p>
        <p v-if="showIdade == false">Idade: {{cliente.idade}}</p>
        <p v-else >O Usuário escondeu a idade</p>
        <button @click="mudarCor($event)">Mudar a cor</button>
        <button @click="emitirEventoDelete">Deletar</button>

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
            this.$emit("meDelete", {idCliente:this.cliente.id,  curso:"Formação nodeJS", emPromocao: true, component: this});
        },

        testar: function(){
            //console.log("Testando metodo filho");
           // alert("Evento do filho")
        }
    
    }
    
}
</script>

<style scoped>
    .cliente{
        background-color: #ECE5E3;
        max-width: 600px;
        height: 180px;
        padding: 1%;
        margin-top: 2%;
    }

    .cliente-premium{
        background-color: black;
        color: yellow;
        max-width: 600px;
        height: 180px;
        padding: 1%;
        margin-top: 2%;
    }
    
</style>