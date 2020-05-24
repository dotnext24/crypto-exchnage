const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'transactions.csv',
    append:true,    
    header: [
        {id: 'OrderId', title: 'OrderId'},
        {id: 'Timestamp', title: 'Timestamp'},
        {id: 'WALLET_ADDRESS', title: 'WALLET_ADDRESS'},
        {id: 'FROM_SYMBOL', title: 'FROM_SYMBOL'},
        {id: 'TO_SYMBOL', title: 'TO_SYMBOL'},
        {id: 'FROM_AMOUNT', title: 'FROM_AMOUNT'},
        {id: 'TO_AMOUNT', title: 'TO_AMOUNT'},
        {id: 'FROM_PRICE', title: 'FROM_PRICE'},
        {id: 'TO_PRICE', title: 'TO_PRICE'},
        {id: 'RECIEVE_ADDRESS', title: 'RECIEVE_ADDRESS'},
        {id: 'EXCHANGE_FEE', title: 'EXCHANGE_FEE'},
        {id: 'TRANSACTION_HASH', title: 'TRANSACTION_HASH'}       

    ]
});
 


function writeTransaction(transactionDetail){
   
    csvWriter.writeRecords(transactionDetail)       // returns a promise
    .then(() => {
        console.log('csv Done');
    });
}

exports.writeTransaction = writeTransaction;
// exports.getLocation = getLocation;
// exports.dob = dateOfBirth;