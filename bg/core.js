var core = new function(){};

core.click = function(node){
    events.triggerMouseEvent(element, 'click', true); 
    return true;
}
