//*** OBJECT




//*** AGENDA

ssAgenda = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1vJvjg-jssHkDZIo53KMddEP5wHE09QRcNHmiebC3k9s/edit#gid=1088779443')
sheetAgenda= ssAgenda.getSheetByName('Agenda')
dataRangeAgendaValues= sheetAgenda.getDataRange().getValues()
//extract headers
HeadersAgenda = dataRangeAgendaValues.slice(0,1);
Agenda = dataRangeAgendaValues.slice(3,dataRangeAgendaValues.length);
objAgenda = Agenda.map(function(y) {
    return {  
          "data": y[7],
          "cognome": y[3],
          "codice_assenza": y[5],
          "stato":  y[14],
          "maggior_orario_effettuato": convertHHMMSSToSeconds(y[10]),
          "tipo_maggior_orario": y[11]
      }
    }) 

//**** TEAM

// lo sheet Team non è ancora completo
//ssTeam = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/14_3UOO85IgrQHUTTTMwmocrLkhXORuaTAWlmCy9wsLA/edit#gid=1803677658')
//sheetTeam = ssTeam.getSheetByName('Team')

// usa lo sheet ImportedTeam di DEV Monitoraggio Assenze
ssTeam = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1lR-utYMNDTWogV5bBZpjTGAMmERKunVh_h9dvpOxtY0/edit')
sheetTeam = ssTeam.getSheetByName('ImportedTeam')
dataRangeTeamValues= sheetTeam.getDataRange().getValues()
Logger.log("Membri del Team = " + dataRangeTeamValues.length)
//extract headers
HeadersTeam = dataRangeTeamValues[0];
dataRangeTeamValues.shift() // elimina la riga degli headers
Team = dataRangeTeamValues

objTeam = Team.map(function(y) {
    return {  
          "cognome": y[0].charAt(0).toUpperCase() + y[0].slice(1).toLowerCase()
          
      }
    })
    
//***** CODICI
ssCodici = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1lR-utYMNDTWogV5bBZpjTGAMmERKunVh_h9dvpOxtY0/edit#gid=694955309')
sheetCodici = ssCodici.getSheetByName('ImportedCodici')
dataRangeCodiciValues= sheetCodici.getDataRange().getValues()
HeadersCodici = dataRangeCodiciValues[0];
dataRangeCodiciValues.shift()
//Codici = dataRangeCodiciValues.slice(2,dataRangeCodiciValues.length);
Codici = dataRangeCodiciValues
objCodici = Codici.map(function(y) 
  {if (y[1]!='')
    {
      return {  
                "codice" : y[0],
                "tipologia_assenza" : y[2]
             }
    }

    })
    
//**** RIEPILOGO

ssRiepilogo = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1lR-utYMNDTWogV5bBZpjTGAMmERKunVh_h9dvpOxtY0/edit#gid=1728643598')




