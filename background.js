var feeds = [];

function runPageContentCheck(tabId) {
    chrome.tabs.executeScript(tabId, { file: "rss_scrape.js" }, function() {});
}

function disableBrowserAction(tabId) {
    chrome.browserAction.disable(tabId);
    chrome.browserAction.setTitle({
        title: "No feeds found"
    });

    chrome.browserAction.setIcon({
        path: "img/rss_grey_48.png",
        tabId: tabId
    });
}

function updateBrowserAction(hasRss, tabId) {
    console.log("Has RSS? " + hasRss);
    if (hasRss) {
        chrome.browserAction.enable(tabId);
        chrome.browserAction.setTitle({
            title: "Found " + feeds.length + " feed(s)"
        });
        chrome.browserAction.setIcon({
            path: "img/rss_48.png",
            tabId: tabId
        });
    } else {
        disableBrowserAction(tabId);
    }
}

function emailSupport() {
    var support = "mailto:" + "support@";
    support += "andyls.c" + "o.uk";
    window.open(support);
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onActivated.addListener(function(activeInfo) {
    let tabId = activeInfo.tabId;
    disableBrowserAction(tabId);
    runPageContentCheck(tabId);
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    disableBrowserAction(tabId);
    runPageContentCheck(tabId);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if ('rss' in request) {
        feeds = request.rss;
        updateBrowserAction(request.rss, sender.tab.id);
    } else if ('email' in request) {
        emailSupport();
    }
});