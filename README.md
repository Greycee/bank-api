## Bank API

🇺🇸 This project is about developing a bank API and integrate it with MongoDB. I am using MongoDB Atlas to host database in the cloud.

Start by installing node modules: `npm i` and by running `nodemon`

## URL: http://localhost:5000

## Return the whole database:
Use the GET method request to the `/` endpoint to see all the data.

## Deposit:
Use the PUT method request to the `/deposit/:branch/:account` endpoint informing the branch and the account to receive the deposit and pass in the body of the request the amount to be deposited: 
```
{
	"amount": 650
}
```
It will update the account balance with the informed amount.

## Withdraw:
Use the PUT method request to the `/withdraw/:branch/:account` endpoint informing the branch and the account to withdraw from. Pass in the body of the request the amount to be withdrawn. It will update the balance of the acount, decreasing with the informed amount and charging a tariff of (1). It also validates if the account has enough balance to the requested withdraw, if not, it displays a warning invalidating the transaction.

## Check the balance:
Use the GET method request to the `/balance/:branch/:account` endpoint informing the branch and the account to check the balance of a certain account. 

## Close an account:
Use the DELETE method request to the `/delete/:branch/:account` endpoint informing the branch and the account to exclude an account. It will return the number of active accounts remaining on the same deleted branch.

## Transfer value between accounts:
Use the PUT method request to the `/transfer/:originAccount/:destinationAccount` endpoint informing as a first parameter the account that will transfer the value and as a second parameter the account that will receive the amount. Pass in the body of the request the amount to be transfered. If the accounts belong to the same branch, there's no transfer fee. If the branches are different, it will charge a fee of (8). The transaction is only possible if there's enough balance to do so. If the transaction is allowed, it will return the balance of the account that is transfering the amount.

## Check the average balance for a given branch:
Use the GET method request to the `/average/:branch` endpoint informing the branch as parameter. It will return the average balance for that givem branch.

## Check the lowest balances:
Use the GET method request to the `/lowest/:numberOfClients` endpoint informing the number of clients you want to receive in response. It will get the lowest balances in ascending order.

## Check the highest balances:
Use the GET method request to the `/highest/:numberOfClients` endpoint informing the number of clients you want to receive in response. It will get the highest balances displaying the richest clients in a descending order.

## Agency Private99:
Use the GET method request to the `/private99` endpoint to transfer the richer client of each branch to the private99 branch.

-----------------------------

🇧🇷 Esse projeto baseia-se em desenvolver uma API de banco e integrá-la com MongoDB. Usei MongoDB Atlas para hospedar em nevem o banco de dados recebido para execução do exercício.

Comece instalando o node modules: `npm i` e inicialize a aplicação com `nodemon`

## URL: http://localhost:5000

## Retornar todo o banco de dados:
Faça uma requisição do tipo GET em `/` para ver todo o banco de dados.

## Depósito:
Faça uma requisição PUT em `/deposit/:branch/:account` informando a agência e a conta a receber o depósito. Passe no body da requisição o valor a ser depositado, dessa forma: 
```
{
	"amount": 650
}
```
A requisição irá atualizar o saldo da conta com o valor informado.

## Saque:
Faça uma requisição PUT em `/withdraw/:branch/:account` informando a agência e a conta que sofrerá o depósito. Passe no body da requisição o valor a ser sacado. A requisição irá atualizar o balanço da conta decrementando com o valor do saque e cobrando uma tarifa de (1). É também validado se a conta possui saldo suficiente para efetuar o saque, em caso negativo, mostra um aviso invalidando assim a transação.

## Consultar o saldo:
Faça uma requisição GET em `/balance/:branch/:account` informando a agência e a conta para consultar o saldo de uma determinada conta.

## Encerrar uma conta:
Faça uma requisição DELETE em `/delete/:branch/:account` informando a agência e a conta a ser excluída. A requisição se bem sucedida retornará o número de contas ainda ativas para esta agência.

## Fazer transferência entre contas:
Faça uma requisição PUT em `/transfer/:originAccount/:destinationAccount` informando como primeiro parâmetro a conta que fará a transferência e como segundo parâmetro, a conta que receberá a transferência. Passe como body da requisição o valor (amount) a ser transferido. Se as contas pertencerem a mesma agência, nenhuma tarifa será cobrada. Se as agências forem diferentes, será cobrado uma tarifa de (8). A transação só será possível se houver saldo suficiente para isso.  Se a transação for efetivada, retornará o saldo atualizado da conta que está transferindo o valor.

## Checar o saldo médio de uma agência:
Faça uma requisição GET em `/average/:branch` informando a agência como parâmetro. A requisição retornará o saldo médio existente aquela agência.

## Checar os saldos mais baixos:
Faça uma requisição GET em `/lowest/:numberOfClients` informando o número de clientes que você quer receber como retorno. O retorno será o saldo mais baixo do número de clientes solicitados em ordem crescente.

## Checar os saldos mais altos:
Faça uma requisição GET em `/highest/:numberOfClients` informando o número de clientes que você quer receber como retorno. O retorno será o saldo mais alto do número de clientes que você quer receber como retorno em ordem decrescente.

## Agência Private99:
Faça uma requisição GET em `/private99` para transferir os clientes mais ricos de cada agência para a agência Private99.