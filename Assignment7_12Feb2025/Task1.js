var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var Department = /** @class */ (function () {
    function Department(employees) {
        this.employees = employees;
    }
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
        console.log('employee added ' + employee);
    };
    Department.prototype.removeEmployee = function (id) {
        this.employees = this.employees.filter(function (emp) { return emp.id !== id; });
        console.log("Employee with ID ".concat(id, " removed"));
    };
    Department.prototype.listEmployees = function () {
        this.employees.map(function (a) { return console.log(a.name); });
    };
    return Department;
}());
var d1 = new Department([{ id: 1, name: 'A', position: 'Engineer', salary: 55000 }]);
console.log(d1); // Output: Department { employees: [ { id: 1, name: 'A', position: 'Engineer', salary: 55000 } ] }
var GenericStorage = /** @class */ (function () {
    function GenericStorage() {
        this.arr = [];
    }
    GenericStorage.prototype.add = function (item) {
        this.arr.push(item);
    };
    GenericStorage.prototype.remove = function (item) {
        this.arr = this.arr.filter(function (no) { return no !== item; });
    };
    GenericStorage.prototype.getAll = function () {
        return this.arr;
    };
    return GenericStorage;
}());
var storage = new GenericStorage();
storage.add(89);
storage.remove(5);
storage.getAll();
function updateSalary(employee, newSalary) {
    return __assign(__assign({}, employee), { salary: newSalary });
}
updateSalary({ id: 1, name: 'A', position: 'engineer', salary: 50000 }, 60000);
