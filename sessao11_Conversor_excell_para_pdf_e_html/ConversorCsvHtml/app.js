var Reader = require("./Reader");

var leitor = new Reader();

/**Quando utilizamos promises e async/await, retornamos
 * dados que podem ser tratados e utilizados de maneira
 * mais simples, porem pricisamos tambem de uma funcao
 * principal asincrona no aplicativo para rodar.
 */

async function main(){
    var dados =  await leitor.Read("./Dados.csv");
    console.log(dados);
}


//rodando a aplicação.
main();
