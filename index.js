//Getting infos about the visitor
const memory = navigator.memory
const touchPoints = navigator.maxTouchPoints
const platfrom = navigator.platform
const cores = navigator.hardwareConcurrency
let visits= localStorage.getItem('visits')
const language=navigator.language
const color= screen.colorDepth
const width = screen.width
const height = screen.height
//Setting the value of visits
if (visits===0 || visits===undefined || visits===null){
    localStorage.setItem('visits',1)}
else{
    let inValue=localStorage.getItem('visits')
    inValue++
    localStorage.setItem('visits',inValue)}
visits=localStorage.getItem('visits')
//Setting the phrases
let coresPhrase=`Your device has ${cores} cores.`
let visitPhrase = `You have visited this website ${visits} time(s).`
let memoryPhrase= `Your device has ${memory} ram.`
let touchPhrase
if (touchPoints>1){ touchPhrase = `You device has touch screen support.`}
else { touchPhrase=`Your device does not support touch screen.`}
let platformPhrase=`You are on ${platfrom} platform.`
let languagePhrase = `Your device language is ${language}.`
let colorDepthPhras = `Your device's color depth is ${color}.`
let dimensions = `Your device's dimensions are ${height}x${width}`
//Displaying the phrasaes
function apply(){
    document.querySelector('.memory').textContent=memoryPhrase
    document.querySelector('.touch').textContent=touchPhrase
    document.querySelector('.platform').textContent=platformPhrase
    document.querySelector('.cores').textContent=coresPhrase
    document.querySelector('.language').textContent=languagePhrase
    document.querySelector('.colorDepth').textContent=colorDepthPhras
    document.querySelector('.dimensions').textContent=dimensions
    document.querySelector('.visits').textContent=visitPhrase
    document.querySelector('.timeZone').textContent=`The time of your area as per the internet is '${new Date()}'.`

}
function fancy(){
    setInterval(()=>{
        document.querySelector('.head').textContent='Your device information.'
        
        apply()
        fetch()
    },3)
    document.querySelector('.head').textContent='Loading...'
    
}
fancy()
async function fetch(){
    let xhr = new XMLHttpRequest
    xhr.open('GET','https://ip-alternative.herokuapp.com/',true)
    xhr.onload=function (){
        let a = JSON.parse(this.responseText)
        document.querySelector('.ip').textContent=`Your public ip address is ${a.ip}.`
        document.querySelector('.isp').textContent=`Your Internet Service Provider is ${a.isp}.`
        document.querySelector('.city').textContent=`Your city is ${a.city}.`
        document.querySelector('.continent').textContent=`Your continent is  ${a.continent}.`
        document.querySelector('.pin').textContent=`Your pin is around ${a.pin}.`
        document.querySelector('.country').textContent=`Your country is ${a.country}.`
        document.querySelector('.header').textContent=`Your browser's header is ${a.headers}.`
        document.querySelector('.timezone').textContent=`Your timezone is ${a.timezone}`
    }
    xhr.send()
}
