chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    var ret = {};
    try {
        ret.result = core[request.cmd](request);
    } catch(err){
        ret.result = false;
        ret.message = err;
    }
    sendResponse(ret);
  }); 
