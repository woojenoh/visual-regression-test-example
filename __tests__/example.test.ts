import puppeteer, { Browser, Page } from "puppeteer";
import { PendingXHR } from "pending-xhr-puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

describe("page", () => {
  let browser: Browser;
  let page: Page;
  let pendingXHR: PendingXHR;

  beforeAll(async () => {
    browser = await puppeteer.launch();
  });
  beforeEach(async () => {
    page = await browser.newPage();
    pendingXHR = new PendingXHR(page);
  });
  afterEach(async () => {
    await page.close();
  });
  afterAll(async () => {
    await browser.close();
  });

  it("match", async () => {
    await page.goto(`http://localhost:3000`);
    await pendingXHR.waitForAllXhrFinished();
    await page.waitForTimeout(1000);
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});
