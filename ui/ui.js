var ui = new function(){};

ui.showOpts = function(e){
    var d = document.createElement('div');
    d.id = "option";
    d.title = "Configure Command";
    document.body.appendChild(d);
    $(d).dialog({height:430, width:320, resizable: false});
    
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
    i.focus();

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
    
    //save button 
    var s = document.createElement('button');
    s.innerHTML = "Save";
    s.addEventListener("click", function(evt){
        e.target.code = ed.bespin.value;
        e.target.meta = i.value;
        e.target.innerHTML = i.value;
        if (i.value.length > 28){
            e.target.innerHTML = i.value.substr(0, 28) + "..";
        }
        else {
            e.target.innerHTML = i.value;
        }
        
        var num = ui.getNum(e);
        var cmds = JSON.parse(localStorage.getItem("cp-cmds"));
        
        //if its not in the list
        if (num == null){
            cmds.push({"meta": e.target.meta, "code": e.target.code});
        }
        else {
            cmds[num] = {"meta": e.target.meta, "code": e.target.code};
        }

        //Save back the localStorage
        localStorage.setItem("cp-cmds", JSON.stringify(cmds));
        $(d).dialog('close');
    }, false);

    c.appendChild(s);
    
    var del = document.createElement('button');
    del.innerHTML = "Delete";
    del.addEventListener("click", function(evt){
        var num = ui.getNum(e);
        if (num != null){
            var cmds = JSON.parse(localStorage.getItem("cp-cmds"));
            cmds.splice(num, 1);
            localStorage.setItem("cp-cmds", JSON.stringify(cmds));
            $("#sortable")[0].removeChild(e.target);
            $(d).dialog('close');
        }
     }, false);

    c.appendChild(del);
    d.appendChild(c);
};

ui.getNum = function(e){
    //iterate through the commands
    //and find its index in the list
    var children = $("#sortable").children();
    var num = null;
    for (var z = 0; z < children.length; z++){
        if (children[z] == e.target){ num = z; }
    }
    return num;
};

ui.play = function(){
    var children = $("#sortable").children();
    for (var i = 0; i < children.length; i++){
        children[i].style.border = "";
        var code = children[i].code;
        var e = {};
        e.target = children[i];
        dispatch({source: code, evt: e});
    }
};

ui.getCmdDOM = function(){
    var cmd = document.createElement('li');
    cmd.className = "ui-state-default";
    cmd.style.width = "290px";
    return cmd;
};

ui.newCmd = function(){
    var sort = $("#sortable");
    var cmd = ui.getCmdDOM();       
    cmd.innerHTML = "click to configure";
    var ed = document.getElementById('editor');
    ed.bespin.value = "";
    cmd.addEventListener("dblclick", ui.showOpts, false);
    sort.append(cmd);
};

ui.addCmd = function(obj){
    var sort = $("#sortable");
    var cmd = ui.getCmdDOM();
    if (obj.meta.length > 28){
        cmd.innerHTML = obj.meta.substr(0, 28) + "..";
    }
    else {
        cmd.innerHTML = obj.meta;
    }
    cmd.meta = obj.meta;
    cmd.code = obj.code;
    cmd.addEventListener("dblclick", ui.showOpts, false);
    sort.append(cmd);
};
