let priceRawData = [];
function getData() { 
    let userDate = new Date(document.getElementById("HighDate").value);
    // console.log(userDate);
    let timeStamp = userDate.getTime()/1000;
    let userDate2 = new Date(document.getElementById("HighDate2").value); 
    // console.log(userDate2); 
    let timeStamp2 = userDate2.getTime()/1000+3600;
    // console.log(timeStamp); 
    // console.log(timeStamp2);  
    return fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+timeStamp+'&to='+timeStamp2)   
    .then(response => response.json())   
    .then(data => {
        priceRawData = data
        // console.log(data)
        parsePriceData(priceRawData)
        // console.log(priceRawData);
        
    })  
};
//Parsing longest bearish data
function parsePriceData(priceRawData){
    let dataArr = [];
    let startDate = new Date(document.getElementById("HighDate").value);
    let filteredStartDate = startDate.getDate()+"/"+(startDate.getMonth()+1)+"/"+startDate.getFullYear();
    let endDate = new Date(document.getElementById("HighDate2").value);
    let filteredEndDate = endDate.getDate()+"/"+(endDate.getMonth()+1)+"/"+endDate.getFullYear();
    priceRawData.prices.forEach(function (element) {
        let con = element[0];
        let con2 = new Date(con);
        let time = con2.toLocaleTimeString('fi');
        let obj = {date: time, price: element[1]};
        dataArr.push(obj);  
    });    
    const filterDataArr = dataArr.filter(function(obj, index){
        return obj.date.startsWith("2.");
      })
      // console.log(filterDataArr);

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
            }
              document.getElementById("TextHigh").innerHTML = "In bitcoin’s historical data from CoinGecko, the price decreased "+longestSequence.length+" days's in a row for the inputs from "+filteredStartDate+" and to "+filteredEndDate;
        })
        return longestSequence;  
      }
      console.log(findDecreaseSubArray(filterDataArr));  
}










let tradingRawData = [];
function getTradingData() { 
  let userTradingDate = new Date(document.getElementById("TradingDate").value);
  //console.log(userTradingDate);
  let tradingTimeStamp = userTradingDate.getTime()/1000;
  let userTradingDate2 = new Date(document.getElementById("TradingDate2").value); 
  //console.log(userTradingDate2); 
  let tradingTimeStamp2 = userTradingDate2.getTime()/1000+3600;
  //console.log(tradingTimeStamp); 
  //console.log(tradingTimeStamp2);  
  return fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+tradingTimeStamp+'&to='+tradingTimeStamp2)   
  .then(response => response.json())   
  .then(data => {
      tradingRawData = data
      //console.log(data)
      parseTradingData(tradingRawData)
      //console.log(tradingRawData);      
  })  
};
//Parsing trading data 
function parseTradingData(tradingRawData) {
  let tradingDataArr = [];
  tradingRawData.total_volumes.forEach(function (element) {
    let con = element[0];
    // console.log(con);
    let con2 = new Date(con);
    let time = con2.toLocaleTimeString('fi')+" Day: "+con2.getDate()+" Month: "+(con2.getMonth()+1)+" Year: "+con2.getFullYear();
    let time2 = con2.getDate()+"/"+(con2.getMonth()+1)+"/"+con2.getFullYear();
    let obj = {date: time, price: element[1], day: time2};
    tradingDataArr.push(obj);      
});  
  //console.log(tradingDataArr);
  let filterTradingDataArr = tradingDataArr.filter(function(obj, index){
    return obj.date.startsWith("2.");
  })
 // console.log(filterTradingDataArr);
  let maxTradingDataArr = filterTradingDataArr.reduce((max, obj) => (max.price > obj.price) ? max : obj);
  //console.log(maxTradingDataArr);
  // let day = date.getDate();
  // console.log(day);
  // let time = new Date(maxTradingDataArr.date);
  // console.log(time);
  document.getElementById("TextTrading").innerHTML = "In bitcoin’s historical data from CoinGecko, the highest trading day volume between input days was "+maxTradingDataArr.day+" and volume on that day in euros "+maxTradingDataArr.price+"€";
}










let timeMachineRawData = [];
function getTimeMachineData() { 
  let userTimeMachineDate = new Date(document.getElementById("TimeMachineDate").value);
  //console.log(userTradingDate);
  let TimeMachineStamp = userTimeMachineDate.getTime()/1000;
  let userTimeMachineDate2 = new Date(document.getElementById("TimeMachineDate2").value); 
  //console.log(userTradingDate2); 
  let TimeMachineStamp2 = userTimeMachineDate2.getTime()/1000+3600;
  //console.log(tradingTimeStamp); 
  //console.log(tradingTimeStamp2);  
  return fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+TimeMachineStamp+'&to='+TimeMachineStamp2)   
  .then(response => response.json())   
  .then(data => {
    timeMachineRawData = data
      //console.log(data)
      parseTimeMachineData(timeMachineRawData)
      //console.log(tradingRawData);      
  })  
};

function parseTimeMachineData(timeMachineRawData) {
  let timeMachineDataArr = [];
  timeMachineRawData.prices.forEach(function (element) {
    let con = element[0];
    // console.log(con);
    let con2 = new Date(con);
    let time = con2.toLocaleTimeString('fi')+" Day: "+con2.getDate()+" Month: "+(con2.getMonth()+1)+" Year: "+con2.getFullYear();
    let time2 = con2.getDate()+"/"+(con2.getMonth()+1)+"/"+con2.getFullYear();
    let obj = {date: time, price: element[1], day: time2};
    timeMachineDataArr.push(obj); 
    //console.log(obj);     
  });  
  console.log(timeMachineDataArr);
  let filterTimeMachineDataArr = timeMachineDataArr.filter(function(obj, index){
    return obj.date.startsWith("2.");
  })
  console.log(filterTimeMachineDataArr);

   let minTradingDataArr = filterTimeMachineDataArr.reduce((min, obj) => (min.price < obj.price) ? min : obj);
  console.log(minTradingDataArr);
  
  
  let maxTradingDataArr = filterTimeMachineDataArr.reduce((max, obj) => (max.price > obj.price) ? max : obj);
  console.log(maxTradingDataArr);

 
}











document.addEventListener('DOMContentLoaded', function() {
    if (getData  === "click") {
        getData()        
    } else if (getTradingData === "click") {
      getTradingData()
    } else if (getTimeMachineData === "click") {
      getTimeMachineData()
    }else {
      console.log("empty Else");
    }
    
})
