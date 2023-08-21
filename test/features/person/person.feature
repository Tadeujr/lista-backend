Funcionalidade: Cadastro de Pessoa
  
  Critério de aceitação:
  retorna a resposta esperada na cláusura do "Então"

  Cenário: Cadastra um produto com Sucesso
    Dado eu queira cadastrar 
    Quando eu informe os campos nome, cidade, uf, cep, password e Person 
    Então eu devo visualizar o bojeto Pessoa cadastrado
