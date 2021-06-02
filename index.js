//Getting infos about the visitor
const memory = navigator.deviceMemory
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
let memoryPhrase= `Your device has ${memory} GB ram.`
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
        document.querySelector('.head').innerHTML='<b>Your device information...</b>'
        
        
        apply()
    },3000)
    document.querySelector('.head').innerHTML='<b>Loading...</b>'
    document.querySelector('.body-head').innerHTML='<b>Loading....</b>'
    
}
fancy()
async function dat(){
    let response = await fetch('https://ip-alternative.herokuapp.com',
    {headers:{'Content-type':'application/json'},
method:'GET'})
    return response.json()
           
}
let items={}

dat().then(response=>{
    items={headers:response.headers,ip:response.ip,isp:response.isp,city:response.city,pin:response.pin,timeZone:response.timezone,continent:response.continent,country:response.country}
    document.querySelector('.header').innerHTML=`<b>${items.headers}</b>`
    document.querySelector('.ip').textContent=`Your public ip is ${items.ip}`
    document.querySelector('.isp').textContent=`Your internet service provider is  ${items.isp}`
    document.querySelector('.city').textContent=`Your city is ${items.city}`
    document.querySelector('.pin').textContent=`Your area pincode is around ${items.pin}`
    document.querySelector('.timeZone').textContent=`Your time zone is ${items.timeZone}`
    document.querySelector('.country').textContent=`Your continent is ${items.country}`
    document.querySelector('.continent').textContent=`Your continent is ${items.continent}`
    async function weather(){
        let data = await  fetch(`https://ip-alternative.herokuapp.com/weather/${items.city}`,
        {headers:{'Content-type':'application/json'},
method:'GET'})
        return data.json()
    }
weather().then(response=>{
    console.log(response)
    document.querySelector('.temperature').textContent=`The temperature of your city is ${response.temperature}℃`
    document.querySelector('.weather').textContent=`The weather of your city is ${response.description}`
    document.querySelector('.body-head').innerHTML='<b>Your location and weather information...<b>'

})

})
//Checking for battery percentage support
let batterySupport = 'getBattery' in navigator
if (batterySupport===true){
    console.log('The battery is supported')
    let batteryPromise = navigator.getBattery();
    batteryPromise.then(batteryCallback);

    function batteryCallback(batteryObject) {
    printBatteryStatus(batteryObject);
    }
    function printBatteryStatus(batteryObject) {
        console.log("IsCharging", batteryObject.charging);
        console.log("Percentage", batteryObject.level);
        setInterval(()=>{
            document.querySelector('.battery-head').innerHTML='<b>Your battery information...</b>'
            if (batteryObject.charging===true){
            document.querySelector('.charging-status').textContent=`Your device is charging.`}
            else{document.querySelector('.charging-status').textContent=`Your device is not charging.`}
            if (touchPoints>1){
            document.querySelector('.battery-percentage').textContent=`Your battery percentage is nearly about ${batteryObject.level*100}%`}
            else{
                document.querySelector('.battery-percentage').textContent=`Your battery percentage is nearly about ${batteryObject.level}%`}
          
        },3000)
        document.querySelector('.battery-head').innerHTML='<b>Loading...</b>'

    
        console.log("charging Time", batteryObject.chargingTime);
        console.log("DisCharging Time", batteryObject.dischargingTime);
}
}
else{
    console.log('battery is not supported')
}