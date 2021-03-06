// services.console.logStringMessage()

function hscroll(task, unit, number)
{
    content.document.getElementById(task + '.form_scroll').focus();
    buffer.scrollHorizontal(unit, number);
}

function vscroll(task, unit, number)
{
    content.document.getElementById(task + '.form_scroll').focus();
    buffer.scrollVertical(unit, number);
}

function pscroll(task, h, v)
{
    content.document.getElementById(task + '.form_scroll').focus();
    buffer.scrollToPercent(h, v);
}

function _findbutton(doc, task, button)
{
    var table = doc.getElementById(task + '.form_header').firstChild;
    var span = table.firstChild.firstChild.childNodes[1].childNodes[2];
    // Find header table among a variable number of scripts
    for (var i = 0; i < span.firstChild.childNodes.length; i++) {
        if (span.firstChild.childNodes[i].nodeName == 'TABLE') {
            var table = span.firstChild.childNodes[i];
            break;
        }
    }
    // Find Save button
    var bs = table.firstChild.childNodes[1].childNodes[2].firstChild.childNodes;
    var button;
    for (var i = 0; i < bs.length; i++) {
        if (bs[i].nodeName == 'BUTTON') {
            if (bs[i].firstChild.innerHTML == button) {
                return bs[i];
            }
        }
    }
}

function save(task)
{
    var doc = content.document;
    var button = _findbutton(doc, task, 'Save');
    if (button) {
        button.click();
    } else {
        throw "Couldn't find 'Save' button";
    }
}

function take(task)
{
    var doc = content.document;
    var button = _findbutton(doc, task, 'Take in progress');
    if (button) {
        button.click();
    } else {
        throw "Couldn't find 'Take in progress' button";
    }
}

function close(task)
{
    var doc = content.document;

    // Set close code
    function setclosecode(doc, task)
    {
        var select = doc.getElementById(task + '.u_close_code');
        select.selectedIndex = 1;
        select.onchange();
    }

    textarea = doc.getElementById(task + '.comments');

    if (task == 'incident') {
        // Change state to Resolved
        _setstate(doc, task, 9);
        setclosecode(doc, task);
        textarea.onchange();
    } else if (task == 'u_request_fulfillment') {
        var button;
        button = _findbutton(doc, task, 'Go to Fulfillment');
        if (button) {
            button.click();
        } else {
            _setstate(doc, task, 7);
            setclosecode(doc, task);
            textarea.onchange();
        }
    } else {
        throw "Dunno what task this is";
    }
}

function _setstate(doc, task, state)
{
    if (task == 'incident') {
        var select = doc.getElementById(task + '.incident_state');
    } else if (task == 'u_request_fulfillment') {
        var select = doc.getElementById(task + '.u_current_task_state');
    } else {
        throw "Dunno what task this is";
    }
    select.selectedIndex = state;
    select.onchange();
}

function wait(task)
{
    var doc = content.document;

    // Wait for user
    _setstate(doc, task, 2);
}

function edit(task)
{
    var doc = content.document;

    var textarea = doc.getElementById(task + '.comments');

    // Greet him
    if (!textarea.value) {
        // Maybe it's a GGUS ticket - try getting an external caller
        var i;
        i = doc.getElementById(task + '.u_external_caller');

        // Get caller's input
        if (task == 'incident') {
            var u = '.';
        } else if (task == 'u_request_fulfillment') {
            var u = '.u_';
        } else {
            throw "Dunno what task this is";
        }

        // Seems that external_caller element sometimes exists - value may not 
        if (!i || !i.value) {
            i = doc.getElementById('sys_display.' + task + u + 'caller_id');
        }

        // Only first name
        var firstname = i.value.split(' ')[0];

        textarea.value = 'Dear ' + firstname + ',';
    }

    // Start Vim and answer him
    buffer.focusElement(textarea); // JavaScript's focus() isn't enough
    editor.editFieldExternally();

    // Nudge comment to make SNOW notice it and accept closing it if needs be
    textarea.onchange();
}

function cursor(n)
{
    var doc = content.document;

    tbody = doc.getElementById('task_table').childNodes[1];
    tasks = tbody.childNodes;

    function highlight(taski)
    {
        tasks[taski].setAttribute('style', 'background-color:#eed68f');
        tasks[taski].setAttribute('class', 'list_row'); 
    }

    taski = tbody.getAttribute('taski');
    if (taski == null) {
        taski = 0;
        tbody.setAttribute('taski', taski);
        highlight(taski);
    } else {
        taski = parseInt(taski);

        if (taski + n >= 0 && taski  + n < tasks.length) {
            taski += n;
            tbody.setAttribute('taski', taski);

            if (taski % 2 == 0) {
                tasks[taski - n].setAttribute('class', 'list_row list_even'); 
            } else {
                tasks[taski - n].setAttribute('class', 'list_row list_odd'); 
            }

            highlight(taski);
        }
    }
}

function open()
{
    var doc = content.document;

    tbody = doc.getElementById('task_table').childNodes[1];
    tasks = tbody.childNodes;
    
    taski = tbody.getAttribute('taski');
    if (taski != null) {
        tds = tasks[parseInt(taski)].childNodes;
        for (var i = 0; i < tds.length; i++) {
            a = tds[i].firstChild
            if (a.nodeName == 'A') {
                href = a.getAttribute('href');
                isinc = href.slice(0, 11) == 'incident.do';
                isrrqf =  href.slice(0, 24) == 'u_request_fulfillment.do';
                if (isinc || isrrqf) {
                    buffer.followLink(a, dactyl.NEW_BACKGROUND_TAB);
                    break;
                }
            }
        }
    }
}
