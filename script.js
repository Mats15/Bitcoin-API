// fetch('https://api.coingecko.com/api/v3/coins/list')
// .then((response) => response.json())
// .then(function (data) {
// console.log(data)
// })

// fetch ('https://api.coingecko.com/api/v3/coins/list')
// .then((response) => response.json())
// .then(data => document.getElementById("TextDown").innerHTML = JSON.stringify(data));
// function getData() { 
//     let userDate = document.getElementById("HighDate").value = new Date().toJSON().slice(0,10).split('-').reverse().join('-');                 
//     return fetch('https://api.coingecko.com/api/v3/coins/bitcoin/history?date='+userDate)
//     .then(response => response.json())
//     .then(data => document.getElementById("TextHigh").innerHTML = JSON.stringify(data))
// }
// document.addEventListener('DOMContentLoaded', function() {
//     if (getData === "click") {
//         getData()
//     }
// })
let rawData = [];
function getData() { 
    let userDate = new Date(document.getElementById("HighDate").value);
    console.log(userDate);
    let timeStamp = userDate.getTime()/1000;
    let userDate2 = new Date(document.getElementById("HighDate2").value); 
    console.log(userDate2); 
    let timeStamp2 = userDate2.getTime()/1000+3600;
    console.log(timeStamp); 
    console.log(timeStamp2);  
    return fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+timeStamp+'&to='+timeStamp2)   
    .then(response => response.json())   
    .then(data => {
        rawData = data
        console.log(data)
        parseData(rawData)
        //console.log(rawData);
        
    })  
};
    

function parseData(rawData){
    let dataArr = [];
    console.log(typeof rawData.prices[0]);
    console.log(rawData.prices[0][0])
    console.log(rawData.prices[24][0])
    rawData.prices.forEach(function (element) {
        let con = element[0];
        let con2 = new Date(con);
        let time = con2.toLocaleTimeString('fi');
        let obj = {date: time, price: element[1]};
        dataArr.push(obj);  
    });    
    // console.log(typeof dataArr[0].date);
    // console.log(dataArr);


    const filterDataArr = dataArr.filter(function(obj, index){
        return obj.date.startsWith("2.");
      })

    // const filterDataArr = dataArr.filter(function(date, index){
    //     return index % 24 == 0;
    //   })
      
      // Display new Array
      console.log(filterDataArr);

    function findDecreaseSubArray(filterDataArr) {
        let startIndex = 0;
        let length = 1;
      
        let longestSequence = {
          startIndex: 0,
          length: 1
        }
      
        filterDataArr.forEach((element, index, filterDataArr) => {
            if (index === 0) return;
          
          if (element.price < filterDataArr[index -1].price) {
            length += 1;
          } else {      
            length = 1;
            startIndex = index;
          }
      
          if (length > longestSequence.length) {
              longestSequence.length = length;
              longestSequence.startIndex = startIndex;
              
              console.log(dataArr);
          }
            document.getElementById("TextHigh").innerHTML = "In bitcoin’s historical data from CoinGecko, the price decreased "+longestSequence.length+" days's in a row for the inputs from";
        })
      
        return longestSequence;
        
      }
      console.log(findDecreaseSubArray(filterDataArr));
      //document.getElementById("TextHigh").innerHTML = JSON.stringify(findDecreaseSubArray("In bitcoin’s historical data from CoinGecko, the price decreased"+longestSequencelength));

    
    
     
    
}



document.addEventListener('DOMContentLoaded', function() {
    if (getData === "click") {
        getData()        
    }
})
