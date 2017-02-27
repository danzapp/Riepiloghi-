function findValueInObject(value){
 for (var i in objCodici){
   if (objCodici[i].Codice===value && objCodici[i]["Tipologia Assenza"] !=''){
     return objCodici[i]["Tipologia Assenza"] 
     break
   } 
 }
}


function uniqueBy(arr, fn) {
  var unique = {};
  var distinct = [];
  arr.forEach(function (x) {
    var key = fn(x);
    if (!unique[key] && key!='') {  // non include le stringhe nulle
      distinct.push(key);
      unique[key] = true;
    }
  });
  return distinct;
}


// viene usata per effettuare 
function total(){
  var summed = 0
  var sample = [{ a: 1 , b: 2 , c:3 }, { a: 2 , b: 1 , c:1 }];
  for (i in sample){
    summed += sum( sample[i])
  }
  Logger.log(summed)
}
// 
function sum( obj ) {
  var sum = 0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
}



Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};


function objToArray2D(obj){
  var array = []
  for (var i in obj){
     var subArray = []
     subArray.push(obj[i]['cognome'])
     for (var key in obj[i]['Tipologia']){
         subArray.push(obj[i]['Tipologia'][key])
       }
     for (var key in obj[i]['straordinario']){
         subArray.push(obj[i]['straordinario'][key])
       }
     array.push(subArray)
  }
return array
}



function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function getNum(val) {
   if (isNaN(val)) {
     return 0;
   }
   return val;
}

function convertHHMMSSToSeconds(hms){
   Logger.log(hms)
   if (typeof(hms) == 'number' || hms == ''){
     var seconds = 0
   }

   else
   {
     var a = hms.split(':'); // split it at the colons
     // minutes are worth 60 seconds. Hours are worth 60 minutes.
     var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
   }
return seconds
}

function convertSecondsToHHMM(seconds){

var minutes = (seconds/3600) - (seconds % 3600)
     if (minutes == 0 || typeof(minutes) != 'number'){
       return '00:00'
     }
     var hours = parseInt( seconds / 3600 );
     var minutes = parseInt( (seconds - (hours * 3600)) / 60 );
     var seconds = Math.floor((seconds - ((hours * 3600) + (minutes * 60))));
     var hhmm = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);
 return(hhmm);
}

function lookup(obj,propA,valueA,propB){

  for (var x=0; x<obj.length; x++){
      if (obj[x][propA] == valueA){
          return obj[x][propB]
      }
  }    
  return null

}



      




