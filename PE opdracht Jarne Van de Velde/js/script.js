//Jarne Van de Velde - r0840636

document.getElementById("AlertGoed").hidden=true;
document.getElementById("AlertSlecht").hidden=true;
document.getElementById("AlertBetaling").hidden=true;
document.getElementById("btn1").hidden=true;
document.getElementById("btn").hidden=false;

let arrayError = [];

let voornaam = document.querySelector('#voornaam');
let naam = document.querySelector('#naam');
let gebruikersnaam = document.querySelector('#gebruikersnaam');
let email = document.querySelector('#email');
let adres = document.querySelector('#inputAddress');
let wachtwoord1 = document.querySelector('#wachtwoord1');
let wachtwoord2 = document.querySelector('#wachtwoord2');
let land = document.querySelector('#land');
let provincie = document.querySelector('#provincie');
let postcode = document.querySelector('#inputZip');

function ValideerForm(){
    checkEmptyField(voornaam.value,"Het veld voornaam is vereist.");
    checkEmptyField(naam.value,"Het veld naam is vereist.");
    checkEmptyField(gebruikersnaam.value,"Het veld gebruikersnaam is vereist.");
    checkEmptyField(email.value,"Het veld email is vereist.");
    if(validateEmail(email.value)==false){
        arrayError.push("E-mailaders is niet correct.")
     }
    checkEmptyField(adres.value,"adres is vereist.");
    checkEmptyField(wachtwoord1.value,"Het veld wachtwoord is vereist.");
    checkEmptyField(wachtwoord2.value,"Het veld herhaal wachtwoord is vereist.");
    if(wachtwoord1.value.length<8){
        arrayError.push("Je wachtwoord moet minimaal 8 karakters bevatten.")
    }
    if(wachtwoord1.value!=wachtwoord2.value){
        arrayError.push("Je wachtwoorden komen niet overeen.")
    }
    ValidateDropdown(land,"Land is vereist.");
    ValidateDropdown(provincie,"Provincie is vereist.")
    checkPC(postcode.value);
    if(!document.getElementById("gridCheck2").checked==true){
        arrayError.push("Je moet de algemene voorwaarden accepteren.")
    }
    Alert();
    if(arrayError.length==0){
        document.getElementById("btn").hidden=false;
        document.getElementById("btn1").hidden=true; 
    }
    else{
        document.getElementById("btn").hidden=true;
        document.getElementById("btn1").hidden=false;  
    }
    
}
function ResetValideerForm(){
    location.reload();
    document.getElementById("btn1").hidden=true;
    document.getElementById("btn").hidden=false;
}
function ValidateDropdown(veld,melding){
    if(veld.selectedIndex==0)
    {
      arrayError.push(melding)
    }
}

let checkEmptyField = (veld, melding) => {
    if(veld==""){
        arrayError.push(melding);
    }
    else{
        return arrayError;
    }
}

function Alert() {
    if (!arrayError.length==0) {
        document.getElementById("AlertSlecht").hidden=false;
            arrayError.forEach(element => {
                document.getElementById('array').innerHTML +=
                `<div>${element}\n</div>`;})
    } else {
        document.getElementById("AlertGoed").hidden=false;
        document.getElementById("AlertBetaling").hidden=false;
        if (document.querySelector('#gridRadios1').checked == true) {
            validatePayment("Banking app");
        } else if (document.querySelector('#gridRadios2').checked == true) {
            validatePayment("Overschrijving");
        } else if (document.querySelector('#gridRadios3').checked == true) {
            validatePayment("Visa card");
        } else if (document.querySelector('#gridRadios4').checked == true) {
            validatePayment("Paypal");
        } 
    }
}

const validatePayment = veld => {
    document.getElementById("keuze").innerHTML = `Je betalingwijze is ${veld}`;
};

const validateEmail = EmailAdress => {
    let controle = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return EmailAdress.match(controle) ? true : false;
};

const checkPC = veld => {
    if(veld==""){
        arrayError.push("postcode is vereist.");
    }
    if(veld<1000||veld>9999){
        arrayError.push("De waarde van postcode moet tussen 1000 en 9999 liggen.")
    }
};

