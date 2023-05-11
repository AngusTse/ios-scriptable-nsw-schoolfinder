const url = 'https://schoolfinder.education.nsw.gov.au/';

async function main() {
  
    const address = (config.runsInActionExtension) ? args.plainTexts[0] : await showAddressInput() 
    if (address.length == 0) {
      console.error('Empty address')
      Script.complete()
    }
    console.log(`address: ${address}`)
  
    await openWebView(url, address)
    Script.complete();
}
await main();
  
async function injectAddress(wv, address) {
    let js = `
        const input = document.getElementById('address');
        input.value = '${address}';
    `
    console.log(`js: ${js}`)
    await wv.evaluateJavaScript(js, false)
}

async function openWebView(url, address) {
    let webview = new WebView()
    await webview.loadURL(url)
    await injectAddress(webview, address)
    await webview.present()
    return webview
}

async function showAddressInput() {
  const alert = new Alert();
  alert.title = 'Input address'
  alert.addTextField('Address', '101 Waterloo Road');
  await alert.present();
  return alert.textFieldValue(0)
}
