// The delay between fading in each DOM with the "hidden" class in milliseconds
const defaultAnimationDelay = 500;

const username = 'OliverAbdulrahim';
const messagesJSON = 'resources/data/messages.json';

function fadeInHiddenDOMs(delay) {
    $(window).bind('load', function() {
        $('.hidden').each(function(i) {
            var $hiddenElement = $(this);
            setTimeout(function() {
                $hiddenElement.addClass('animated fadeInDown');
                $hiddenElement.removeClass('hidden');
            }, delay * i);
        });
    });
}

function loadSidebarTo(target) {
    $(function() {
        $(target).load('resources/sidebar.html');
    });
}

function loadProjectsTo(target) {
    $(document).ready(function() {
        $(target).loadRepositories(username);
    });
}

function loadGitHubActivityTo(target) {
    $(document).ready(function() {
        GitHubActivity.feed({
            username: username,
            selector: target,
            limit: 10
        });
    });
}

function loadShuffleTextTo(target) {
    $(document).ready(function() {
        loadMessagesFromJSON();
        var shuffle = $(target);
        shuffle.click(function() {
            shuffle.shuffleLetters({
                'text': randomUniqueMessage(),
                'step': 6,
                'fps' : 25
            });
        });
    });
}

var messagesFromJSON;
var dynamicMessages;

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
    xobj.overrideMimeType('application/json');
    xobj.open('GET', source, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == '200') {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}
