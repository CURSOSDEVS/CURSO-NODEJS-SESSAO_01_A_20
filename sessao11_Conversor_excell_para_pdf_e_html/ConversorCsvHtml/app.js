//carregando as classes
var Reader = require("./Reader");
var Processor = require("./Processor");
var Table = require("./Table");
var HtmlParser = require("./HtmlParser")
var Writer = require("./Writer");
const { writer } = require("repl");

var leitor = new Reader();
var escritor = new Writer();

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
    
    /**Através da classe HtmlParser pegamos os dados
     * da tabela e com o ejs renderizamos o arquivo
     * table.ejs com os dados e variaveis que foram
     * configurados dentro da classe HtmlParser
     */

    /**html sera a variavel que irá armazenar o arquivo criado pelo ejs no HtmlParser 
     * tomando o arquivo base table.ejs.
     */
    var html = await HtmlParser.Parse(usuarios);
    //    console.log(html);

    /**será criado o arquivo cujo nome será o momento atual */
    escritor.Write( Date.now()+".html",html);

}

//rodando a aplicação.
main();
