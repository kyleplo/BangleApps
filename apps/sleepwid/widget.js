(function(){
  Bangle.on("lock", function(on) {
    if(Bangle.isLocked()){
      load("sleep.app.js");
    }
  });
  WIDGETS.sleep={area:"tl",width:0,draw:function(w){}};
})();
