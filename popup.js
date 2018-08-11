function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}

var contactButton = document.getElementById("support");
var aboutButton = document.getElementById("about");

contactButton.addEventListener("click", function() {
    chrome.runtime.sendMessage({ email: 'support@andyls.co.uk' });
});

aboutButton.addEventListener("click", function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});

var chromeFeeds = [];

if (chrome.extension) {
    chromeFeeds = chrome.extension.getBackgroundPage().feeds;
} else {
    // Test feeds
    chromeFeeds = [
        "http://www.google.co.uk",
        "http://abc.xyz",
        "http://www.youtube.com"
    ];
}

window.addEventListener("load", function() {
    var feedList = document.getElementById("feeds");
    console.log("Getting...");
    var feeds = chromeFeeds;
    feedList.innerHTML = "";

    for (var i = 0; i < feeds.length; i++) {
        console.log("Feed: " + feeds[i]);

        var listItem = document.createElement("li");
        listItem.setAttribute("class", "rssLink");

        // var divText = document.createElement("div");
        // var divButton = document.createElement("div");

        var text = document.createElement("a");
        text.setAttribute("class", "rssUrl");
        text.setAttribute("target", "_blank");
        text.setAttribute("href", feeds[i]);
        text.setAttribute("title", feeds[i]);
        text.innerText = feeds[i];

        var copyButton = document.createElement("button");
        copyButton.innerText = "Copy";
        copyButton.setAttribute("id", "copyButton");
        copyButton.setAttribute("title", "Copy feed link");
        copyButton.setAttribute("value", feeds[i]);

        // divText.appendChild(text);
        // divButton.appendChild(copyButton);

        // listItem.appendChild(divText);
        // listItem.appendChild(divButton);

        listItem.appendChild(text);
        listItem.appendChild(copyButton);

        feedList.appendChild(listItem);
    }

    document.getElementById("copyButton").addEventListener("click", function(event) {
        copyTextToClipboard(event.target.value);
    });
});