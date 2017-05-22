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
   // per il test
   //hms = new Date('Sat Dec 30 1899 13:24:00 GMT+0100 (CET)')
   if (typeof(hms) == 'number' || hms == ''){
     //Logger.log('NUMBER')
     //Logger.log('hms is NUMBER= ' + hms)
        var hours = 99
        var minutes = 59
        var seconds = 59
   }

   // verifica che hms sia DATE
   if (typeof(hms) == 'object'){
        //Logger.log('DATE')
        var hours = hms.getHours()
        var minutes = hms.getMinutes()
        var seconds = hms.getSeconds()
   }
  
  //verifica se hms è STRING
  if (typeof(hms) == 'string'){
  
  //Logger.log('STRING')
     var a = hms.split(':'); // split it at the colons
     // minutes are worth 60 seconds. Hours are worth 60 minutes.
        var hours = a[0]
        var minutes = a[1]
        var seconds = a[2]
   }
  var time = (+hours) * 60 * 60 + (+minutes) * 60 + (+seconds);     
  /*
  Logger.log('convertHHMMSSToSeconds(' + hms +')') 
  Logger.log('hms ' + hms)
  Logger.log('type ' + typeof(hms))   
  Logger.log('hours ' + hours)
  Logger.log('minutes ' + minutes)
  Logger.log ('seconds ' + seconds)
  Logger.log('time ' + time)
  */
  return time
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



      




