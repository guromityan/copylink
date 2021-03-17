chrome.commands.onCommand.addListener((cmd) => {
  chrome.tabs.getSelected((tab) => {
    const title = tab.title;
    const url = tab.url;

    if (cmd === "copy-md") {
      console.log({ action: "copy-md", title: title, url: url });
      mdFormatLink = `[${title}](${url})`;
      copyToClipboard(mdFormatLink);
      return;
    }

    if (cmd === "copy-title") {
      console.log({ action: "copy-title", title: title });
      copyToClipboard(title);
      return;
    }
  });
});

chrome.contextMenus.create({
  title: "copylink MD format",
  contexts: ["image"],
  type: "normal",
  onclick: (clicked) => {
    if (clicked.srcUrl === "") {
      return;
    }
    let url = new URL(clicked.srcUrl);
    let imgPath = url.origin + url.pathname;
    let imgName = url.pathname.substring(url.pathname.lastIndexOf("/") + 1);
    let mdFormatLink = `![${imgName}](${imgPath})`;
    copyToClipboard(mdFormatLink);
    return;
  },
});

function copyToClipboard(value) {
  let copyForm = document.createElement("textarea");
  copyForm.textContent = value;

  let body = document.getElementsByTagName("body")[0];
  body.appendChild(copyForm);

  copyForm.select();
  let res = document.execCommand("copy");
  body.removeChild(copyForm);
  return res;
}
