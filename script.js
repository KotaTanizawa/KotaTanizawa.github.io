'use strict'
// 1行目に記載している 'use strict' は削除しないでください

let total = 240000000;

let purchaseTicket = 0;
let earningsTotalAmount =  0;
let incomeAmount = 0;

const lottery = {
  first : {tickeNumber:24,award:"1等 500,000,000円",value:500000000,color:"red"},
  frontRear : {tickeNumber:48,award:"前後賞 100,000,000円",value:100000000,color:"yellow"},
  differentSet : {tickeNumber:2376,award:"組違い賞 100,000円",value:100000,color:"orange"},
  second : {tickeNumber:2400,award:"2等 50,000円",value:50000,color:"green"},
  third : {tickeNumber:240000,award:"3等 10,000円",value:10000,color:"blue"},
  four : {tickeNumber:2400000,award:"4等 3,000円",value:3000,color:"purple"},
  five : {tickeNumber:24000000,award:"5等 300円",value:300,color:"gray"},
  lose : {tickeNumber:213355152,award:"はずれ",value:0,color:"black"}
}

/**
 * 
 * @param {boolean} cheat cheat使うか
 * @returns {number} くじの残り枚数までのランダムな数値を返す。cheatがtrueなら1を返す
 */
function randum(cheat) {
  if (cheat === false){
    return Math.floor(Math.random()*total);
  }else{
    return 1
  }
  
}
/**
 * 
 * @returns くじの結果を返す
 */
function drawLottery() {
  const number = randum(checkBox.checked);
  total--;
  let winning = 0;
  for (const key in lottery) {
    winning = winning + lottery[key].tickeNumber;
    if (number < winning) {
      lottery[key].tickeNumber--;
      return key;
    }
  }
}

/**
 * 
 * @param {*} value 金額 
 * @returns {string} 金額を1000単位で(,)を付けて文字列として出力する。
 */
function insertComma (value) {
  let valueStr = String(value);
  let result = "";
  for (let i = 0; i <valueStr.length ; i++) {
    if (i % 3 === 0 & i !== 0) {
      if (valueStr[0] === "-" & valueStr.length-1 !== i | valueStr[0] !== "-"){
        result = "," + result;
      }
    } 
    result = valueStr[valueStr.length - i - 1] + result
  }
  return result
}

/**
 * 抽選結果を画面に出力する
 */
function buyLottery() {
  const ticket = lottery[drawLottery()];
  result.innerHTML =  `<div class="loading"></div>`;
  result.style.color = "white";
  buyButton.innerText = "購入";
  buyButton.style.color = "white";
  setTimeout(() => {
    purchaseTicket ++;
    purchaseNumber.innerText = purchaseTicket + "枚 " + insertComma(purchaseTicket * 300) + "円";
    result.innerText = ticket.award;
    result.style.color = ticket.color;
    earningsTotalAmount = earningsTotalAmount + ticket.value;
    totalAmount.innerText = insertComma(earningsTotalAmount) + "円";
    incomeAmount = earningsTotalAmount - (purchaseTicket * 300);
    revenue.innerText = insertComma(incomeAmount) + "円";
    if (incomeAmount > 0) {
      finalAccount.style.backgroundColor = "red";
    } else {
      finalAccount.style.backgroundColor = "black";
    }
    buyButton.innerText = "1枚300円";
    buyButton.style.color = "black"
  }, 500);
  
  
}




const buyButton = document.getElementById("button");
const result = document.getElementById("result");
const purchaseNumber = document.getElementById("purchaseNumber");
const totalAmount = document.getElementById("totalAmount");
const revenue = document.getElementById("revenue");
const finalAccount = document.getElementsByClassName("finalAccount")[0];
const checkBox = document.getElementById("checkbox");



buyButton.addEventListener("click",buyLottery);
