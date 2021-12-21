const database = require('./databaseKnex');

class FactoryQueries{
    
    /**Função para realizar cadastro em qualquer tabela
     * data = Deve ser fornecido um Json com os dados que serão inseridos na tabela Ex:
     * var data=[
        {
            nome: "Ubisoft",
            game_id: 16
        }
    ]
     * table = É o nome da tabela entre aspas ex: "games" 
    */
    static insert(data,table){
        return new Promise((resolve,reject)=>{      
            setTimeout(() => {
                var erro;
                
                if(data ==undefined || table == undefined){
                    erro = "A função possui dois parâmetros e devem ser preenchidos";
                }

                resolve(
                    database.insert(data).into(table).then(result=>{
                        console.log("registro inserido :"+ result);
                    }).catch(err=>{
                        erro = "Erro na execução: "+ err;
                    })            
                )
                if(erro != undefined){
                    reject(console.log(erro));
                }
            }, 1000);
        });
    }

    /**Metodo que irá localizar registros em tabelas podendo ser ordenado ou não
     * fields = São os campos que se quer mostrar na tabela Ex: [id: 'id', nome: 'nome'] ou [id: 'id'],
     * se for fornecido apenas " " será mostrado todos os campos.
     * table = É a tabela que se quer utilizar no banco de dados.
     * orderField = Este campo é opcional devendo ser utilizado aspas com vazio ex: " " neste caso 
     * será utilizado automaticamente o campo id, mas se desejar pode-se utilizar outro 
     * campo ex:['nome'].
     * orderType = Este campo é utilizado para informar se a ordenação é crescente ou decrescente. 
     * deve-se informar "asc" para crescente ou "desc" para decrescente
     * */ 
    static select(fields,table, orderField=undefined, orderType = undefined){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {

                var erro;            
               
                if(orderField == undefined){
                    orderField="id";
                }

                if(orderType == undefined){
                    orderType = "asc";
                }

                if(fields==undefined){
                    fields= '*';
                }
                    resolve(
                        database.select(fields).table(table).orderBy(orderField,orderType).then(result=>{
                        console.log(result)}).catch(err=>{
                            erro = err;
                        })
                    )
                    if(erro != undefined){
                        reject(console.log(erro));
                    }
            }, 1000);
        });
    }

    /**Metodo que irá localizar registros na tabela conforme um critério fornecido
     * condition = É a condição que deve ser informada ex: [preco : 100] ou [nome: 'maria']
     * table = Tabela que será utilizada 
    */
    static where(condition,table){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                var erro;

                resolve(
                    database.where(condition).table(table).then(result=>{
                        console.log(result);
                    }).catch(err=>{
                        erro = err;
                    })
                );
                if(erro != undefined){
                    reject(console.log(erro));
                }
            }, 1000);
        });
    }

    /**Método que irá localizar registros na tabela com vários criterios fornecidos
     * condition = Deve ser fornecido os critérios para a busca ex: "preco > 150 and preco < 200"
     *  ou "preco > 150 and preco < 200 or nome = 'GTA' "
     * table = Tabela que será utilizada
     */
    static whereRaw(condition,table){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                var erro;

                resolve(
                    database.whereRaw(condition).table(table).then(result=>{
                        console.log(result);
                    }).catch(err=>{
                        erro = err;
                    })
                );
                if(erro != undefined){
                    reject(console.log(erro));
                }
            }, 1000);
        });
    }

    /**Método utilizado para deletar um registro da tabela
     * id = deve ser fornecido um id do registro que será apagado ex: "1"
     * table = informar o nome da tabela ex: "users"
     */
    static deleteId(id,table){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                var erro;
                var jsonId = {id: id};

                resolve(                
                    database.where(jsonId).delete().table(table).then((result)=>{
                        if(result == 1){
                            console.log("Registro apagado "+ result);
                        }else{
                            console.log("Registro não existe.")
                        }                
                    }).catch(err=>{
                        erro = err;
                    })
                )
                if(erro != undefined){
                    reject(
                        console.log("Não foi possível apagar o registro")
                    )
                }
                
            }, 1000);
        });
    }

    /**Método para atualizar valores de um registro na tabela
     * id = Informar o valor do campo id ex : "3"
     * data = Informar os dados que serão atualizados, sendo que deve-se informar o campo e o valor no formato de json
     * ex: {nome: "Maria Soares" idade: 45}. Esses valores sobreescreverão os valores que estão nos referidos campos da tabela
     * table = Informar o nome da tabela ex: "users"
     */
    static editId(id,data,table){
        return new Promise((resolve,reject)=>{
            setTimeout(() => {
                var erro;
            var jsonId = {id: id};

            resolve(
                database.where(jsonId).update(data).table(table).then(result=>{
                    console.log("Registro atualizado "+ result)
                }).catch(err=>{
                    erro = err;
                })
            )

            if(erro != undefined){
                reject(
                    console.log("Erro ao atualizar registro: "+ erro)
                )
            }
            },1000);
            
        })
    }

    /**metodo para retornar um innerJoin entre duas tabelas do banco de dados
     * fieldsTableBase = São os campos que se que mostrar na consulta podendo ser campos das 
     * duas tabelas ex: ["games.*","estudios.nome as estudio_nome"]
     * essa string irá mostrar todos os camos da tabela games e o campo nome da tabela estudio como
     * estudio_nome. Se este parâmetro for " " ele trará somente o campo id
     * tableBase = É a tabela que não possui a chave estrangeira (fK)
     * tableInner = É a tabela que possui o ID da tabela estrangeira.
     * tableInnerFk = É o campo da tabelaInner que é a chave estrangeira
     * tableBaseId = É o campo Id da tableBase
    */
    static innerJoinFields(fieldsTables,tableBase,tableInner,tableInnerFK,tableBaseId){
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                var erro;
            if (fieldsTables == " "){
                fieldsTables = "id";
            }

            resolve(
                database.select(fieldsTables).table(tableBase).innerJoin(tableInner,tableInnerFK,tableBaseId).then(result=>{
                    return (result);
                }).catch(err=>{
                    erro = err;
                })
            )
            
            if(erro != undefined){
                reject(
                    console.log("Erro ao atualizar registro: "+ erro)
                )
            }
            },1000);
        })
    }

    /**método para realizar um innerJoin de duas tabelas com relacionamento muitos para muitos
     * Parâmetros:
     * tableManyTooMany = É a tabela que contém o relacionamento muitos para muitos
     * table1 e table2 são as tabelas que se relacionam em tableManyTooMany
     * fieldsSelected = São os campos que se que mostrar na consulta
     * fieldIdTable1 e fieldIdTable2 = são os campos ids das tabelas
     * fieldTableManyTooMany = é o campo primary key da tabela que possui os multiplos relacionamentos.
     * conditionRowm = é uma condição que poderá ser utilizada para filtrar a busca
     */
    static innerJoinMultTables(fieldsSelected=null,fieldsSelected2=null,fieldsSelected3=null,fieldsSelected4=null,fieldsSelected5=null
        ,tableManyTooMany,table1,fieldIdTable1,fkTable1InTableMtoMany,
        table2,fieldIdTable2,fkTableInTableMtoMany,condition){
        return new Promise((resolve, reject)=>{          

            setTimeout(() => {
                var erro;
                if(fieldsSelected == undefined){
                    fieldsSelected = " ";
                }
                if(fieldsSelected2 == undefined){
                    fieldsSelected2 = " ";
                }
                if(fieldsSelected3 == undefined){
                    fieldsSelected3 = " ";
                }
                if(fieldsSelected4 == undefined){
                    fieldsSelected4 = " ";
                }
                if(fieldsSelected5 == undefined){
                    fieldsSelected5 = " ";
                }
                resolve( 
                  database.select(fieldsSelected,fieldsSelected2,fieldsSelected3,fieldsSelected4,fieldsSelected5).table(tableManyTooMany)
                    .innerJoin(table1,fieldIdTable1,fkTable1InTableMtoMany)
                    .innerJoin(table2,fieldIdTable2,fkTableInTableMtoMany)
                    .whereRaw(condition).then(result=>{
                       // console.log("Resultado :"+result);  
                        return result;
                     }).catch(err=>{
                         erro = err;
                     })
                     
                )
             
             if(erro != undefined){
                 reject(
                     console.log("Erro: "+erro)
                 )
             }
                
            }, 1000);         
        })
    }

}

module.exports = FactoryQueries;

