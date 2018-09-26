/* eslint no-console: "off" */
(async () => {
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3030/");
  try {
    await page.pdf({
      path: "./badges/badges.pdf",
      printBackground: true
    });
    console.log("All badges exported!");
  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();
