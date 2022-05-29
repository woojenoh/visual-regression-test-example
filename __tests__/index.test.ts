import puppeteer, { Browser, Page } from "puppeteer";
import { PendingXHR } from "pending-xhr-puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { PATH } from "../src/App";

expect.extend({ toMatchImageSnapshot });

describe("visual regression test", () => {
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

  test.each(Object.values(PATH))("test %s", async (path) => {
    await page.goto(`http://localhost:3000${path}`);
    await pendingXHR.waitForAllXhrFinished();
    await page.waitForTimeout(1000);
    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot({
      customDiffDir: "./__tests__/__diff_output__",
      customSnapshotIdentifier: path === '/' ? 'root' : path
    });
  });
});
