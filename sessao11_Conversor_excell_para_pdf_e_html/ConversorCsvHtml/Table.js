
class Table{

    /**iremos receber o array que foi processado */
    constructor(arr){
        //varivável que será o cabeçalho da tabela
        this.header = arr[0];
        /**como o cabeçalho já está salvo em uma variavel
         * iremos remover esta linha com metodo shift
         * de arrays, que remove sempre a primeira linha
         */
        arr.shift();
        /**variavel que será as linhas da tabela
         */
        this.rows = arr;

    }

}

module.exports = Table;