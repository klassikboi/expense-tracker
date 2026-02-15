import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Analytics({ expenseList, setFilterCategory }) {

    const categoryTotalAmountMap = {};
    expenseList.forEach(expense => {
        const oldAmount = categoryTotalAmountMap[expense.category] ?? 0;
        categoryTotalAmountMap[expense.category] = oldAmount + expense.amount;
    });

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'white'
                }
            }
        },
        onClick: (e, activeElements) => {
            const category = Object.keys(categoryTotalAmountMap)[activeElements[0].index];  // Clicked category
            setFilterCategory(category);    // Will re-trigger expense list
        }
    };

    const data = {
        labels: Object.keys(categoryTotalAmountMap),
        datasets: [
            {
                label: 'Total',
                // data: [12, 19, 3, 5, 2, 3],
                data: Object.values(categoryTotalAmountMap),
                backgroundColor: [
                    'red',
                    'blue',
                    'yellow',
                    'green',
                    'purple',
                    'orange',
                ],
            },
        ],
    };

    return (
        <div className="analytics-container">
            <Doughnut data={data} options={options} />
        </div>
    );
} 