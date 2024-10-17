console.log("balakraj");

const inputSlider = document.querySelector("[data-length-slider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercse");
const numberCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn  = document.querySelector(".generateButton");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const Symbols = `~!@#$%^&*())_+/'[?"`;

//initially
let password = "";
let passwordLength = 15;  
let checkCount = 0;
handleSlider();
//set strength circle color to grey 



//set passwordlength 
function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;  
    //or kuch bhi karna chahiye ? 

}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    //shadow  
    
}

function getRndInteger(min,max) {
    return Math.floor(Math.random () * (max - min)) + min;
}

function generatRandomNumber() {
    return getRndInteger(0,9);


}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))

}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))

}

function generateSymbol() {
    const randNum = getRndInteger(0,Symbol.length);
    return Symbols.charAt(randNum) ;



} 
 
 
function calcStrength() {

    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (uppercaseCheck.checked) hasLower = true;
    if (lowercaseCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;

    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        setIndicator("#0f0") ;

    } else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym ) &&
        passwordLength >= 6
    ) {
        setIndicator("#ff0");


    } else {
        setIndicator("#f00");

    }

}


async function copyContent() {
    try {
        console.log(passwordDisplay.value)
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText =  "coppied" ;

    }
    catch(e) {
        console.log(e)
        copyMsg.innerText = "Failed";

    }
    //to make copy wala span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");

    },2000);

}

function shufflepassword(array) {

    // Fisher yates method or algorithm

    for (let i = array.length - 1; i>0; i--) {
        // random j, find out using random fucntion
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
         array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el) => (str += el));
    return str;


}

 
function handleCheckBoxChange() {
    checkCount = 0;
    allCheckbox.forEach ( (checkbox) => {
        if(checkbox.checked)
            checkCount++;

    });

    //special condition
    if(passwordLength < checkCount ) {
        passwordLength = checkCount;
        handleSlider();

    }



}

allCheckbox.forEach ((checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);

})


//e.target => event target 
inputSlider.addEventListener('input',(e) => {
    passwordLength = e.target.value;
    handleSlider();


})


copyBtn.addEventListener('click',() => {
    if(passwordDisplay.value)
        copyContent();

})


generateBtn.addEventListener('click', () => {
    //none of the checkbox are select 
    if(checkCount == 0 ) return;
    

    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();

    }



    //let's start the jouney to find new password 



    console.log("starting the journey");

    //remove old password 
    password = "";

    //let's put the stuff mentioned by checkboxes 

    // if (uppercaseCheck.checked) {
    //     password += generateUpperCase();

    // }

    // if (lowercaseCheck.checked) {
    //     password += generateLowerCase();

    // }

    // if (numberCheck.checked) {
    //     password += generatRandomNumber();

    // }

    // if (symbolsCheck.checked) {
    //     password += generateSymbol();

    // }  
    

    let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numberCheck.checked)
        funcArr.push(generatRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    console.log(funcArr)
    //compulsory addition 
    for( let i=0; i<funcArr.length; i++ ) {
        password += funcArr[i] ();

    }
    console.log("Compulsary addition done ");
    

    //remaining addition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0, funcArr.length);
        console.log("randIndex " + randIndex); 
        password += funcArr[randIndex]();

    }
    console.log("remaining addition done")


    //stuffle the password   
    password = shufflepassword(Array.from(password));
    console.log("shuffling done");


    //show in UI 
    passwordDisplay.value = password;
    console.log("UI addition done");

    //calculate strength 
    calcStrength();


    
});


    



 


