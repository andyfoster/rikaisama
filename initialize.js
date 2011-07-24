chrome.browserAction.onClicked.addListener(rcxMain.inlineToggle);
chrome.tabs.onSelectionChanged.addListener(rcxMain.onTabSelect);
chrome.extension.onRequest.addListener(
    function(request, sender, response) {
      switch(request.type) {
        case 'enable?':
          rcxMain.onTabSelect(sender.tab.id);
          break;
        case 'xsearch':
          var e = rcxMain.search(request.text, request.showmode);
          response(e);
          break;
        case 'translate':
          var e = rcxMain.dict.translate(request.title);
          response(e);
          break;
        case 'makehtml':
          var html = rcxMain.dict.makeHtml(request.entry);
          response(html);
          break;
        default:
      }
    });

if(initStorage("v0.8", true)) {
  initStorage("popupcolor", "blue");
  initStorage("highlight", "yes");
}

/**
 * Initializes the localStorage for the given key.
 * If the given key is already initialized, nothing happens.
 *
 * @author Teo (GD API Guru)
 * @param key The key for which to initialize
 * @param initialValue Initial value of localStorage on the given key
 * @return true if a value is assigned or false if nothing happens
 */
function initStorage(key, initialValue) {
  var currentValue = localStorage[key];
  if (!currentValue) {
    localStorage[key] = initialValue;
    return true;
  }
  return false;
}

rcxMain.config = {};
rcxMain.config.css = localStorage["popupcolor"];
rcxMain.config.highlight = localStorage["highlight"];
