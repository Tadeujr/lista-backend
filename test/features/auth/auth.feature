Funcionalidade: Login do usuário
  
  Critério de aceitação:
  retorna a resposta esperada na cláusura do "Então"

  Cenário: Logar no sistema
    Dado eu seja cadastrado
    Quando eu informe o email e senha
    Então eu visualizar o token do usuário salvo

  