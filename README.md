# Events

backend Nodejs

Funcionalidades: <br>
Cadastrar um evento:
Dados do evento: Título, descrição, local do evento, data do evento , data limite para inscrição, idade mínima para participar, Qtd máxima de participantes
Inscrição em evento:
Dados da inscrição: Nome Pessoa, CPF, Data de Nascimento, e-mail.
Emitir lista inscritos:
Nome do evento, nome pessoa, CPF.

Restrições:
Uma pessoa só pode se inscrever se a data < data limite para inscrição.
Uma pessoa só pode se inscrever se ela tiver idade >= a idade mínima permitida para o evento.
Uma pessoa só pode se inscrever uma vez por evento.
acesso a tela de cadastro de eventos deve ser protegida, acesso com usuário e senha.
A quantidade de inscritos não deve ser superior a quantidade máxima definida para o evento.
Ao finalizar a inscrição, a pessoa deve receber um e-mail informando os dados da inscrição.
