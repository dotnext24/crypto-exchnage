export class Order{
    constructor(OrderId,Timestamp, WALLET_ADDRESS, FROM_SYMBOL, TO_SYMBOL,FROM_AMOUNT,TO_AMOUNT,FROM_PRICE,TO_PRICE, RECIEVE_ADDRESS,EXCHANGE_FEE){
       this.OrderId=OrderId;
       this.Timestamp=Timestamp || new Date().toString();
       this.WALLET_ADDRESS=WALLET_ADDRESS;
       this.FROM_SYMBOL=FROM_SYMBOL;
       this.TO_SYMBOL=TO_SYMBOL;
       this.FROM_AMOUNT=FROM_AMOUNT;
       this.TO_AMOUNT=TO_AMOUNT;
       this.FROM_PRICE=FROM_PRICE;
       this.TO_PRICE=TO_PRICE;
       this.RECIEVE_ADDRESS=RECIEVE_ADDRESS;
       this.EXCHANGE_FEE=EXCHANGE_FEE;
    }    
}