var light_blue = '#ccefff'

function Style() {

  this.background = 'white';
  this.fontSize = 12;
  this.rowHeight = 21;
};

var styleNormal = new Style("normal")
styleNormal.fontSize = 12;

var styleH1 = new Style ("H1")
styleH1.fontSize = 20;
styleH1.rowHeight = 50;
styleH1.background = light_blue 

var styleH2 = new Style ("H2")
styleH1.fontSize = 16;
styleH1.rowHeight = 30;

var styleHeaderTable = new Style ("HeaderTable")
styleHeaderTable.fontWeights = 'Bold'

var styleDataCentered = new Style ("DataCentered")


function styling(sheet,range,style){
  range.setBackground(style.background);
  range.setFontSize(style.fontSize);
  var row = range.getRow()
  sheet.setRowHeight(row, style.rowHeight)
  range.setFontWeight(style.fontWeights);
  /*
  sheet.range.setFontColors(style.fontColors);
  sheet.range.setFontFamilies(style.fonts);
  sheet.range.setFontStyles(style.fontStyles);
  */
  
}


