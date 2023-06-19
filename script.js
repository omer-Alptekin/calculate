const display = document.querySelector(".calculater-input");
const keys = document.querySelector(".calculater-keys");

let displayValue = "0"; // kullanıcı butona tıkladığında değişecek olan kısımlar buraya gelecek. Başlangıç değeri "0"
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();

function updateDisplay() {
  // display value set etmek için bir function oluşturum
  display.value = displayValue;
}

// tuşlara bastığımızda çalışmaları için event ekledik. artık tuşlarım aktif
keys.addEventListener("click", function (e) {
  const element = e.target;

  if (!element.matches("button")) return;
  // tıklamış olduğumuz elementin buton olup olmadığını kontrol ediyoruz.matches()Arabirim yöntemi, öğenin belirtilen CSS seçiciElement tarafından seçilip seçilmeyeceğini test eder .

  if (element.classList.contains("operator")) {
    // console.log("operator", element.value);
    handleOperator(element.value);
    updateDisplay();
    return;
  }
  if (element.classList.contains("decimal")) {
    // console.log("decimal", element.value);
    inputDecimal();
    updateDisplay();
    return;
  }
  if (element.classList.contains("clear")) {
    // console.log("clear", element.value);
    clear();
    updateDisplay();
    return;
  }
  //contains() : Element verilen class'ı içeriyorsa true, içermiyorsa false döner. Bu sayede bir işlem yaptırmadan önce kontrol edebiliriz.
  //console.log("number", element.value);

  inputNumber(element.value);
  updateDisplay();
});

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue);

  if (operator && waitingForSecondValue) {
    operator = nextOperator;
    return;
  }

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);

    displayValue = `${parseFloat(result.toFixed(7))}`;
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextOperator;
  console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

function calculate(first, second, operator) {
  if (operator === "+") {
    return first + second;
  } else if (operator === "-") {
    return first - second;
  } else if (operator === "*") {
    return first * second;
  } else if (operator === "/") {
    return first / second;
  }

  return second;
}

//input number fonksiyonum numaratik bir değer alıyor. inputuma ilk değeri girdim operatorümü çağırdım ikinci değerimi gireceğim zaman bu fonk. çalışacak.
function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? num : displayValue + num;
  }

  //   console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

// decimal kontrolu yapıyoruz noktayı bir den fazla almasın diye yeni bir kontrol yaptık ve fonksiyon içine attık.
function inputDecimal() {
  if (!displayValue.includes(".")) {
    displayValue += ".";
  }
}
// AC tuşu için temizleme işlemi yaptık addevent listener içinde fonksiyonumuzu tanımladık. ve çalışması için clear metodunun altında updateDisplay(fonk. çalıştırıyorum.)
function clear() {
  displayValue = "0";
}
