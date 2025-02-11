var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Payment = /** @class */ (function () {
    function Payment(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Payment;
}());
var CreditCardPayment = /** @class */ (function (_super) {
    __extends(CreditCardPayment, _super);
    function CreditCardPayment(amount, date, cardNumber) {
        var _this = _super.call(this, amount, date) || this;
        _this.cardNumber = _this.maskCardNumber(cardNumber);
        return _this;
    }
    CreditCardPayment.prototype.maskCardNumber = function (cardNumber) {
        return cardNumber.replace(/.(?=.{4})/g, "*");
    };
    CreditCardPayment.prototype.processPayment = function () {
        console.log("Processing credit card payment of $".concat(this.amount, " on ").concat(this.date, ". Card: ").concat(this.cardNumber));
    };
    return CreditCardPayment;
}(Payment));
var PayPalPayment = /** @class */ (function (_super) {
    __extends(PayPalPayment, _super);
    function PayPalPayment(amount, date, email) {
        var _this = _super.call(this, amount, date) || this;
        _this.email = email;
        return _this;
    }
    PayPalPayment.prototype.processPayment = function () {
        console.log("Processing PayPal payment of $".concat(this.amount, " on ").concat(this.date, ". Email: ").concat(this.email));
    };
    return PayPalPayment;
}(Payment));
var CryptoPayment = /** @class */ (function (_super) {
    __extends(CryptoPayment, _super);
    function CryptoPayment(amount, date, walletAddress) {
        var _this = _super.call(this, amount, date) || this;
        _this.walletAddress = walletAddress;
        return _this;
    }
    CryptoPayment.prototype.processPayment = function () {
        console.log("Processing crypto payment of $".concat(this.amount, " on ").concat(this.date, ". Wallet: ").concat(this.walletAddress));
    };
    return CryptoPayment;
}(Payment));
var creditPayment = new CreditCardPayment(100, new Date(), "1234567812345678");
creditPayment.processPayment();
var paypalPayment = new PayPalPayment(50, new Date(), "user@example.com");
paypalPayment.processPayment();
var cryptoPayment = new CryptoPayment(200, new Date(), "0x123abc456def");
cryptoPayment.processPayment();
