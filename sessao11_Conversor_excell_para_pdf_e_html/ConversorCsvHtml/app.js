//carregando as classes
var Reader = require("./Reader");
var Processor = require("./Processor");
var Table = require("./Table");

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
   
    /**Variavel que irá receber os dados que foram 
     * processados na classe Processor pelo método
     * estático Process
     */
    var dadosProcessados = Processor.Process(dados);

    var usuarios = new Table(dadosProcessados);
    /* Testes
    console.log(usuarios.header);
    console.log(usuarios.rows);
    console.log(usuarios.RowCount);
    console.log(usuarios.ColumnCount);

    //adicionando uma nova linha á tabela de forma dinâmica
    usuarios.rows.push(["João","Formação PHP","PHP","32"]);
    usuarios.rows.push(["João","Formação PHP","PHP","32"]);
    usuarios.rows.push(["João","Formação PHP","PHP","32"]);
    usuarios.rows.push(["João","Formação PHP","PHP","32"]);
    console.log(usuarios.RowCount);
    console.log(usuarios.ColumnCount);
    */
   

}

//rodando a aplicação.
main();
