/**
 * @FileDescription Will handle all the browser events necessary for the extension
 */
chrome.browserAction.onClicked.addListener(function(a) {
  chrome.windows.getCurrent(function(a) {
    parentWindowId = a.id;
  });

  // * note: Opens new popup tab. Works only if default_popup is removed from manifest.json
  window.open(chrome.extension.getURL("popup.html?tabid=" + encodeURIComponent(a.id) + "&url=" + encodeURIComponent(a.url)), "Table Scraper", "toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=720,height=650");
  // chrome.windows.create({
  //   url: chrome.runtime.getURL('popup.html'),
  //   type: 'popup',
  // });
 });
