class Dado{
    
    constructor(faces){
        this.faces = faces;
        this.Rolar();
    }

    Rolar(){
       console.log("Resultado do dado: "+ this.GetRandomIntInclusive(1,this.faces));
    }

    GetRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

}

//var cassino = new Dado(8);
var sorteio1 = new Dado(6);
var sorteio1 = new Dado(20);
var sorteio1 = new Dado(100);