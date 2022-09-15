function init() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const tab = tabs[0];

    // todo: might require parent tab id in future.
    // const [parentIdDetail] = tab.url?.split('?')[1]?.split('&');
    // const [_, parentId] = parentIdDetail?.split('=');
    if (tab) {
      // chrome.tabs.executeScript(parseInt(tab.id), { file: 'content-test.js' }); // todo: uncomment this to scrape connections.
      chrome.tabs.executeScript(parseInt(tab.id), { file: 'content.js' }); // * NOTE: scrapes candidates
    }
  });

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const data = typeof request === 'string' ? JSON.parse(request) : request;
    if (data.action === 'send_data') {
      fetch('http://localhost:5000/start-scraping', {
        method: 'POST',
        body: JSON.stringify(data.data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => sendResponse(response))
      .catch(error => console.log('server error => ', error))
    }

    return true;
  });
}

init();
