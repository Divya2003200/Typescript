var Category;
(function (Category) {
    Category[Category["Food"] = 0] = "Food";
    Category[Category["Travels"] = 1] = "Travels";
    Category[Category["Bills"] = 2] = "Bills";
    Category[Category["Shopping"] = 3] = "Shopping";
    Category[Category["Others"] = 4] = "Others";
})(Category || (Category = {}));
var amountInput = document.getElementById("amount");
var categoryInput = document.getElementById("category");
var dateInput = document.getElementById("date");
var descriptionInput = document.getElementById("description");
var addExpenseBtn = document.getElementById("addExpenseBtn");
var expenseList = document.getElementById("expenseList");
var filterCategory = document.getElementById("filterCategory");
var startDateInput = document.getElementById("startDate");
var endDateInput = document.getElementById("endDate");
var filterDateBtn = document.getElementById("filterDateBtn");
var ExpenseTracker = /** @class */ (function () {
    function ExpenseTracker() {
        this.expenseArr = JSON.parse(localStorage.getItem("expenses") || "[]");
    }
    ExpenseTracker.prototype.addExpense = function (expense) {
        this.expenseArr.push(expense);
        localStorage.setItem("expenses", JSON.stringify(this.expenseArr));
        this.displayExpenses();
    };
    ExpenseTracker.prototype.displayExpenses = function (filteredArr) {
        var _this = this;
        if (filteredArr === void 0) { filteredArr = this.expenseArr; }
        expenseList.innerHTML = "";
        filteredArr.forEach(function (e) {
            var formattedDate = new Date(e.date).toLocaleDateString();
            var li = document.createElement("li");
            li.textContent = "".concat(e.amount, "$ - ").concat(Category[e.category], " - ").concat(formattedDate, " - ").concat(e.description, " ");
            // Remove Button
            var removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.style.marginLeft = "10px";
            removeBtn.addEventListener("click", function () {
                _this.removeExpense(e.id);
            });
            li.appendChild(removeBtn);
            expenseList.appendChild(li);
        });
    };
    ExpenseTracker.prototype.filterByCategory = function (category) {
        var filtered = this.expenseArr.filter(function (e) { return e.category === category; });
        this.displayExpenses(filtered);
    };
    ExpenseTracker.prototype.filterByDateRange = function (startDate, endDate) {
        var start = new Date(startDate).getTime();
        var end = new Date(endDate).getTime();
        var filtered = this.expenseArr.filter(function (e) {
            var expenseDate = new Date(e.date).getTime();
            return expenseDate >= start && expenseDate <= end;
        });
        this.displayExpenses(filtered);
    };
    ExpenseTracker.prototype.removeExpense = function (id) {
        this.expenseArr = this.expenseArr.filter(function (e) { return e.id !== id; });
        localStorage.setItem("expenses", JSON.stringify(this.expenseArr));
        this.displayExpenses();
    };
    ExpenseTracker.prototype.calculateTotalExpenses = function () {
        var total = this.expenseArr.reduce(function (sum, e) { return sum + e.amount; }, 0);
        document.getElementById("totalExpensesDisplay").textContent = "Total Expenses: $".concat(total);
    };
    return ExpenseTracker;
}());
var expenseTracker = new ExpenseTracker();
expenseTracker.displayExpenses();
addExpenseBtn.addEventListener("click", function () {
    var amount = parseFloat(amountInput.value);
    var category = parseInt(categoryInput.value);
    var date = dateInput.value;
    var description = descriptionInput.value.trim();
    if (isNaN(amount) || amount <= 0 || isNaN(category) || !date || !description) {
        alert("Please enter valid values for all fields.");
        return;
    }
    expenseTracker.addExpense({
        id: Date.now(), // Unique ID for proper deletion
        amount: amount,
        category: category,
        date: new Date(date).toISOString(),
        description: description
    });
    amountInput.value = "";
    categoryInput.value = "0";
    dateInput.value = "";
    descriptionInput.value = "";
});
filterCategory.addEventListener("change", function () {
    var categoryValue = parseInt(filterCategory.value);
    if (isNaN(categoryValue)) {
        expenseTracker.displayExpenses();
    }
    else {
        expenseTracker.filterByCategory(categoryValue);
    }
});
filterDateBtn.addEventListener("click", function () {
    var startDate = startDateInput.value;
    var endDate = endDateInput.value;
    if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
    }
    expenseTracker.filterByDateRange(startDate, endDate);
});
var totalExpensesBtn = document.getElementById("totalExpensesBtn");
totalExpensesBtn.addEventListener("click", function () {
    expenseTracker.calculateTotalExpenses();
});
