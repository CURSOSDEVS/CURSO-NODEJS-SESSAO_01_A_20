<template>
    <div id="cliente">
        <h1 id="cliente-nome">Cliente</h1>
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