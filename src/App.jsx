import { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Analytics from './Analytics';
import {getExpenses} from './expenseUtil';

library.add(fas, far, fab)

function App() {
    const [expenses, setExpenses] = useState({});
    const [formData, setFormData] = useState({ note: '', amount: '', date: new Date().toJSON().slice(0, 10), category: 'Home' });
    const [editingExpenseId, setEditingExpenseId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    const categoryList = categories.map((category, i) => {
        return (
            <li key={i}>{category} <button type="button" onClick={() => deleteCategory(i)}>x</button></li>
        );
    });

    return (
        <>
            <div className="left-pane">
                <ExpenseForm editingExpenseId={editingExpenseId} updateExpense={updateExpense} resetExpenseForm={resetExpenseForm}>
                    <FormItem dataKey="note" name="expense-note" label="Note" formData={formData} handleFormChange={handleFormChange} />
                    <FormItem dataKey="amount" name="expense-amount" label="Amount" formData={formData} type="number" handleFormChange={handleFormChange} />
                    <FormItem dataKey="date" name="expense-date" label="Date" formData={formData} type="date" handleFormChange={handleFormChange} />
                    <FormItem dataKey="category" name="expense-category" label="Category" formData={formData} type="category" handleFormChange={handleFormChange} categories={categories} />
                </ExpenseForm>
                <Analytics expenseList={Object.values(expenses)} setFilterCategory={setFilterCategory} />
            </div>
            <ExpenseContainer filterCategory={filterCategory} setFilterCategory={setFilterCategory}>
                {getExpenses(expenses, filterCategory, editingExpenseId, setExpenses, setEditingExpenseId, setFormData)}
            </ExpenseContainer>
            <dialog id="add-category-dialog">
                <div>
                    Available Categories
                    <ul>
                        {categoryList}
                    </ul>
                </div>
                <input value={newCategory} onChange={e => setNewCategory(e.currentTarget.value)} /><button type="button" onClick={addNewCategory}>Add</button><button type="button" onClick={e => e.currentTarget.parentElement.close()}>Close</button>
            </dialog>
        </>
    );

    function updateExpense() {
        if (!(formData.note && formData.amount && formData.date && formData.category))
            return;
        setExpenses(expenses => {
            const newExpenses = { ...expenses };
            const expenseId = editingExpenseId != null ? editingExpenseId : crypto.randomUUID();
            newExpenses[expenseId] = { ...formData, id: expenseId };
            return newExpenses;
        });
        resetExpenseForm();
    }

    function resetExpenseForm() {
        setEditingExpenseId(null);  // Return to expense 'create' mode
        setFormData({ ...formData, note: '', amount: '' });
    }

    function handleFormChange(e, key) {
        const newFormData = { ...formData };
        const newValue = key === 'amount' ? Number(e.target.value) : e.target.value;
        newFormData[key] = newValue;
        setFormData(newFormData);
    }

    function addNewCategory() {
        const newCategories = [...categories, newCategory];
        setCategories(newCategories);
        setNewCategory('');
    }

    function deleteCategory(i) {
        const newCategories = categories.toSpliced(i, 1);
        setCategories(newCategories);
    }
}

function ExpenseForm({ children, editingExpenseId, updateExpense, resetExpenseForm }) {
    return (
        <div className="expense-form">
            <div className="expense-form-message">
                <div>{editingExpenseId == null ? 'Create New Expense' : 'Editing Expense'}</div>
            </div>
            <div>
                <form>
                    {children}
                    <div className="form-input-container">
                        <div className="action-buttons">
                            <button
                                type="button"
                                onClick={updateExpense}
                            >
                                Submit
                            </button>
                            {editingExpenseId != null && (
                                <button
                                    type="button"
                                    onClick={resetExpenseForm}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                        <div></div>
                    </div>
                </form>
            </div>
        </div>
    );
}

function FormItem({ dataKey, name, label, type = "text", formData, handleFormChange, categories }) {
    let categoryList = categories?.map((category, i) => {
        return <option key={i} value={category}>{category}</option>;
    });
    categoryList = categoryList?.length ? categoryList?.toSpliced(0, 0, <option></option>) : <option disabled>No Categories Available</option>;
    const select = (
        <>
            <select value={formData[dataKey]} onChange={e => handleFormChange(e, dataKey)} >
                {categoryList}
            </select>
            <div className="add-category-btn-container">
                <button type="button" tabIndex="-1" title="Add New Category" onClick={() => document.getElementById("add-category-dialog").showModal()}>+</button>
            </div>
        </>
    );
    return (
        <div className="form-input-container">
            <label htmlFor={name}>{label}</label>
            {
                type === 'category' ?
                    select :
                    (<>
                        <input name={name} type={type} value={formData[dataKey]} onChange={e => handleFormChange(e, dataKey)} onFocus={e => e.currentTarget.showPicker()} /><div></div>
                    </>)
            }
        </div>
    );
}

function ExpenseContainer({ children, filterCategory, setFilterCategory }) {
    return (
        <div className="expense-container">
            <div className="header">Expenses {filterCategory ? <a href="#" title="Clear Filter" onClick={() => setFilterCategory(null)} className="filter-category">(Now showing: {filterCategory})</a> : ''}</div>
            <div className="expense-list">
                <table className="expense-table">
                    <thead>
                        <th>Note</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th></th>
                        <th></th>
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;