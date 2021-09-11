//carregando as classes
var Reader = require("./Reader");
var Processor = require("./Processor")

var leitor = new Reader();

/**Quando utilizamos promises e async/await, retornamos
 * dados que podem ser tratados e utilizados de maneira
 * mais simples, porem pricisamos tambem de uma funcao
 * principal asincrona no aplicativo para rodar.
 */

async function main(){
    /**variavel dados irá receber os dados no formato
     * de string pelo método Read da classe Reader.
     */
    var dados =  await leitor.Read("./Dados.csv");
    console.log(dados);

    /**Variavel que irá receber os dados que foram 
     * processados na classe Processor pelo método
     * estático Process
     */
    var dadosProcessados = Processor.Process(dados);
}



//rodando a aplicação.
main();
