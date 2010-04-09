var ui = new function(){};

ui.newCmd = function(){
    var sort = $("#sortable");
    var cmd = document.createElement('li');
    cmd.className = "ui-state-default";
    cmd.style.width = "290px";
    cmd.innerHTML = "click";
    cmd.addEventListener("dblclick", doClick, false);
    sort.append(cmd);
};
