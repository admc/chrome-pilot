var ui = new function(){};

ui.showOpts = function(e){
    var d = document.createElement('div');
    d.id = "option";
    d.title = "Configure Command";
    document.body.appendChild(d);
    $(d).dialog({height:430, width:320});
    
    var m = document.createElement('div');
    m.innerHTML = "<b>Meta</b>: ";
    d.appendChild(m);

    var i = document.createElement('input');
    i.type = "text";
    i.id = "meta";
    i.size = "38";
    i.style.fontSize = "11px";
    if (e.target.meta){ i.value = e.target.meta; }
    d.appendChild(i);

    var codeHead = document.createElement('div');
    codeHead.innerHTML = "<b>Code</b>:";
    d.appendChild(codeHead);

    var ed = document.getElementById('editor');
    ed.style.height = "250px";
    ed.style.width = "270px";
    d.appendChild(ed);
    ed.bespin.dimensionsChanged();
    
    if (e.target.code){
        ed.bespin.value = e.target.code;
    }
    
    var br = document.createElement('br');
    d.appendChild(br);

    var c = document.createElement('center');
 
    var r = document.createElement('button');
    r.innerHTML = "Run";
    r.addEventListener("click", function(evt){ dispatch({source: ed.bespin.value, evt: e}); }, false);
    c.appendChild(r);
    
    var s = document.createElement('button');
    s.innerHTML = "Save";
    s.addEventListener("click", function(evt){ 
        e.target.code = ed.bespin.value;
        e.target.meta = i.value;
        e.target.innerHTML = i.value;
        $(d).dialog('close');
    }, false);

    c.appendChild(s);
    d.appendChild(c);
};

ui.newCmd = function(){
    var sort = $("#sortable");
    var cmd = document.createElement('li');
    cmd.className = "ui-state-default";
    cmd.style.width = "290px";
    cmd.innerHTML = "click to configure";
    //cmd.addEventListener("dblclick", doClick, false);
    cmd.addEventListener("dblclick", ui.showOpts, false);
    sort.append(cmd);
};
