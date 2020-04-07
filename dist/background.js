chrome.browserAction.onClicked.addListener(function () {
  chrome.windows.create({
    width: 600,
    height: 530,
    url: chrome.runtime.getURL("app/index.html"),
    type: "popup",
  });
});

// chrome.runtime.onInstalled.addListener(function () {
//   chrome.storage.sync.set({ color: "#3aa757" }, function () {
//     console.log("The color is green.");
//   });
// });
