// @ts-check
import { test, expect } from '@playwright/test';

test.describe("code examples", () => {
  test("can be copied to clipboard", async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Failure on trying to read text from clipboard in webkit');
    
    await page.goto("/2024/11/01/microbit-sings-portal-theme/");

    // click the copy to clip board 
    await page.getByRole('button').click();

    // Get clipboard content
    const handle = await page.evaluateHandle(() => navigator.clipboard.readText());
    const clipboardContent = await handle.jsonValue();

    // start of code
    expect(clipboardContent).toEqual(expect.stringContaining('from microbit import *'));

    // end of code
    expect(clipboardContent).toEqual(expect.stringContaining('speech.sing('));
  });
});
  
