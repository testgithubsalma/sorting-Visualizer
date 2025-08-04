let array = [];
let delay = 100;

const container = document.getElementById("array-container");
const arraySizeSlider = document.getElementById("arraySize");
const speedSlider = document.getElementById("speed");

speedSlider.addEventListener("input", () => {
  delay = 310 - speedSlider.value;
});

function generateArray() {
  container.innerHTML = '';
  array = [];
  const size = arraySizeSlider.value;

  for (let i = 0; i < size; i++) {
    const val = Math.floor(Math.random() * 250) + 10;
    array.push(val);
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${val}px`;
    bar.style.width = `${100 / size}%`;
    container.appendChild(bar);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
  const bars = container.querySelectorAll(".bar");
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = "red";
      bars[j + 1].style.backgroundColor = "red";

      await sleep(delay);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];

        // Swap heights
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      bars[j].style.backgroundColor = "#4caf50";
      bars[j + 1].style.backgroundColor = "#4caf50";
    }
  }
}

async function selectionSort() {
  const bars = container.querySelectorAll(".bar");
  for (let i = 0; i < array.length; i++) {
    let min = i;
    bars[min].style.backgroundColor = "blue";

    for (let j = i + 1; j < array.length; j++) {
      bars[j].style.backgroundColor = "red";
      await sleep(delay);

      if (array[j] < array[min]) {
        bars[min].style.backgroundColor = "#4caf50";
        min = j;
        bars[min].style.backgroundColor = "blue";
      } else {
        bars[j].style.backgroundColor = "#4caf50";
      }
    }

    [array[i], array[min]] = [array[min], array[i]];
    bars[i].style.height = `${array[i]}px`;
    bars[min].style.height = `${array[min]}px`;

    bars[min].style.backgroundColor = "#4caf50";
    bars[i].style.backgroundColor = "#4caf50";
  }
}

async function insertionSort() {
  const bars = container.querySelectorAll(".bar");
  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j]}px`;
      j--;
      await sleep(delay);
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
  }
}

generateArray();
