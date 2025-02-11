class Vehicle{
    brand:string
    model:string
    rentPricePerDay:number

    constructor(brand: string, model: string, rentPricePerDay: number) {
        this.brand = brand;
        this.model = model;
        this.rentPricePerDay = rentPricePerDay;
    }

    calculateRentalCost(days:number):number{
        return this.rentPricePerDay*days
    }
}

class Car extends Vehicle {
    calculateRentalCost(days: number): number {
        return super.calculateRentalCost(days);
    }
}

class Bike extends Vehicle {
    calculateRentalCost(days: number): number {
        return super.calculateRentalCost(days)
    }
}

class Truck extends Vehicle {
    calculateRentalCost(days: number): number {
        return super.calculateRentalCost(days) + 100; 
    }
}

let car = new Car("Toyota", "Camry", 1000);
console.log(car.calculateRentalCost(5)); 

let bike = new Bike("Honda", "CBR", 500);
console.log(bike.calculateRentalCost(5)); 

let truck = new Truck("Volvo", "FH16", 2000);
console.log(truck.calculateRentalCost(3)); 
