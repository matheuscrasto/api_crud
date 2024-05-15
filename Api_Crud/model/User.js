const mongoose = require('mongoose'); // Faz import da ORM em questão
const Schema = mongoose.Schema; // Cria um novo esquema dentro da ORM

let User = new Schema({  // Criação da classe usuário e insere os atributos :
  nome: {
    type: String
  },
  idade: {
    type: Number
  },
  telefone: {
    type: Number
  }
},{
    collection: 'user' // Transforma a função acima em uma tabela dentro do BD"
});

module.exports = mongoose.model('User', User); // Exporta o modelo