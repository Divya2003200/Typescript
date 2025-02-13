interface Employee{
    id:number
    name:string
    position:string
    salary:number

}


interface Manager extends Employee{
    teamSize:number
}

class Department {
    private employees: Employee[];

    constructor(employees: Employee[]) { 
        this.employees = employees;
    }

    addEmployee(employee:Employee):void{
        this.employees.push(employee)
        console.log('employee added '+employee)
    }

    removeEmployee(id: number): void {
        this.employees = this.employees.filter(emp => emp.id !== id);
        console.log(`Employee with ID ${id} removed`);
    }

    listEmployees():void{
       this.employees.map(a=>console.log(a.name))
    }
}


let d1 = new Department([{ id: 1, name: 'A', position: 'Engineer', salary: 55000 }]);

console.log(d1); // Output: Department { employees: [ { id: 1, name: 'A', position: 'Engineer', salary: 55000 } ] }


class GenericStorage<T>{
   arr:T[]=[]

    add(item :T):void{
       this.arr.push(item)
    }

   remove(item :T):void{
    this.arr=this.arr.filter(no=>no!==item)
     }

    getAll():T[]{
        return this.arr
    }
}

let storage=new GenericStorage<number>()
storage.add(89)
storage.remove(5)
storage.getAll()


function updateSalary<T extends Employee>(employee:T,newSalary:number):T{
return {...employee,salary:newSalary}
}
updateSalary({id:1,name:'A',position:'engineer',salary:50000},60000)