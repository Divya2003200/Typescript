class Employee{
    name:string
    id:number
    private salary:number
    constructor(name:string,id:number,salary:number){
        this.name=name
        this.id=id
        this.salary=salary
    }

    setSalary(salary:number){
        this.salary=salary
    }
    getSalary():number{
        return this.salary
    }
    calculateBonus():number{
        return 500
    }

}
class Manager extends Employee{
calculateBonus(): number {
    return 0.3*this.getSalary()
}
}
class Engineer extends Employee{
    calculateBonus(): number {
        return 0.4*this.getSalary()
    }
}
class Intern extends Employee{
    calculateBonus(): number {
        return 0.5*this.getSalary()
    }
}

let e1 = new Employee("Alice", 101, 50000);
e1.setSalary(520000)
e1.getSalary()

let m1=new Manager('x',102,52000)
console.log(m1.calculateBonus())

let eng=new Engineer('xy',107,32000)
console.log(eng.calculateBonus())

let int1=new Intern('xz',502,1000)
console.log(m1.calculateBonus())