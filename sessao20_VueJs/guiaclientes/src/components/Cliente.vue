<template>
    <div id="cliente">
        <h1 id="cliente-nome">Cliente</h1>
        <hr>
        <h3>One way data bind</h3>        
        <input type="text" :value="nome"><br><br>
        <input type="text" :value="descricao">
        <hr>
        <h3>Two way data bind</h3>
        <input type="text" v-model="nome"><br><br>
        <input type="text" v-model="descricao">
        <hr>
        <h3>Nome do cliente: {{nome}}</h3>
        <p>Descrição do cliente: {{descricao}}</p>
        
    </div>  
</template>

<script>
export default {

    data(){
        return {
            nome : "Joâo da Silva",
            numero: "",
            email: "",
            idade: 80,
            descricao: "Lorem ipsum lorem ipson"
        }
    }
    
}
</script>

<style scoped>
    #cliente{
        color: blue;
        background-color: beige;
        max-width: 600px;
        height: 100px;
    }
    #cliente-nome{
        color: green;
    }
</style>