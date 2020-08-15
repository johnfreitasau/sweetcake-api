# Recuperacao de senha

**RF**

- O usuario deve poder recuperar sua senha informando o seu email

- O usuario deve receber um e-mail com instrucoes de recuperacao de senha.

- O usuario deve poder resetar sua senha

**RNF**

- Utilizar Mailtrap para testar o envio de email em anbiente de dev.

- Utilizar Amazon SES para envios de producao. (amazon simple email service – mais bacana e barato de integrar).

- O envio de e-mails deve acontecer em segundo plano (background job) - Fila onde mandamos acoes pra essa fila e ela da conta disso quando der.


**RN** Regras de negocio

- O link enviado por email para resetar senha, deve expirar em 2 hr.

- O usuario precisa confirmar a nova senha ao resetar sua senha.


# Atualizacao de perfil

**RF**

- O usuario deve poder atualizar seu nome, email e senha.

**RNF**

- N/A

**RN**

- O usuario nao pode alterar seru email para um email ja utilizado

- PAra atualizar sua senha o usuario deve informar a senha antiga

- Para atualizar sua senha, o usuario precisa confirmar a nova senha


# painel do prestador

**RF**

- O usuario deve poder listar seus agendamentos em dias especificos

- O prestador deve poder receber uma notificacao sempre que houver um novo agendamento

- O prestador deve poder visualizar as notificacoes nao lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache

- As notificacoes do prestador devem ser armazenadas no MongoDB

- As notificacoes do prestador devem ser enviadas em tempo-ral utilizando socket.io

**RN**

- A notificacao deve ter um status de lida ou nao lida para que o prestador possa controlar


# Agendamento de servicos

**RF**

- O usuario deve poder listar todos prestadores de servicos cadastrados

- O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador

- O usuario deve poder listar horarios disponiveis em um dia especifico de um prestador

- O usuario deve poder realizar um novo agendamento com um prestador

**RNF**

- A listagem de prestadores deve ser armazanada em cache

**RN**

- Cada agendamento deve durar 1hr exatamente

- Os agendamentos devem estar disponiveis entre 8hrs as 18hrs (primeiro as 8 e ultimo as 17hrs)

- O usuario nao pode agendar em um horario ja ocupado

- O usuario nao pode agendar uem um horario que ja passou

- O usuario nao pode agendar servicos consigo mesmo
