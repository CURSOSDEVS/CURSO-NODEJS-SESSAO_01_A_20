

class Processor{

    static Process(data){
        /**Iremos receber os dados que estão no formato
         * string e iremos separar as linhas e colunas
         * Iremos utilizar o método split para isso
         */

        /**iremos primeiro separar as linhas utilizando
         * os caracteres especiais de quebra de linha.
         * O resultado será um array das linhas
         */
        var a = data.split("\r\n");

        /**Agora vamos percorrer cada linha e separar as
         * colunas utilizando split. criamos um array
         * que irá receber os arrays de cada linha
         */
        var rows =[];

        a.forEach(row => {
            var arr = row.split(',');
            /**temos que utilizar o método push para adicionar
             * algum dados dentro do array
             */
            rows.push(arr);
        
        });

        return rows;

    }

    
}

module.exports = Processor;