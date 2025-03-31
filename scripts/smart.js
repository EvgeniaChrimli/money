// const smartList = document.querySelector(".smart_list");
// const form = document.querySelector("form");
// const target = document.getElementById("target");
// const summ = document.getElementById("summ");
// const desiredAmount = document.getElementById("desiredAmount");

// let targetList = [];
// const createTarget = (e) => {
//   e.preventDefault();
//   const obj = {
//     id: createId(),
//     targetValue: target.value,
//     summValue: summ.value,
//     desiredAmount: desiredAmount.value,
//   };
//   targetList.push(obj);
//   createDomEl(obj);
//   init();
//   updateProgress(obj);

//   // target.value = "";
//   // summ.value = "";
//   // desiredAmount.value = "";
// };

// const createId = () => {
//   return Math.floor(Math.random() * 100000000);
// };
// form.addEventListener("submit", createTarget);

// const createDomEl = (obj) => {
//   const item = document.createElement("li");
//   item.classList.add("smart_item");
//   item.innerHTML = `
//     <p class="smart_value">${obj.targetValue}</p>
//     <div id="progressbar">
//      <div id="progress"></div>
//      </div>
//     <p class="smart_summ">${obj.summValue}</p>
//      <div class="buttonGroup">
// <svg id="edit" onClick="updateTransaction(${obj.id})" class="svg">
//   <use xlink:href="../assets/icons/swgSprite/edit.svg#edit"></use></svg>
//   <svg onClick="removeTarget(${obj.id})" class="svg">
//   <use xlink:href="../assets/icons/swgSprite/edit.svg#delete"></use></svg>
//     `;

//   smartList.appendChild(item);
//   updateProgress(obj);
// };

// const removeTarget = (id) => {
//   targetList = targetList.filter((target) => target.id !== id);
//   init();
// };

// const updateProgress = (obj) => {
//   const progress = (obj.summValue / obj.desiredAmount) * 100;
//   const bar = document.getElementById("progress");
//   bar.style.width = progress + "%";
// };

// const init = () => {
//   smartList.innerHTML = "";
//   if (targetList.length == 0) {
//     const item = document.createElement("li");
//     item.classList.add("noItem");
//     item.textContent = "Здесь будут ваши цели";
//     smartList.appendChild(item);
//   }
//   targetList.forEach(createDomEl);
// };

// const updateTransaction = (id) => {
//   targetList.pop(targetList.find((item) => item.id === id).targetValue);
//   const text = targetList.find((item) => item.id === id).targetValue;

//   const obj = {
//     id: createId(),
//     targetValue: text,
//     summValue: summ.value,
//     desiredAmount: desiredAmount.value,
//   };
//   updateProgress(obj);
//   createDomEl(obj);
// };

const smartList = document.querySelector(".smart_list");
const form = document.querySelector("form");
const target = document.getElementById("target");
const summ = document.getElementById("summ");
const expected = document.getElementById("desiredAmount");

let obj;

let targetsArray = [];
const createObj = (e) => {
  e.preventDefault();
  let targetValue = target.value;
  let sumValue = summ.value;
  let expectedValue = expected.value;

  obj = {
    id: createId(),
    targetValue,
    sumValue,
    expectedValue,
  };
  targetsArray.push(obj);
  createDomElem(obj);
  checkList();

  target.value = "";
  summ.value = "";
  expected.value = "";
};

const createId = () => {
  return Math.floor(Math.random() * 100);
};

form.addEventListener("submit", createObj);

const createDomElem = (obj) => {
  const list = document.createElement("li");
  list.classList.add("smart_item");
  list.innerHTML = `
 <p class="smart_value">${obj.targetValue}</p>
    <div id="progressbar">
    <div id="progress"></div>
     </div>
    <p class="smart_summ">${obj.sumValue}</p>
     <div class="buttonGroup">
<svg id="edit" onClick="updateTarget(${obj.id})" class="svg">
  <use xlink:href="../assets/icons/swgSprite/edit.svg#edit"></use></svg>
  <svg onClick="deleteTarget(${obj.id})" class="svg">
  <use xlink:href="../assets/icons/swgSprite/edit.svg#delete"></use></svg>
  `;
  smartList.appendChild(list);
  updateProgress(obj, list);
};

const checkList = () => {
  smartList.innerHTML = "";
  if (targetsArray.length === 0) {
    const list = document.createElement("li");
    list.classList.add("noItem");
    list.textContent = "Здесь будут ваши цели";
    smartList.appendChild(list);
  }
  targetsArray.forEach(createDomElem);
};

const deleteTarget = (id) => {
  targetsArray = targetsArray.filter((el) => el.id !== id);
  checkList();
};

const updateTarget = (obj) => {
  const findItem = targetsArray.find((el) => el.id === obj.id);
  targetsArray.pop(findItem);
  if (obj == undefined) {
    createDomElem(obj);
  }
};

const updateProgress = (obj, list) => {
  let progress =
    obj.expectedValue > 0 ? (obj.sumValue / obj.expectedValue) * 100 : 0;
  const bar = list.querySelector("#progress");
  if (bar) {
    bar.style.width = progress + "%";
  }
};
