var core = new function(){};

core.click = function(node){
    events.triggerMouseEvent(node, 'click', true); 
    return true;
};

core.type = function(node, text){
   //clear the box
   node.value = '';
   //Get the focus on to the item to be typed in, or selected
   events.triggerEvent(node, 'focus', false);
   events.triggerEvent(node, 'select', true);
    
   //Make sure text fits in the textbox
   var maxLengthAttr = node.getAttribute("maxLength");
   var actualValue = text;
   var stringValue = text;
    
   if (maxLengthAttr != null) {
     var maxLength = parseInt(maxLengthAttr);
     if (stringValue.length > maxLength) {
       //truncate it to fit
       actualValue = stringValue.substr(0, maxLength);
     }
   }
   
   var s = actualValue;
   for (var c = 0; c < s.length; c++){
     events.triggerKeyEvent(node, 'keydown', s.charAt(c), true, false,false, false,false);
     events.triggerKeyEvent(node, 'keypress', s.charAt(c), true, false,false, false,false); 
     if (s.charAt(c) == "."){
       node.value += s.charAt(c);
     }
     events.triggerKeyEvent(node, 'keyup', s.charAt(c), true, false,false, false,false);
   }
    
   if (node.value != s){
     node.value = s;
   }

   // DGF this used to be skipped in chrome URLs, but no longer.  Is xpcnativewrappers to blame?
   //Another wierd chrome thing?
   events.triggerEvent(node, 'change', true);
   return true;
};
