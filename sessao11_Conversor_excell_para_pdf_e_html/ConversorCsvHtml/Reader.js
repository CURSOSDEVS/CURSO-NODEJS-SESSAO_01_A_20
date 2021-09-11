//importando a biblioteca responsavel por manipular arquivos
const fs = require("fs");
//recebendo o módulo do node
const util = require("util");


//classe de leitor
class Reader{

    /**Iremos utilizar o recurso promisify do módulo
 * util para converter uma função que tem somente 
 * callback em uma função com promisses
 * 
 */
    constructor(){
        //atributo criado para fazer a conversão de
        //callback para promises
        this.reader = util.promisify(fs.readFile);
    }


    //metodo que irá receber o caminho do arquivo que será lido
    async Read(filepath){

        /**Essa maneira utiliza promises 
         * por isso utilizamos async await
         * por isso colocamos async no inicio da funcao
         * alem de tratarmos os erros
        */
       try {
        return await this.reader(filepath,"utf-8")
       } catch (err) {
           
       }
        return undefined;
    }

}

module.exports = Reader;