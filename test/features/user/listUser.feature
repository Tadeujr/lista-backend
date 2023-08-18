Funcionalidade: Opções de cadastro de Usuário

  Critério de aceitação:
  retorna a resposta esperada na cláusura do "Então"

Cenário: Buscar usuário
    Dado que eu tenha um usuário cadastrado
    Quando eu fizer informar o email cadastrado
    Então eu visualizo um objeto com a informações de id, email e password


# Cenário: Altera senha do usuário
#     Dado que eu tenha um usuário cadastrado
#     Quando eu  informar o email cadastrado e o id
#     Então eu atualize a senha do suaário


# Cenário: deletar usuário
#     Dado que eu tenha um usuário cadastrado
#     Quando eu  informar o id do usuário cadastrado
#     Então eu deleto o usuário
