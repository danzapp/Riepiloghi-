function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');

  // Build and return HTML in NATIVE sandbox mode.
  return template.evaluate()
      .setTitle('Riepiloghi')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function creaRiepilogo(date) {
Logger.log(objTeam)
  var periodo = date
  Logger.log(periodo)
  
  // recupera le tipologieAssenze da objCodici
  //Logger.log(objCodici)
  var tipologiaAssenze = uniqueBy(objCodici, function(x){return x.tipologia_assenza;})
  //var tipologiaStraordinario = ['STR', 'MPM', 'STM']
  var tipologiaStraordinario = uniqueBy(objAgenda, function(x){return x.tipo_maggior_orario;})
  //inizia a comporre le intestazioni della Table
  var headers =['PERSONALE']
  
  //Aggiunge le tipologie assenze alle intestazioni
  for (var t=0; t<=tipologiaAssenze.length-1; t++){
    headers.push(tipologiaAssenze[t])
  }

  headers.push('ASSENZE TOTALI')
  
  for (var t=0; t<=tipologiaStraordinario.length-1; t++){
    headers.push(tipologiaStraordinario[t])
  }
    headers.push('STRAORDINARIO TOTALE')
  // crea l'oggetto Riepilogo 
  // di fatto Riepilogo non viene usato
  // useremo solo l'array di oggetti "assenze"
  
  var Riepilogo = {
    periodo: periodo,
    intestazione: "Servizio Gestione PRA",
    titolo: "Riepilogo Assenze per il mese di "
  }
  
  Logger.log('periodo ' + periodo)
  var a = periodo.split("/")
  var mese = a[0]
  var anno = a[1]
 
  // itera per ogni membro del objTeam
  var assenze = [];
  
  // inserisci per ogni membro del personale le assenze e gli straordinari per ogni tipologia
  // e imposta ogni tipologia = 0 
  for (var i = 0; i<objTeam.length; i++){
  Logger.log( objTeam[i].cognome)

      var Assenze= {
        cognome: objTeam[i].cognome
      }
      var TipologiaPersonale={}
      var propTipologia
      for (var t in tipologiaAssenze){
        propTipologia = tipologiaAssenze[t]
        TipologiaPersonale[propTipologia] = 0
      }
      Assenze.Tipologia = TipologiaPersonale;
      
      var straordinarioPersonale={}
      var tipoStraordinario
      for (var s in tipologiaStraordinario){
        var propStraordinario = tipologiaStraordinario[s]
        straordinarioPersonale[propStraordinario] = 0
      }
      Assenze.straordinario = straordinarioPersonale;     

  // conteggia le assenze effettive per ogni personale in un oggetto Assenze
  
  // filtra objAgenda per periodo, Cognome e diverso da 'Annullata' 

 var agendaNominativo = objAgenda.filter(function(el){

      return el.data>=new Date(anno,mese-1) &&  el.data<new Date(anno,mese)  &&  el.stato != 'Annullata' && el.cognome == Assenze.cognome
  })
 
  
  // determina le colonne da visualizzare filtrando i soli codici che sono assegnati ad una tipologia assenza 
  Logger.log('agendaNominativo')
  Logger.log(agendaNominativo)
  Logger.log(agendaNominativo.length)
  Logger.log('objAgenda')
  Logger.log(JSON.stringify(objAgenda))
  var codici = uniqueBy(agendaNominativo, function(x){return x.codice_assenza;})
 
  // itera per ogni registrazione in 
  
      for (var j in agendaNominativo){  
       
          
            var codiceAssenza = agendaNominativo[j]['codice_assenza']
            var tipologiaAssenza = lookup(objCodici,'codice',codiceAssenza,'tipologia_assenza')
              for (var prop in Assenze.Tipologia){
                   switch(tipologiaAssenza) {
                    case prop:
                     Assenze.Tipologia[prop] = parseInt(Assenze.Tipologia[prop]) + 1
                    break;
                   default:
                    break
                  }
                }
       }
 Logger.log(Assenze)

 
// per ogni nominativo calcola i totali per ogni tipo di straordinario
    for (var j in agendaNominativo){ 
         for (var x = 0; x<tipologiaStraordinario.length; x++){
         
                   switch (agendaNominativo[j].tipo_maggior_orario) {
                    case tipologiaStraordinario[x]:
                    Logger.log('maggior orario ' + agendaNominativo[j].maggior_orario_effettuato)
                     Assenze.straordinario[tipologiaStraordinario[x]] = Assenze.straordinario[tipologiaStraordinario[x]] + agendaNominativo[j].maggior_orario_effettuato
                     Logger.log(Assenze.straordinario[tipologiaStraordinario[x]])
                    break;
                   default:
                    break           
              }    
        }
    }  
    
//  per ogni nominativo calcola i totali assenze 

    var totaleAssenze = sum(Assenze.Tipologia)
    Assenze.Tipologia['Assenze totali'] = totaleAssenze
    //var totaleStraordinari = convertSecondsToHHMMSS(sum(Assenze.straordinario))
    var totaleStraordinari = sum(Assenze.straordinario)
    Assenze.straordinario['Straordinario totale'] = totaleStraordinari

    
    // converti il dettaglio straordinari
    
    for (prop in Assenze.straordinario){
            Assenze.straordinario[prop] = convertSecondsToHHMM(Assenze.straordinario[prop] )
    }
    Logger.log(Assenze)
    assenze.push(Assenze)
    Logger.log('ASSENZE')
    Logger.log(Assenze)
 }
  
  // trasforma l'array di oggetti "assenze" in un array2D
  var data = objToArray2D(assenze)
  
  // ordina l'array2D sulla base della prima colonna (Cognome)
  data.sort(sortFunction);
  
  // aggiunge le intestazioni in cima all'array
  data.unshift(headers)
  
  
  Logger.log(data)
  // imposta la proprietà AssenzePersonale dell'oggetto Riepilogo con l'array "assenze"
  Riepilogo.AssenzePersonale = assenze
  
  // crea uno sheet con il riepilogo (al momento commentato)
  //stampaRiepilogo(Riepilogo, headers, tipologiaAssenze)
  
  // ritorna l'array2D che verrà renderizzato in una table dalle API google.visualization
  var mainObj = {
  data: data,
  assenze: assenze
  }
  return mainObj

 }

         
function stampaRiepilogo(Riepilogo, headers, tipologiaAssenze){
// al momento non stampa nè salva sullo sheet  
  ssRiepilogo.insertSheet(Riepilogo.periodo).activate()
  var sheet = ssRiepilogo.getActiveSheet()
  sheet.deleteRows(1, 999)
  sheet.deleteColumns(2,25)
  
  var range = sheet.getRange("A1");
  range.setValue(Riepilogo.intestazione)
  styling(sheet,range,styleH1)
  sheet.setRowHeight(1, 100)
  
  var range = range.offset(1, 0)
  range.setValue(Riepilogo.titolo + Riepilogo.periodo)
  styling(sheet,range,styleH2)
  sheet.setRowHeight(1, 20)
  
  //renderizza le headers
  var range = sheet.getRange(3,1,1,headers.length)
  range.setValues([headers])
  for (var c=0; c<headers.length; c++){
    var cell = sheet.getRange(3,2,1,c+1)
    range.setHorizontalAlignment("center")
    cell.setWrap(true)
    sheet.setColumnWidth(c+1, 155)
  }
  styling(sheet,range,styleHeaderTable)
  var range = sheet.getRange(2,1)
  var y = 3
  for (var i in Riepilogo.AssenzePersonale){
      y = y+1
      var range = sheet.getRange(y,1)
      range.setValue(Riepilogo.AssenzePersonale[i].cognome)
      styling(sheet,range,styleHeaderTable)
      for (var j in Riepilogo.AssenzePersonale[i].Tipologia){
        var range = range.offset(0,1)
        Logger.log(Riepilogo.AssenzePersonale[i].Tipologia[j])
        range.setValue(Riepilogo.AssenzePersonale[i].Tipologia[j])
        range.setHorizontalAlignment("center")
        styling(sheet,range,styleDataCentered)
      }
  }   
}
           
