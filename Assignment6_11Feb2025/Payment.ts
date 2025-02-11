abstract class Payment {
    constructor(protected amount: number, protected date: Date) {}
  
    abstract processPayment(): void;
  }
  
  class CreditCardPayment extends Payment {
    private cardNumber: string;
  
    constructor(amount: number, date: Date, cardNumber: string) {
      super(amount, date);
      this.cardNumber = this.maskCardNumber(cardNumber);
    }
  
    private maskCardNumber(cardNumber: string): string {
      return cardNumber.replace(/.(?=.{4})/g, "*");
    }
  
    processPayment(): void {
      console.log(`Processing credit card payment of $${this.amount} on ${this.date}. Card: ${this.cardNumber}`);
    }
  }
  
  class PayPalPayment extends Payment {
    constructor(amount: number, date: Date, private email: string) {
      super(amount, date);
    }
  
    processPayment(): void {
      console.log(`Processing PayPal payment of $${this.amount} on ${this.date}. Email: ${this.email}`);
    }
  }
  
  class CryptoPayment extends Payment {
    constructor(amount: number, date: Date, private walletAddress: string) {
      super(amount, date);
    }
  
    processPayment(): void {
      console.log(`Processing crypto payment of $${this.amount} on ${this.date}. Wallet: ${this.walletAddress}`);
    }
  }
  

  const creditPayment = new CreditCardPayment(100, new Date(), "1234567812345678");
  creditPayment.processPayment();
  
  const paypalPayment = new PayPalPayment(50, new Date(), "user@example.com");
  paypalPayment.processPayment();
  
  const cryptoPayment = new CryptoPayment(200, new Date(), "0x123abc456def");
  cryptoPayment.processPayment();
  