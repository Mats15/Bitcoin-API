let priceRawData = [];
function getData() { 
    let userDate = new Date(document.getElementById("HighDate").value);
    let timeStamp = userDate.getTime()/1000;
    let userDate2 = new Date(document.getElementById("HighDate2").value); 
    let timeStamp2 = userDate2.getTime()/1000+3600;
    return fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+timeStamp+'&to='+timeStamp2)   
    .then(response => response.json())   
    .then(data => {
        priceRawData = data
        parsePriceData(priceRawData)
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
        let rawUnix = element[0];
        let conDate = new Date(rawUnix);
        let time = conDate.toLocaleTimeString('fi');
        let obj = {date: time, price: element[1]};
        dataArr.push(obj);  
    });    
    const filterDataArr = dataArr.filter(function(obj, index){
        return obj.date.startsWith("2.");
    })
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
        }) 
        let today = new Date();
         if (startDate > endDate) {
            document.getElementById("TextHigh").innerHTML = "Start date cannot be after the end date";
          } else if (filteredStartDate == filteredEndDate) {
            document.getElementById("TextHigh").innerHTML = "Start date cannot be the same as the end date";
          } else if (startDate > today || endDate > today) {
            document.getElementById("TextHigh").innerHTML = "You cannot choose a day from the future";
          } else {
            document.getElementById("TextHigh").innerHTML = "In bitcoin’s historical data from CoinGecko, the price decreased "+longestSequence.length+" days in a row for the inputs from "+filteredStartDate+" to "+filteredEndDate;
          }
          
        return longestSequence;  
      }
      console.log(findDecreaseSubArray(filterDataArr));  
}

//Fetch trading data from CoinGecko API
let tradingRawData = [];
function getTradingData() { 
  let userTradingDate = new Date(document.getElementById("TradingDate").value);
  let tradingTimeStamp = userTradingDate.getTime()/1000;
  let userTradingDate2 = new Date(document.getElementById("TradingDate2").value); 
  let tradingTimeStamp2 = userTradingDate2.getTime()/1000+3600; 
  return fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+tradingTimeStamp+'&to='+tradingTimeStamp2)   
  .then(response => response.json())   
  .then(data => {
      tradingRawData = data
      parseTradingData(tradingRawData)      
  })  
};

//Parsing trading data 
function parseTradingData(tradingRawData) {
  let tradingDataArr = [];
  let TradingStartDate = new Date(document.getElementById("TradingDate").value);
  let filteredTradingStartDate = TradingStartDate.getDate()+"/"+(TradingStartDate.getMonth()+1)+"/"+TradingStartDate.getFullYear();
  let TradingEndDate = new Date(document.getElementById("TradingDate2").value);
  let filteredTradingEndDate = TradingEndDate.getDate()+"/"+(TradingEndDate.getMonth()+1)+"/"+TradingEndDate.getFullYear();
  tradingRawData.total_volumes.forEach(function (element) {
    let rawUnix = element[0];
    let conDate = new Date(rawUnix);
    let time = conDate.toLocaleTimeString('fi')+" Day: "+conDate.getDate()+" Month: "+(conDate.getMonth()+1)+" Year: "+conDate.getFullYear();
    let time2 = conDate.getDate()+"/"+(conDate.getMonth()+1)+"/"+conDate.getFullYear();
    let obj = {date: time, price: element[1], day: time2};
    tradingDataArr.push(obj);      
  });  

  let filterTradingDataArr = tradingDataArr.filter(function(obj, index){
    return obj.date.startsWith("2.");
  })

  let today2 = new Date();
  if (TradingStartDate > TradingEndDate) {
      document.getElementById("TextTrading").innerHTML = "Start date cannot be after the end date";
    } else if (filteredTradingStartDate == filteredTradingEndDate) {
      document.getElementById("TextTrading").innerHTML = "Start date cannot be the same as the end date";
    } else if (TradingStartDate > today2 || TradingEndDate > today2) {
      document.getElementById("TextTrading").innerHTML = "You cannot choose a day from future";
    } else {
      let maxTradingDataArr = filterTradingDataArr.reduce((max, obj) => (max.price > obj.price) ? max : obj);
      document.getElementById("TextTrading").innerHTML = "In bitcoin’s historical data from CoinGecko, the highest trading day volume between input days was "+maxTradingDataArr.day+" and volume on that day in euros "+maxTradingDataArr.price+"€";
    }
}

//Fetch time machine data from CoinGecko API
let timeMachineRawData = [];
function getTimeMachineData() { 
  let userTimeMachineDate = new Date(document.getElementById("TimeMachineDate").value);
  let TimeMachineStamp = userTimeMachineDate.getTime()/1000;
  let userTimeMachineDate2 = new Date(document.getElementById("TimeMachineDate2").value); 
  let TimeMachineStamp2 = userTimeMachineDate2.getTime()/1000+3600; 
  return fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from='+TimeMachineStamp+'&to='+TimeMachineStamp2)   
  .then(response => response.json())   
  .then(data => {
    timeMachineRawData = data
      parseTimeMachineData(timeMachineRawData)    
  })  
};

//Parsing Time Machine data
function parseTimeMachineData(timeMachineRawData) {
  let timeMachineDataArr = [];
  let TimeMachineDate = new Date(document.getElementById("TimeMachineDate").value);
  let TimeMachineDate2 = new Date(document.getElementById("TimeMachineDate2").value); 
  let filteredTimeMachineDate = TimeMachineDate.getDate()+"/"+(TimeMachineDate.getMonth()+1)+"/"+TimeMachineDate.getFullYear();
  let filteredTimeMachineDate2 = TimeMachineDate2.getDate()+"/"+(TimeMachineDate2.getMonth()+1)+"/"+TimeMachineDate2.getFullYear();

  timeMachineRawData.prices.forEach(function (element) {
    let rawUnix = element[0];
    let conDate = new Date(rawUnix);
    let time = conDate.toLocaleTimeString('fi')+" Day: "+conDate.getDate()+" Month: "+(conDate.getMonth()+1)+" Year: "+conDate.getFullYear();
    let time2 = conDate.getDate()+"/"+(conDate.getMonth()+1)+"/"+conDate.getFullYear();
    let obj = {date: time, price: element[1], day: time2, unixTime: rawUnix};
    timeMachineDataArr.push(obj);    
  }); 

  let filterTimeMachineDataArr = timeMachineDataArr.filter(function(obj, index){
    return obj.date.startsWith(("2.")||("3."));
  })

  let today3 = new Date();
  if (TimeMachineDate > TimeMachineDate2) {
      document.getElementById("TextTimeMachine").innerHTML = "Start date cannot be after the end date";
    } else if (filteredTimeMachineDate == filteredTimeMachineDate2) {
      document.getElementById("TextTimeMachine").innerHTML = "Start date cannot be the same as the end date"; 
    } else if (TimeMachineDate > today3 || TimeMachineDate2 > today3) {
      document.getElementById("TextTimeMachine").innerHTML = "You cannot choose a day from future"; 
    } else {
        let minTradingDataArr = filterTimeMachineDataArr.reduce((min, obj) => (min.price < obj.price) ? min : obj);
        let maxTradingDataArr = filterTimeMachineDataArr.reduce((max, obj) => (max.price > obj.price && minTradingDataArr.unixTime < obj.unixTime) ? max : obj);
        if (minTradingDataArr === maxTradingDataArr) {
            document.getElementById("TextTimeMachine").innerHTML = "Dont buy or sell between the selected days!"; 
        } else {
          document.getElementById("TextTimeMachine").innerHTML = "Best day to buy Bitcoin between the input days was "+minTradingDataArr.day+" And best day to sell was "+maxTradingDataArr.day;
        } 
      } 
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