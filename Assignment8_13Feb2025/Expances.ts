
interface Expenses {
    id: number;
    amount: number;
    category: Category;
    date: string;
    description: string;
}

enum Category {
    Food,
    Travels,
    Bills,
    Shopping,
    Others
}

const amountInput = document.getElementById("amount") as HTMLInputElement;
const categoryInput = document.getElementById("category") as HTMLSelectElement;
const dateInput = document.getElementById("date") as HTMLInputElement;
const descriptionInput = document.getElementById("description") as HTMLInputElement;
const addExpenseBtn = document.getElementById("addExpenseBtn") as HTMLButtonElement;
const expenseList = document.getElementById("expenseList") as HTMLUListElement;
const filterCategory = document.getElementById("filterCategory") as HTMLSelectElement;
const startDateInput = document.getElementById("startDate") as HTMLInputElement;
const endDateInput = document.getElementById("endDate") as HTMLInputElement;
const filterDateBtn = document.getElementById("filterDateBtn") as HTMLButtonElement;
const totalExpensesBtn = document.getElementById("totalExpensesBtn") as HTMLButtonElement;

class ExpenseTracker {
    expenseArr: Expenses[] = JSON.parse(localStorage.getItem("expenses") || "[]");

    addExpense(expense: Expenses) {
        this.expenseArr.push(expense);
        localStorage.setItem("expenses", JSON.stringify(this.expenseArr));
        this.displayExpenses();
    }

    displayExpenses(filteredArr: Expenses[] = this.expenseArr) {
        expenseList.innerHTML = "";
        filteredArr.forEach(e => {
            const formattedDate = new Date(e.date).toLocaleDateString();
            const li = document.createElement("li");
            li.textContent = `${e.amount}$ - ${Category[e.category]} - ${formattedDate} - ${e.description} `;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.style.marginLeft = "10px";
            removeBtn.addEventListener("click", () => {
                this.removeExpense(e.id);
            });

            li.appendChild(removeBtn);
            expenseList.appendChild(li);
        });
    }

    filterByCategory(category: Category) {
        const filtered = this.expenseArr.filter(e => e.category === category);
        this.displayExpenses(filtered);
    }

    filterByDateRange(startDate: string, endDate: string) {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        const filtered = this.expenseArr.filter(e => {
            const expenseDate = new Date(e.date).getTime();
            return expenseDate >= start && expenseDate <= end;
        });
        this.displayExpenses(filtered);
    }

    removeExpense(id: number) {
        this.expenseArr = this.expenseArr.filter(e => e.id !== id);
        localStorage.setItem("expenses", JSON.stringify(this.expenseArr));
        this.displayExpenses();
    }

    calculateTotalExpenses() {
        const total = this.expenseArr.reduce((sum, e) => sum + e.amount, 0);
        document.getElementById("totalExpensesDisplay")!.textContent = `Total Expenses: $${total}`;
    }
    
}

const expenseTracker = new ExpenseTracker();
expenseTracker.displayExpenses();

addExpenseBtn.addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    const category = parseInt(categoryInput.value) as Category;
    const date = dateInput.value;
    const description = descriptionInput.value.trim();

    if (isNaN(amount) || amount <= 0 || isNaN(category) || !date || !description) {
        alert("Please enter valid values for all fields.");
        return;
    }

    expenseTracker.addExpense({ 
        id: Date.now(),
        amount, 
        category, 
        date: new Date(date).toISOString(), 
        description 
    });

    amountInput.value = "";
    categoryInput.value = "0";
    dateInput.value = "";
    descriptionInput.value = "";
});

filterCategory.addEventListener("change", () => {
    const categoryValue = parseInt(filterCategory.value);
    if (isNaN(categoryValue)) {
        expenseTracker.displayExpenses();
    } else {
        expenseTracker.filterByCategory(categoryValue as Category);
    }
});

filterDateBtn.addEventListener("click", () => {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!startDate || !endDate) {
        alert("Please select both start and end dates.");
        return;
    }

    expenseTracker.filterByDateRange(startDate, endDate);


});

totalExpensesBtn.addEventListener("click", () => {
    expenseTracker.calculateTotalExpenses();
});
