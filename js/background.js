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
