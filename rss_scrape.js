// Fragments to look out for
var youtubeChannel = "https://www.youtube.com/channel/";
var youtubeUser = "https://www.youtube.com/user/";
var youtubeRSS = "https://www.youtube.com/feeds/videos.xml?channel_id=";

// Scrape the page
var rssUrls = document.querySelectorAll("link[type='application/rss+xml'], link[type='application/atom+xml']");

if (rssUrls.length > 0) {
    // General page scraping
    var data = [];

    for (var i = 0; i < rssUrls.length; i++) {
        let url = rssUrls[0].getAttribute("href");
        if (url.startsWith("/")) {
            url = window.location.protocol + "//" + window.location.hostname + url;
        }

        if (!data.includes(url)) data.push(url);
    }

    chrome.runtime.sendMessage({ rss: data });

} else if (window.location.href.startsWith(youtubeChannel)) {
    // YouTube: https://www.youtube.com/channel/...
    var id = window.location.href.replace(youtubeChannel, youtubeRSS);
    chrome.runtime.sendMessage({ rss: [id] });
} else if (window.location.href.startsWith(youtubeUser)) {
    // YouTube: https://www.youtube.com/user/...
    chrome.runtime.sendMessage({ rss: [window.location.href] });
}