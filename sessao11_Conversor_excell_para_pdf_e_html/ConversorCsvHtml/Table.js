
class Table{

    /**iremos receber o array que foi processado */
    constructor(arr){

        //varivável que será o cabeçalho da tabela
        this.header = arr[0];

        /**como o cabeçalho já está salvo em uma variavel
         * iremos remover esta linha com metodo shift
         * de arrays, isso remove sempre a primeira linha
         */
        arr.shift();

        /**variavel que será as linhas da tabela
         */
        this.rows = arr;

    }

    /**metodo que retorna a quantidade de linhas, porém
     * utilizando get no começo do método, torna este 
     * um atributo. Utilizamos a propriedade length que
     * irá retornar a qtd de linhas.
     * Esse será um campo virtual
     */
    get RowCount(){
        return this.rows.length;
    }

    /**Campo virtual para contagem de colunas */
    get ColumnCount(){
        return this.header.length;
    }

}

module.exports = Table;