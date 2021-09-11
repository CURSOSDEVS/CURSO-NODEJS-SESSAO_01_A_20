//importando a classe ejs
const ejs = require("ejs");

class HtmlParser{

    /**método estático que irá converter a tabela
     * em html, mas temos que ter um arquivo base "ejs"
     * onde será passado os dados
     */
    static async Parse(table){
        return await ejs.renderFile("./table.ejs",{
            header: table.header,
            rows: table.rows 
        });
    
    }
}

module.exports = HtmlParser;