var run = function(obj){
  var evt = obj.evt;
  delete(obj.evt);
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, obj, function(response) {
        //alert(response.result);
        if (response.result){
           evt.target.style.border = "2px solid green"; 
        } else {
           evt.target.style.border = "2px solid red";
           $("#log")[0].innerHTML = obj.cmd + ": " + response.message + "<br>"; 
        }
    });
  }); 
};

var doClick = function(e){
    var obj = {};
    obj.cmd = "click";
    obj.loc = {name:"btnG"};
    obj.evt = e;
    run(obj);
};

var dispatch = function(obj){
  var source = obj.source;
  var evt = obj.evt;
  delete(obj.evt);
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendRequest(tab.id, {"source":source}, function(response) {
        if (response.result){
           evt.target.style.border = "2px solid green"; 
        } else {
           evt.target.style.border = "2px solid red";
           $("#log")[0].innerHTML = response.message + "<br>"; 
        }
    });
  }); 

};
