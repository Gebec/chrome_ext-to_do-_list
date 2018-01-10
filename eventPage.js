// Do I need it?

chrome.storage.onChanged.addListener(function(changes, storageName) {
	chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
});