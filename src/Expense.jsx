import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Expense({ hasFocus, expense, setEditingExpenseId, setFormData, setExpenses }) {
    const { note, amount, date, category, id } = expense;
    return (
        <tr>
            <td>{note}</td>
            <td>{amount}</td>
            <td>{date}</td>
            <td>{category}</td>
            <td><button className="edit-btn" onClick={handleEdit}><FontAwesomeIcon icon="fa-regular fa-pen-to-square" /></button></td>
            <td><button className="delete-btn" onClick={handleDelete}><FontAwesomeIcon icon="fa-regular fa-trash-can " /></button></td>
        </tr>
    );

    // return (
    //     <div className={"expense" + (hasFocus ? "" : " blur-expense")}>
    //         <div className="expense-fields">
    //             <div className="expense-field">
    //                 <div className="expense-field-label">Note</div>
    //                 <div className="expense-field-value">{note}</div>
    //             </div>
    //             <div className="expense-field">
    //                 <div className="expense-field-label">Amount</div>
    //                 <div className="expense-field-value">{amount}</div>
    //             </div>
    //             <div className="expense-field">
    //                 <div className="expense-field-label">Date</div>
    //                 <div className="expense-field-value">{date}</div>
    //             </div>
    //             <div className="expense-field">
    //                 <div className="expense-field-label">Category</div>
    //                 <div className="expense-field-value">{category}</div>
    //             </div>
    //         </div>
    //         <div className="action-buttons">
    //             <button className="edit-btn" onClick={handleEdit}><FontAwesomeIcon icon="fa-regular fa-pen-to-square" /></button>
    //             <button className="delete-btn" onClick={handleDelete}><FontAwesomeIcon icon="fa-regular fa-trash-can " /></button>
    //         </div>
    //     </div>
    // );

    function handleEdit() {
        setEditingExpenseId(id);
        setFormData({ note, amount, date });
    }

    function handleDelete() {
        setExpenses(expenses => {
            const newExpenses = { ...expenses };
            delete newExpenses[id];
            return newExpenses;
        });
    }
}