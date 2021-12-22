<template>
    <div id="cliente">
        <h4>Nome: {{cliente.nome}}</h4>
        <hr>
        <p>Email: {{cliente.email}}</p>
        <p>Idade: {{cliente.idade}}</p>
    </div>  
</template>

<script>
export default {

    data(){
        return {
            numero: "2",
            descricao: "Lorem ipsum lorem ipson"
        }
    },

    props: {
        nome: String,
        email: String,
        idade: Number,
        //tipo objeto
        cliente: Object
    }
    
}
</script>

<style scoped>
    #cliente{
        background-color: #ECE5E3;
        max-width: 600px;
        height: 180px;
        padding: 1%;
        margin-top: 2%;
    }
    
</style>