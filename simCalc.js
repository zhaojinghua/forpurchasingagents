var taxObject = document.getElementById("sacTax");
var oPriceObject = document.getElementById("oPrice");
var taxRateObject = document.getElementById("taxRate");
var totalObject = document.getElementById("totalPrice");
var usdcnyObject = document.getElementById("usdTocny");
var inRMBObject = document.getElementById("totalInRMB");
var olPriceObject = document.getElementById("olPrice");

function appendToPrice(keyvalue) {
    if (oPriceObject.value == "0") {
        oPriceObject.value = keyvalue;
    }
    else {
        oPriceObject.value = oPriceObject.value + keyvalue;
    }
    olPriceObject.value = (parseInt(oPriceObject.value) / 100).toFixed(2);
}

function calcFunc() {
    taxObject.value = (parseFloat(taxRateObject.value) * parseFloat(olPriceObject.value)).toFixed(2);
    totalObject.value = (parseFloat(olPriceObject.value) + parseFloat(taxObject.value)).toFixed(2);
    inRMBObject.value = (parseFloat(totalObject.value * usdcnyObject.value)).toFixed(2);
}
function resetFunc() {
    olPriceObject.value = "0";
    oPriceObject.value = "0";
    totalObject.value = "0";
    inRMBObject.value = "0";
    taxObject.value = "0";
}
function delFunc() {
    oPriceObject.value = oPriceObject.value.substr(0, oPriceObject.value.length - 1);
    olPriceObject.value = (parseInt(oPriceObject.value) / 100).toFixed(2);
    calcFunc();
    //var strLength = oPriceObject.value.length;
    //oPriceObject.value = oPriceObject.value.substring(0, strLength);
}

function getRate(from, to) {
    var script = document.createElement('script');
    script.setAttribute('src',
        "http://query.yahooapis.com/v1/public/yql?q=select%20rate%2Cname%20from%20csv%20where%20url%3D'http%3A%2F%2Fdownload.finance.yahoo.com%2Fd%2Fquotes%3Fs%3D"
        + from + to + "%253DX%26f%3Dl1n'%20and%20columns%3D'rate%2Cname'&format=json&callback=parseExchangeRate");
    document.body.appendChild(script);
}
 
function parseExchangeRate(data) {
    var rate = parseFloat(data.query.results.row.rate, 10);
    usdcnyObject.value = rate;
	
}
  
getRate("USD", "CNY");

