var core = new function(){};

core.click = function(req){
    var node = lookupNode(req.loc);
    events.triggerMouseEvent(element, 'click', true); 
    return true;
}
