let temp = '';let total = ''; let subtotal = ''; let history = ''; let currentString = ''; let newString = '';
let var1; let var2; let symbol; let lastSymbol; 
let upperScreen = document.querySelector('.upperScreen');
let lowerScreen = document.querySelector('.lowerScreen');

function addNumber(str) {
    if (temp.length < 13) temp += str;
    populateLowerScreen(temp)
}

function addOperator(str) {
    lastSymbol = (upperScreen.textContent).slice(-2)[0];
    //The first if is handling situation where an operator is clicked while no numbers have been inputed yet
    //for example, if the user is trying to continue operations on a total obtained before.
    if (temp == '') { //to handle a case where a user pressed an operation twice consecutively, we look at the upperscreen.
        if (upperScreen.textContent == '') { //if it is empty, no operations had been done and we can populate it. 
            var1 = total;
            symbol = str;
            populateUpperScreen(var1, symbol)
            populateLowerScreen(var1)
        } else { //If it isn't then the user just pressed two operations one after the other 
            upperScreen.textContent = upperScreen.textContent.replace(/..$/, str+' '); 
            symbol = str; //and we simply rectify the upperscreen and store the new one.
        }
    } else if (var1 == undefined) { //if no numbers have been entered in var1, goes to var1.
        var1 = populateVariable(temp)
        symbol = str;
        populateUpperScreen(var1, symbol);
    } else {
        var2 = populateVariable(temp); //if there is a number in var1, goes to var2 and resolves current two vars with operator
        var1 = operate(symbol, var1, var2);
        symbol = str;
        populateUpperScreen(var2, symbol);
        populateLowerScreen(var1)
    }
}

function equalSign() {
    var2 = populateVariable(temp); //if equal sign is called, populate var2 with latest
    total = operate(symbol,var1,var2); //resolve operation with two variables.
    var1 = undefined;
    upperScreen.textContent = '';
    populateLowerScreen(total);
}

function populateVariable(str) {
    temp = '';
    return +str;
}

function populateUpperScreen(varX, symbol) {
    upperScreen.textContent  += commaSeparateNumber(varX) + ' ' + symbol + ' ';
}

function populateLowerScreen(str) {
    (str.toString().length > 13) ? lowerScreen.textContent = str.toExponential(5) : lowerScreen.textContent  = commaSeparateNumber(str);
}

function operate(symbol,var1,var2) {
    switch (symbol) {
        case '+': return var1+var2;
        case '-': return var1-var2;
        case '*': return var1*var2;
        case '/': return var1/var2;
    }
}

function addComma() {
    if (!(temp.includes('.'))) temp += '.'; 
}

function undo() {
    temp = temp.slice(0,-1);
    populateLowerScreen(temp);
}

function clearMemory() {
    upperScreen.textContent = '';
    lowerScreen.textContent = '';
    var1 = undefined
    var2 = undefined
    symbol = '';
    total = '';
}

function commaSeparateNumber(val){
    let valSplit = val.toString().split('.');
    while (/(\d+)(\d{3})/.test(valSplit[0].toString())){
        valSplit[0] = valSplit[0].toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return valSplit.join('.');
    // return val;
}

//KEYBOARD MAPPING
document.onkeydown = function (e) {
    let keyCode = e.keyCode;
    let shiftKey = e.shiftKey;
    if (shiftKey == true) {
        switch (keyCode) {
            case 56: addOperator('*');break;
            case 51: addOperator('/');break;
            case 61: addOperator('+');break;
        }
    }
    else if ((keyCode < 58 && keyCode > 47) || (keyCode < 106 && keyCode > 95)) {
        addNumber(keyMapping[keyCode.toString()]);
    } 
    else if (keyCode < 112 && keyCode > 105 || keyCode == 173) {addOperator(keyMapping[keyCode.toString()]);}
    else if (keyCode == 27) {clearMemory()}
    else if (keyCode == 46 || keyCode == 8) {undo()}
    else if (keyCode == 13) {equalSign()}
    else if (keyCode == 188 || keyCode == 190 || keyCode == 110) {addComma()}
    else if (keyCode == 116) {location.reload()}
}

document.onkeypress = function (e) {
    let keyCode = e.keyCode;
    if (keyCode == 56 || keyCode == 51 || keyCode == 61) {
        addOperator(keyMapping[keyCode.toString()]);
    }
}
  

let keyMapping = {'48': 0,'49': 1,'50':2,'51': 3,'52': 4,'53':5,'54': 6,'55':7,'56':8,'57':9,
                    '96':0, '97': 1,'98':2,'99': 3,'100': 4,'101':5,'102': 6,'103':7,'104':8,'105':9, 
                '106': '*', '107': '+', '109': '-', '111': '/', '173': '-'} 