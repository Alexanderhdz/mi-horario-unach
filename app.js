const data={
"Lunes":[
["09:00–10:00","INVESTIGACION DE OPERACIONES","ZUÑIGA CULEBRO ROBERTO"],
["10:00–11:00","CALIDAD EN LOS PROCESOS DE DESARROLLO DE SOFTWARE","LOPEZ AGUILAR ROSA ISELA, MTRA."],
["11:00–13:00","TRADUCTORES DE BAJO NIVEL","LORENZO IGNACIO MAIDANA, MTRO."],
["13:00–15:00","TALLER DE DESARROLLO 3","MALDONADO PEREZ JUAN RODRIGO"]
],
"Martes":[
["08:00–09:00","PRACTICA PROFESIONAL 1","CANCINO PASCACIO FERNANDO, DR."],
["09:00–10:00","FUNDAMENTOS DE REDES","BERMUDEZ LAZOS JORGE ANTONIO, DR."],
["10:00–11:00","TEORIA MATEMATICA DE LA COMPUTACION","LOPEZ AGUILAR ROSA ISELA, MTRA."],
["11:00–13:00","CALIDAD EN LOS PROCESOS DE DESARROLLO DE SOFTWARE","LOPEZ AGUILAR ROSA ISELA, MTRA."],
["13:00–14:00","TALLER DE DESARROLLO 3","MALDONADO PEREZ JUAN RODRIGO"]
],
"Miércoles":[
["08:00–09:00","INVESTIGACION DE OPERACIONES","ZUÑIGA CULEBRO ROBERTO"],
["09:00–10:00","PRACTICA PROFESIONAL 1","CANCINO PASCACIO FERNANDO, DR."],
["10:00–12:00","FUNDAMENTOS DE REDES","BERMUDEZ LAZOS JORGE ANTONIO, DR."],
["12:00–14:00","TEORIA MATEMATICA DE LA COMPUTACION","LOPEZ AGUILAR ROSA ISELA, MTRA."]
],
"Jueves":[
["08:00–10:00","INVESTIGACION DE OPERACIONES","ZUÑIGA CULEBRO ROBERTO"],
["10:00–11:00","CALIDAD EN LOS PROCESOS DE DESARROLLO DE SOFTWARE","LOPEZ AGUILAR ROSA ISELA, MTRA."],
["11:00–12:00","TRADUCTORES DE BAJO NIVEL","LORENZO IGNACIO MAIDANA, MTRO."],
["12:00–13:00","TEORIA MATEMATICA DE LA COMPUTACION","LOPEZ AGUILAR ROSA ISELA, MTRA."],
["13:00–15:00","TOPICOS AVANZADOS DE BASES DE DATOS","ZACARIAS SANTOS JESUS ARNULFO, MCC"]
],
"Viernes":[
["07:00–09:00","TOPICOS AVANZADOS DE BASES DE DATOS","ZACARIAS SANTOS JESUS ARNULFO, MCC"],
["09:00–10:00","PRACTICA PROFESIONAL 1","CANCINO PASCACIO FERNANDO, DR."],
["10:00–11:00","FUNDAMENTOS DE REDES","BERMUDEZ LAZOS JORGE ANTONIO, DR."],
["11:00–12:00","INVESTIGACION DE OPERACIONES","ZUÑIGA CULEBRO ROBERTO"],
["12:00–13:00","TEORIA MATEMATICA DE LA COMPUTACION","LOPEZ AGUILAR ROSA ISELA, MTRA."],
["13:00–14:00","TRADUCTORES DE BAJO NIVEL","LORENZO IGNACIO MAIDANA, MTRO."],
["14:00–15:00","TALLER DE DESARROLLO 3","MALDONADO PEREZ JUAN RODRIGO"]
],
" Sábado":[],"Domingo":[]
};
const dayNames=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
const daysEl=document.querySelector("#days"), schedule=document.querySelector("#schedule");
let currentDay=dayNames[new Date().getDay()-1]||"Lunes";
if(new Date().getDay()===0) currentDay="Domingo";
dayNames.forEach(day=>{
 const b=document.createElement("button"); b.className="day"; b.textContent=day;
 b.onclick=()=>showDay(day); b.dataset.day=day; daysEl.appendChild(b);
});
function showDay(day){
 currentDay=day;
 document.querySelectorAll(".day").forEach(b=>b.classList.toggle("active",b.dataset.day===day));
 const items=data[day]||[];
 schedule.innerHTML=items.length?items.map((x,i)=>`<article class="card" data-i="${i}">
   <div class="time">${x[0]}</div><div class="subject">${x[1]}</div><div class="teacher">${x[2]}</div>
 </article>`).join(""):`<div class="empty">No tienes clases este día 🎉</div>`;
 document.querySelectorAll(".card").forEach(c=>c.onclick=()=>openModal(items[+c.dataset.i]));
}
function openModal(x){
 if(!x)return;
 document.querySelector("#modalContent").innerHTML=`<h2>${x[1]}</h2><p class="detail"><b>Horario:</b> ${x[0]}</p><p class="detail"><b>Profesor:</b> ${x[2]}</p>`;
 document.querySelector("#modal").classList.remove("hidden");
}
document.querySelector("#closeModal").onclick=()=>document.querySelector("#modal").classList.add("hidden");
document.querySelector("#modal").onclick=e=>{if(e.target.id==="modal")e.currentTarget.classList.add("hidden")};

let deferredPrompt;
const installBtn=document.querySelector("#installBtn");
window.addEventListener("beforeinstallprompt",e=>{
 e.preventDefault(); deferredPrompt=e; installBtn.classList.remove("hidden");
});
installBtn.onclick=async()=>{
 if(!deferredPrompt)return;
 deferredPrompt.prompt();
 await deferredPrompt.userChoice;
 deferredPrompt=null;
 installBtn.classList.add("hidden");
};
window.addEventListener("appinstalled",()=>installBtn.classList.add("hidden"));
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));

showDay(currentDay);
