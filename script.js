//Get the DOM Elements
const displayPassword = document.getElementById('display');
const lengthElem = document.getElementById('length');
const numbersElem = document.getElementById('numbers');
const uppercaseElem = document.getElementById('uppercase');
const lowercaseElem = document.getElementById('lowercase');
const symbolElem = document.getElementById('symbols');
const generatePass = document.getElementById('generate-password');
const clipboardBtn = document.getElementById('copy');


const raFun = {
    number: getTheNumbers,
    upper: getUpperLetter,
    lower: getLowerLetter,
    symbol: getTheSymbols

}

clipboardBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const password = displayPassword.innerText

    if (!password) { return }

    textarea.value = password
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard.')

})

generatePass.addEventListener('click', () => {
    const length = +lengthElem.value;
    const chNumber = numbersElem.checked;
    const chUpper = uppercaseElem.checked;
    const chLower = lowercaseElem.checked;
    const chSymbol = symbolElem.checked;

    displayPassword.innerText = generatePassword(chNumber, chUpper, chLower, chSymbol, length)
})

function generatePassword(number, upper, lower, symbol, length) {

    generatedPassword = ''
    const typesCount = number + upper + lower + symbol
    //console.log(typesCount)
    const typesArr = [{ number }, { upper }, { lower }, { symbol }].filter(item => Object.values(item)[0])
    // console.log(typesArr)

    if (typesCount === 0) {
        return ''
    }
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            //console.log(funcName)
            generatedPassword += raFun[funcName]()
        })
    }
    const finalPassword = generatedPassword.slice(0, length)
    return finalPassword
}
// Get the Numbers

function getTheNumbers() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
// console.log(getTheNumbers())

// Get the Lower Letters

function getLowerLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
// console.log(getLowerLetter());

// Get the Upper Letters

function getUpperLetter() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
// console.log(getUpperLetter())

// Get the Symbols

function getTheSymbols() {
    const symbols = '!#$%&()*+,-./:;<=>?@[\]^_{|}~';
    return symbols[Math.floor(Math.random() * symbols.length)]
}
