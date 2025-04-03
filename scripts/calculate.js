let incomeData = [];
let expenseData = [];
let myChart;
let gradient;

let visibleRange = 4;
let startIndex = 0;

const labels = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("myChart").getContext("2d");

  gradient = ctx.createLinearGradient(0, 0, 0, window.screen.width / 2);
  gradient.addColorStop(0, "rgba(101, 85, 204, 0.6)");
  gradient.addColorStop(0.5, "rgba(174, 168, 221, 0)");

  gradient.addColorStop(1, "rgba(230, 227, 253, 0)");
  let xScaleConfig = {
    min: startIndex,
    max: startIndex + visibleRange - 1,
    ticks: {
      maxRotation: 0,
      autoSkip: true,
      stepSize: 1,
      color: "rgba(51, 51, 51, 1)",
    },
    border: {
      color: "rgba(236, 236, 236, 1)",
    },
    grid: {
      color: "rgba(236, 236, 236, 1)",
      drawTicks: false,
    },
  };

  let yScaleConfig = {
    beginAtZero: true,
    min: 0,
    max: 500,
    ticks: {
      display: false,
      stepSize: 100,
    },

    border: {
      color: "rgba(236, 236, 236, 1)",
    },
    grid: {
      color: "rgba(236, 236, 236, 1)",
      drawTicks: false,
    },
  };
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,

      datasets: [
        {
          data: new Array(12).fill(0),
          pointStyle: false,
          fill: true,
          backgroundColor: gradient,
          borderWidth: 2,
          borderColor: "rgba(94, 77, 205, 1)",
          tension: 0.4,
        },
      ],
    },
    options: {
      aspectRatio: 1,
      responsive: true,
      scales: {
        x: xScaleConfig,
        y: yScaleConfig,
      },

      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
            threshold: 10,
          },
          zoom: {
            enabled: true,
            mode: "x",
          },
        },
        legend: {
          display: false,
        },
      },
    },
  });
  loadData();
});

function getInputValues(prefix) {
  let values = [];

  for (let i = 1; i <= 5; i++) {
    let val = document.getElementById(`${prefix}${i}`).value;
    values.push(Number(val) || 0);
  }
  return values;
}

//кнопка очистки локального?
function saveData(type) {
  const month = document.getElementById("monthSelect").value;
  const values = getInputValues(type === "income" ? "income" : "expense");
  const sum = values.reduce((acc, val) => acc + val, 0);
  const tooltip = document.getElementById("summary");

  let dataArray = type === "income" ? incomeData : expenseData;
  let storageKey = type === "income" ? "income" : "expense";

  const exsistingEntry = dataArray.find((item) => item.month === month);
  if (exsistingEntry) {
    exsistingEntry.total = sum;
  } else {
    dataArray.push({ month, total: sum });
  }
  localStorage.setItem(storageKey, JSON.stringify(dataArray));
  tooltip.classList.add("summary-active");
  tooltip.textContent = `${month}: ${sum} ₽`;

  updateChart(type);
}

function updateChart(type) {
  const data = labels.map((month) => {
    const found = (type === "income" ? incomeData : expenseData).find(
      (item) => item.month === month
    );
    return found ? found.total : 0;
  });

  const maxValue = Math.max(...data);
  const roundedMax = Math.ceil((maxValue + 100) / 100) * 100;

  myChart.data.datasets[0].data = data;
  myChart.data.datasets[0].backgroundColor = gradient;

  myChart.options.scales.y = {
    max: roundedMax,
  };

  myChart.update();
}

function scrollChart(direction) {
  if (direction === "left" && startIndex > 0) {
    startIndex--;
  } else if (
    direction === "right" &&
    startIndex < labels.length - visibleRange
  ) {
    startIndex++;
  }
  myChart.options.scales.x.min = startIndex;
  myChart.options.scales.x.max = startIndex + visibleRange - 1;
  myChart.update();
}

document
  .getElementById("scrollLeft")
  .addEventListener("click", () => scrollChart("left"));
document
  .getElementById("scrollRight")
  .addEventListener("click", () => scrollChart("right"));

function loadData() {
  const incomeFromStorage = JSON.parse(localStorage.getItem("income")) || [];
  const expenseFromStorage = JSON.parse(localStorage.getItem("expense")) || [];

  incomeData = incomeFromStorage;
  expenseData = expenseFromStorage;

  updateChart("income");
  updateChart("expense");
}
