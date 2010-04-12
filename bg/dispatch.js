chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    var ret = {};
    try {
        //get selenium core into the execution space as sel.*
        var bb = new BrowserBot(window);
        var sel = new Selenium(bb);
        //run it
        eval(request.source);
        ret.result = true;
    } catch(err){
        ret.result = false;
        ret.message = err;
    }
    sendResponse(ret);
  }); 
