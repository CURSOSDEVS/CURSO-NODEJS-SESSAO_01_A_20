//importando a classe de conversao
const pdf = require("html-pdf");

class PDFWriter{

    static writePDF(fileName, fileHtml){
       
           pdf.create(fileHtml,{}).toFile(fileName,(err)=>{});

    }
}

module.exports = PDFWriter;