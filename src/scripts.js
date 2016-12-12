var attached = false;
chrome.commands.onCommand.addListener(function (command) {
    console.log("adding listener to " + command);
    toggleAttachDebugger();
});

function toggleAttachDebugger() {
    console.log("toggleAttachedDebugger was " + attached);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length != 1) {
            console.warn("expected exactly one tab match, got " + tabs.length);
            return;
        }
        var tab = { tabId: tabs[0].id };
        console.log("Current tab is " + tab.tabId);
        if (attached)
            chrome.debugger.detach(tab, function () {
                console.log("toggleAttachedDebugger detached");
                attached = false;
            });
        else
            chrome.debugger.attach(tab, "1.0", function () {
                console.log("toggleAttachedDebugger atached");
                attached = true;
            });
    });
}
