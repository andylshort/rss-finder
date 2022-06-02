function copyTextToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(function(){
                console.log("Successfully copied!");
            });
    } else {
        console.log("Cannot copy to clipboard...");
    }
}

function init() {
    document.getElementById("options").addEventListener("click", function(event) {
        chrome.runtime.openOptionsPage();
    });

    const url = new URL(location.href);
    const links = JSON.parse(url.searchParams.get('feedLinks'));

    var feedList = document.getElementById("feeds");
    console.log("Getting...");
    
    links.forEach(link => {
        
        console.log("Feed: " + link.href);

        var listItem = document.createElement("li");
        listItem.setAttribute("class", "rssLink");

        // var divText = document.createElement("div");
        // var divButton = document.createElement("div");

        var text = document.createElement("a");
        text.setAttribute("class", "rssUrl");
        text.setAttribute("target", "_blank");
        text.setAttribute("href", link.href);
        text.setAttribute("title", link.title);
        text.innerText = link.href;

        var copyButton = document.createElement("button");
        copyButton.innerText = "Copy";
        copyButton.setAttribute("id", "copyButton");
        copyButton.setAttribute("title", "Copy feed link");
        copyButton.setAttribute("value", link.href);

        // divText.appendChild(text);
        // divButton.appendChild(copyButton);

        // listItem.appendChild(divText);
        // listItem.appendChild(divButton);

        listItem.appendChild(text);
        listItem.appendChild(copyButton);

        feedList.appendChild(listItem);
    });

    document.getElementById("copyButton").addEventListener("click", function(event) {
        console.log("Clicked to copy!");
        copyTextToClipboard(event.target.value);
    });
};




if (['interactive', 'complete'].includes(document.readyState)) {
	init();
} else {
	document.addEventListener('DOMContentLoaded', init, {once: true});
}
