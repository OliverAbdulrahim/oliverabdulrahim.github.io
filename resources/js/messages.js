var messagesFromJSON;
var dynamicMessages;

const messagesJSON = 'resources/data/messages.json';
loadMessagesFromJSON();

function randomUniqueMessage() {
    if (typeof dynamicMessages === 'undefined' || dynamicMessages.length == 0) {
        dynamicMessages = messagesFromJSON.slice();
    }
    // Can't remove and return with one method? :(
    var index = Math.floor(Math.random() * dynamicMessages.length);
    var element = dynamicMessages[index];
    dynamicMessages.splice(index, 1);
    return element;
}

function loadMessagesFromJSON() {
    loadJSON(messagesJSON, function(response) {
        messagesFromJSON = JSON.parse(response);
    });
}

function loadJSON(source, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', source, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
