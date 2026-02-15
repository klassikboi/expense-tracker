import Expense from './Expense';

export function getExpenses(expenses, filterCategory, editingExpenseId, setExpenses, setEditingExpenseId, setFormData) {
    let expenseList = Object.values(expenses);
    if(filterCategory) {
        expenseList = expenseList.filter(expense => expense.category === filterCategory);
    }
    expenseList = expenseList.sort((e1, e2) => new Date(e1.date) - new Date(e2.date)).map(expense => {
        const hasFocus = editingExpenseId == null || editingExpenseId == expense.id;    // Unfocus this expense if another expense is being edited
        return <Expense key={expense.id} hasFocus={hasFocus} expense={expense} setExpenses={setExpenses} setEditingExpenseId={setEditingExpenseId} setFormData={setFormData} />
    });
    return expenseList;
}