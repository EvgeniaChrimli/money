let pieChart;
const income = JSON.parse(localStorage.getItem("income")) || [];
const expense = JSON.parse(localStorage.getItem("expense")) || [];
const context = document.getElementById("expenses").getContext("2d");
const message = document.querySelector(".message");
const notice = document.querySelector(".notice");

document.addEventListener("DOMContentLoaded", () => {
  const highValue = expense.reduce((acc, item) => {
    acc.push(item);
    acc.sort((a, b) => b.total - a.total);
    return acc.slice(0, 3);
  }, []);

  let labels = highValue.map(({ month }) => month);
  let data = highValue.map(({ total }) => total);

  pieChart = new Chart(context, {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "rgba(245, 107, 141, 1)",
            "rgba(18, 140, 118, 1)",
            "rgba(123, 97, 255, 1)",
          ],
          hoverOffset: 4,
        },
      ],
    },
  });
  findDifference();
});

const findDifference = () => {
  const totalIncome = income
    .map(({ total }) => total)
    .reduce((acc, sum) => acc + sum, 0);

  const totalExpense = expense
    .map(({ total }) => total)
    .reduce((acc, sum) => acc + sum, 0);

  const result = totalIncome - totalExpense;
  const percent = Math.floor((totalExpense / totalIncome) * 100);

  createDom(result, totalExpense, totalIncome, percent);
};

const createDom = (result, totalExpense, totalIncome, percent) => {
  if (result < 0) {
    message.classList.toggle("active-message");
    message.textContent = `Внимание! Ваши расходы превысиили доходы на ${percent}%. Доходы составили: ${totalIncome}руб., расходы - ${totalExpense}руб.`;
    notice.classList.toggle("notice-active");
  }
};
