var feeds = [];

function runPageContentCheck(tabId) {
    chrome.tabs.executeScript(tabId, { file: "rss_scrape.js" }, function() {});
}

function updateBrowserAction(hasRss, tabId) {
    if (hasRss) {
        chrome.browserAction.enable(tabId);
    } else {
        chrome.browserAction.disable(tabId);
    }
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onActivated.addListener(function(activeInfo) {
    let tabId = activeInfo.tabId;
    chrome.browserAction.disable(tabId);
    runPageContentCheck(tabId);
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    chrome.browserAction.disable(tabId);
    runPageContentCheck(tabId);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if ('rss' in request) {
            feeds = request.rss;
            updateBrowserAction(request.rss, sender.tab.id);
        }
    });