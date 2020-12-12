# Events

backend Nodejs

<h1>Funcionalidades:</h1> <br> <br>
<h2>Cadastrar um evento:</h2> <br>
<strong>Dados do evento:</strong> Título, descrição, local do evento, data do evento , data limite para inscrição, idade mínima para participar, Qtd máxima de participantes.<br>
<h2>Inscrição em evento:</h2>
<strong>Dados da inscrição:</strong> Nome Pessoa, CPF, Data de Nascimento, e-mail. <br>
<h2>Emitir lista inscritos:</h2>
Nome do evento, nome pessoa, CPF.

<h1>Restrições:</h1> <br> <br>
Uma pessoa só pode se inscrever se a data < data limite para inscrição.<br>
Uma pessoa só pode se inscrever se ela tiver idade >= a idade mínima permitida para o evento.<br>
Uma pessoa só pode se inscrever uma vez por evento.<br>
acesso a tela de cadastro de eventos deve ser protegida, acesso com usuário e senha.<br>
A quantidade de inscritos não deve ser superior a quantidade máxima definida para o evento.<br>
Ao finalizar a inscrição, a pessoa deve receber um e-mail informando os dados da inscrição.<br>
