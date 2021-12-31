// time is minutes since start of day
// days is array of days of the week, starting with 0 as sunday
const schedule = [
  {time: 600, days: [0,1,2,3,4,5,6], text: "Example"}
];

function calculateTime(){
  var d = new Date();
  return Math.floor(((d.getTime() - (d.getTimezoneOffset() * 60000)) % (1000 * 60 * 60 * 24)) / 60000);
}

function findItems(){
  var d = new Date().getDay();
  var r = [];
  for(var i = 0;i < schedule.length;i++){
    if(schedule[i].days.includes(d)){
      r.push(schedule[i]);
    }
  }
  delete d;
  return r;
}

function toHoursIfNeeded(m){
  if(m > 59){
    return Math.floor(m / 60) + " hours";
  }else if(m == 1){
    return "1 minute";
  }else{
    return m + " minutes";
  }
}

function findItem(items){
  var lowest = null;
  var lowValue = 1500;
  for(var i = 0;i < items.length;i++){
    if(items[i].time > calculateTime() && items[i].time < lowValue){
      lowest = items[i];
      lowValue = lowest.time;
    }
  }
  delete lowValue;
  return lowest;
}

function tick(){
  g.clear();
  g.reset();
  var e = findItem(findItems());
  g.setFont("6x8",3);
  g.setFontAlign(0,0);
  g.drawString("Schedule", g.getWidth()/2, 40);
  g.setFont("6x8",2);
  if(e){
    g.drawString(e.text, g.getWidth()/2, g.getHeight()/2);
    g.drawString("in " + toHoursIfNeeded(e.time - calculateTime()), g.getWidth()/2, (g.getHeight()/2) + 20);
  }else{
    g.drawString("No events", g.getWidth()/2, g.getHeight()/2);
  }
  Bangle.loadWidgets();
  Bangle.drawWidgets();
  delete e;
}
var interval = setInterval(tick, 10000);
Bangle.on('lcdPower',on=>{
  if (interval){
    clearInterval(interval);
  }
  interval = undefined;
  if (on) {
    interval = setInterval(tick, 10000);
    tick(); // draw immediately
  }
});
tick();

setWatch(Bangle.showLauncher, BTN2, { repeat: false, edge: "falling" });
