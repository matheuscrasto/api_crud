const express = require('express'); // faz importação do express
const app = express(); // "joga" o express nesse const app
const userRoutes = express.Router(); // cria um esquema de rotas do express

//importa o modelo de usuario
let User = require('C:/Users/mathe/OneDrive/Área de Trabalho/Projetos_DEV/Api_Crud/model/User.js'); 

// Api para inserir usuários - metodo post
userRoutes.route('/add').post(function (req, res) {
    let user = new User(req.body); // Faz instância de um novo objeto (user), 
    //que recebe como padrão req.body (Corpo da requisição front-end);    
    user.save() // Salva no banco de dados
    // verificação de sucesso e/ou falha que é devolvida ao front-end :
    .then(user => {
      res.status(200).json({'status': 'success','mssg': 'Usuário adcionado com sucesso!'});
    })
    .catch(err => {
      res.status(409).send({'status': 'failure','mssg': 'Não foi possível salvar à base de dados!'});
    });
  });
  
 // Api para retonar diversos usuários - metodo get
userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users){
      if(err){ //exemplificação com if/else (mesma funcionalidade da inserção)
        res.status(400).send({'status': 'failure','mssg': 'Algo saiu errado...'});
      }
      else {
        res.status(200).json({'status': 'success','users': users}); // se sucesso, retorna lista de usuários
      }
    });
  });
  
  // Api para retornar 1 usuário em específico - metodo get
  userRoutes.route('/user/:id').get(function (req, res) {
    let id = req.params.id; // coleta os parâmetros de ID
    User.findById(id, function (err, user){ // Faz a busca do usuário pelo ID
      if(err){
        res.status(400).send({'status': 'failure','mssg': 'Algo saiu errado'});
      }
      else {
        res.status(200).json({'status': 'success','user': user});
      }
    });
  });
  
  // Api para atualizar o dado - metodo put
  userRoutes.route('/update/:id').put(function (req, res) {
      User.findById(req.params.id, function(err, user) {
      if (!user){
        res.status(400).send({'status': 'failure','mssg': 'Não foi possível encontrar o dado especificado'});
      } else {
          user.name = req.body.name;
          user.email = req.body.email;
          user.phone_number = req.body.phone_number;
  
          user.save().then(business => {
            res.status(200).json({'status': 'success','mssg': 'Atualização completa'});
        })
      }
    });
  });
  
  // Api para deletar - metodo delete
  userRoutes.route('/delete/:id').delete(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err,){
      if(err){
        res.status(400).send({'status': 'failure','mssg': 'Algo de errado aconteceu...'});
      }
      else {
        res.status(200).json({'status': 'success','mssg': 'Deletado com sucesso'});
      }
    });
  });

  module.exports = userRoutes;