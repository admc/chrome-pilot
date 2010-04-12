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
           $("#log")[0].innerHTML += "<br>"+JSON.stringify(response.message) + "<br>"; 
        }
    });
  }); 

};
