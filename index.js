import puppeteer from 'puppeteer';

const init = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();
      await page.goto(
        'https://www.podbean.com/podcast-detail/x4gn6-297bd1/JavaScript-Jabber-Podcast'
      );
      let episodeLinks = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a.title')).map((item) => ({
          url: item.getAttribute('href'),
          text: item.innerText,
        }));
      });
      browser.close();
      return resolve(episodeLinks);
    } catch (e) {
      return reject(e);
    }
  });
};

init()
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
