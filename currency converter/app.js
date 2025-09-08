
const baseURL = "https://api.frankfurter.dev/v1";

const dropdown = document.querySelectorAll(".drop select");

const btn =document.querySelector("form button")

const fromcurr =document.querySelector(".from select")

const tocurr =document.querySelector(".to select ")




for (let select of dropdown){
    for (currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText=currcode;
        newoption.value=currcode;
        if(select.name==="from" && currcode=="USD"){
            newoption.selected="selected";
        }else if(select.name==="to" && currcode=="INR"){
            newoption.selected="selected";
        }
        select.append(newoption);
}
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })

}

updateExchangerate= async()=>{
    let amount = document.querySelector(".amount input");
    let amtval= amount.value;
    if (amtval ==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }


    //console.log(`${fromcurr.value}&symbols=${tocurr.value}`);
     const URL = `${baseURL}/latest?base=${fromcurr.value}&symbols=${tocurr.value}`;
     let response = await fetch(URL);
     let data = await response.json();
     console.log("Full API response:", data);
    let rate = data.rates[tocurr.value]; 
    let finalAmt= amount.value*rate;
    console.log(finalAmt);

    document.querySelector(".message").innerText = `${amtval} ${fromcurr.value} = ${finalAmt} ${tocurr.value}`;
 }

const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
    
}


btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangerate();

 });

window.addEventListener("load",()=>{
    updateExchangerate();

})


 

// // https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json


// btn.addEventListener("click", async (evt) => {
//   evt.preventDefault();

//   let amount = document.querySelector(".amount input");
//   let amtval = amount.value;

//   if (amtval === "" || amtval < 1) {
//     amtval = 1;
//     amount.value = "1";
//   }

//   const URL = `${baseURL}/convert?from=${fromcurr.value}&to=${tocurr.value}&amount=${amtval}`;
  
//   try {
//     console.log("Requesting:", URL);
//     console.log("From:", fromcurr.value, "To:", tocurr.value, "Amount:", amtval);

//     let response = await fetch(URL);
//     let data = await response.json();

//     console.log("Full API response:", data); // 👈 debug
//     console.log(`Converted Amount: ${data.result}`);

//     // ✅ Display result in webpage
//     
//   } catch (err) {
//     console.error("Error fetching conversion:", err);
//     document.querySelector(".msg").innerText = "Something went wrong!";
//   }
// });


 // ✅ Frankfurter base URL


// btn.addEventListener("click", async (evt) => {
//   evt.preventDefault();

//   let amount = document.querySelector(".amount input");
//   let amtval = amount.value;

//   if (amtval === "" || amtval < 1) {
//     amtval = 1;
//     amount.value = "1";
//   }

//   // ✅ Build Frankfurter API URL
  

//   try {
    
    

//     if (!data.rates || !data.rates[tocurr.value]) {
//       document.querySelector(".msg").innerText = "Invalid currency or API error!";
//       return;
//     }

//     // ✅ Multiply input amount by rate
//     const rate = data.rates[tocurr.value];
//     const converted = (amtval * rate).toFixed(2);

//     console.log(`${amtval} ${fromcurr.value} = ${converted} ${tocurr.value}`);

//     // ✅ Show in page
//     document.querySelector(".msg").innerText =
//       `${amtval} ${fromcurr.value} = ${converted} ${tocurr.value}`;
//   } catch (err) {
//     console.error("Error fetching conversion:", err);
//     document.querySelector(".msg").innerText = "Something went wrong!";
//   }
// });
