const API_KEY = "JYYGUUCGB4K9YAJQS2ZJM59VU";

const inputEl = document.getElementById("locationInput");
const goBtn = document.getElementById("goBtn");
const statusEl = document.getElementById("status");
const readoutEl = document.getElementById("readout");

async function fetchWeather(location){
  const url =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` +
    `${encodeURIComponent(location)}?unitGroup=us&key=${API_KEY}&contentType=json`;

  statusEl.textContent = "Loading weather…";
  const res = await fetch(url);
  if(!res.ok) throw new Error("Weather request failed");
  const data = await res.json();
  statusEl.textContent = "";
  return data;
}

function applyMood(current){
  const temp = current.temp; // °F
  let bg;

  if (temp <= 32) bg = "rgb(210, 230, 255)";       //light blue
  else if (temp <= 50) bg = "rgb(220, 245, 245)";  //light blue green
  else if (temp <= 68) bg = "rgb(235, 255, 220)";  //light green
  else if (temp <= 80) bg = "rgb(255, 245, 210)";  //light yellow
  else bg = "rgb(255, 220, 220)";                  //light pink

  document.documentElement.style.setProperty("--bg", bg);

  readoutEl.textContent =
`temp: ${temp}°F
conditions: ${current.conditions}`;
}

goBtn.addEventListener("click", async ()=>{
  try{
    const loc = inputEl.value.trim() || "New York";
    const data = await fetchWeather(loc);
    applyMood(data.currentConditions);
  }catch(err){
    statusEl.textContent = "Error: " + err.message;
  }
});

inputEl.addEventListener("keydown", (e)=>{
  if(e.key === "Enter") goBtn.click();
});