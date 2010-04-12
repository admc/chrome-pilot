//Translates from the way we are passing objects to functions to the lookups
var lookupNode = function (paramObject, scroll){
  
  var s = null;
  var element = null;
  
  //If a link was passed, lookup as link
  if(typeof paramObject.link != "undefined") {
    s = 'Looking up link '+ paramObject.link;
    element = elementslib.Element.LINK(paramObject.link);
  }
  //if xpath was passed, lookup as xpath
  else if(typeof paramObject.xpath != "undefined") {
    s = 'Looking up xpath '+ paramObject.xpath;        
    element = elementslib.Element.XPATH(paramObject.xpath);
  }
  //if id was passed, do as such
  else if(typeof paramObject.id != "undefined") {
    s = 'Looking up id '+ paramObject.id;
    element = elementslib.Element.ID(paramObject.id);
  }
  //if jsid was passed
  else if(typeof paramObject.jsid != "undefined") {
    //Here if the user hasn't specified the test window scope
    //we use the default and prepend it, else we eval whatever js they passed
    var jsid = window.eval(paramObject.jsid);
    //eval("jsid=" + paramObject.jsid + ";");
    s = 'Looking up jsid '+ jsid;
    element = elementslib.Element.ID(jsid);
  }
  //if name was passed
  else if(typeof paramObject.name != "undefined") {
    s = 'Looking up name '+ paramObject.name;
    element = elementslib.Element.NAME(paramObject.name);
  }
  //if value was passed
  else if(typeof paramObject.value != "undefined") {
    s = 'Looking up value '+ paramObject.value;
    element = elementslib.Element.VALUE(paramObject.value);
  }
  //if classname was passed
  else if(typeof paramObject.classname != "undefined") {
    s = 'Looking up classname '+ paramObject.classname;
    element = elementslib.Element.CLASSNAME(paramObject.classname);
  }
  //if tagname was passed
  else if(typeof paramObject.tagname != "undefined") {
    s = 'Looking up tagname '+ paramObject.tagname;
    element = elementslib.Element.TAGNAME(paramObject.tagname);
  }
  //if label was passed
  else if(typeof paramObject.label != "undefined") {
    s = 'Looking up label '+ paramObject.label;
    element = elementslib.Element.LABEL(paramObject.label);
  }
  //if jquery was passed
  else if(typeof paramObject.jquery != "undefined") {
    s = 'Looking up jquery selector '+ paramObject.jquery;
    paramObject.jquery = replaceAll(paramObject.jquery, ").", ")<*>");
    var jQ = jQuery(window.document);
    var chain= paramObject.jquery.split('||');
    
    paramObject.jquery = replaceAll(paramObject.jquery, "<*>", ".");
    var start = eval('jQ.find'+chain[0]);
    var theRest = paramObject.jquery.replace(chain[0],'');
    element = eval('start'+theRest);
  }
  else if(typeof paramObject.jqueryframe != "undefined" && typeof paramObject.frameid != "undefined") {
    s = 'Looking up jqueryframe selector '+paramObject.jqueryframe;
    paramObject.jqueryframe = replaceAll(paramObject.jqueryframe, ").", ")<*>");
    var jQ = jQuery(window.document.getElementById(paramObject.frameid).contentWindow.document)
    var chain= paramObject.jqueryframe.split('<*>');
    paramObject.jqueryframe = replaceAll(paramObject.jqueryframe, "<*>", ".");
    var start = eval('jQ.find'+chain[0]);
    var theRest = paramObject.jqueryframe.replace(chain[0],'');
    element = eval('start'+theRest);
  }
  else if(typeof paramObject.string != "undefined"){
  	s = "Looking up nodes containing text "+ paramObject.string;
    var nodes = jQuery(window.document.body).find("*:contains('"+paramObject.string+"')");
		element = nodes[nodes.length - 1];
	}
  else if(typeof paramObject.rteID != "undefined"){
    s = 'Looking up rte selector '+ paramObject.rte;
    element = lookupNode({id:paramObject.rteID}).contentWindow.document.body; 
  }
  else {
    return false;
  }
  //scroll so that the element is in view
  if (element) { 
    //if the element you accessed is a flash object
    //the scroll into view will actually fail and 
    //throw a crazy DOM exception
    if (scroll != false){
      try {
        element.scrollIntoView(); 
      } catch(err){}
    }
    return element;
  }
  else { throw s + ", failed."; }
};

//shortcut
var ln = lookupNode;
