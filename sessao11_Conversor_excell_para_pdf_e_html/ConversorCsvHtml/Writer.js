//importando as classes fs e util
const fs = require("fs");
const util = require("util");

class Writer{
    constructor(){
        //atributo
        this.writer = util.promisify(fs.writeFile);
    }
    /**Neste método recebemos o nome do arquivo que ieremos
     * criar e os dados que serão passados para este 
     * arquivo. Será criado no diretório raiz um arquivo do tipo html
    */
    async Write(fileName, data){
        try {
            await this.writer(fileName,data);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = Writer;