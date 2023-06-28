'use strict'
// 1行目に記載している 'use strict' は削除しないでください

let total = 240000000;

let purchaseTicket = 0;
let earningsTotalAmount =  0;
let incomeAmount = 0;

const lottery = {
  first : {tickeNumber:24,award:"1当 500,000,000円",value:500000000,color:"red"},
  frontRear : {tickeNumber:48,award:"前後賞 100,000,000円",value:100000000,color:"yellow"},
  differentSet : {tickeNumber:2376,award:"組違い賞 100,000円",value:100000,color:"orange"},
  second : {tickeNumber:2400,award:"2当 50,000円",value:50000,color:"green"},
  third : {tickeNumber:240000,award:"3当 10,000円",value:10000,color:"blue"},
  four : {tickeNumber:2400000,award:"4当 3,000円",value:3000,color:"purple"},
  five : {tickeNumber:24000000,award:"5当 300円",value:300,color:"gray"},
  lose : {tickeNumber:213355152,award:"はずれ",value:0,color:"black"}
}

function randum(cheat) {
  if (cheat === false){
    return Math.floor(Math.random()*total);
  }else{
    return Math.floor(Math.random()*1);
  }
  
}

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

function buyLottery() {
  purchaseTicket ++;
  purchaseNumber.innerText = purchaseTicket + "枚 " + insertComma(purchaseTicket * 300) + "円";
  const ticket = lottery[drawLottery()];
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
}




const buyButton = document.getElementById("button");
const result = document.getElementById("result");
const purchaseNumber = document.getElementById("purchaseNumber");
const totalAmount = document.getElementById("totalAmount");
const revenue = document.getElementById("revenue");
const finalAccount = document.getElementsByClassName("finalAccount")[0];
const checkBox = document.getElementById("checkbox");



buyButton.addEventListener("click",buyLottery);


