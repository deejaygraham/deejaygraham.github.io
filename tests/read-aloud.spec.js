// @ts-check
import { test, expect } from "@playwright/test";

const postUrl = "/2013/11/26/dream-team-nightmare/";

/**
 * Install a predictable Web Speech API before the site's JavaScript runs.
 * @param {import("@playwright/test").Page} page
 * @param {{ autoFinish?: boolean }} options
 */
async function installSpeechSynthesisMock(page, { autoFinish = false } = {}) {
  await page.addInitScript(
    ({ shouldAutoFinish }) => {
      const browserWindow = /** @type {any} */ (window);
      const state = {
        calls: [],
        cancelCount: 0,
        currentUtterance: null,
        speaking: false,
      };
      const voices = [
        { name: "Welsh Voice", lang: "cy-GB", voiceURI: "voice-welsh", default: false },
        { name: "English Voice", lang: "en-GB", voiceURI: "voice-english", default: true },
      ];

      class MockSpeechSynthesisUtterance {
        constructor(text) {
          this.text = text;
          this.rate = 1;
          this.voice = null;
          this.onend = null;
          this.onerror = null;
        }
      }

      const synthesis = {
        get speaking() {
          return state.speaking;
        },
        pending: false,
        paused: false,
        getVoices: () => voices,
        addEventListener: () => {},
        resume: () => {},
        speak(utterance) {
          state.speaking = true;
          state.currentUtterance = utterance;
          state.calls.push({
            text: utterance.text,
            rate: utterance.rate,
            voiceUri: utterance.voice?.voiceURI || "",
          });

          if (shouldAutoFinish) {
            setTimeout(() => {
              state.speaking = false;
              utterance.onend?.();
            }, 0);
          }
        },
        cancel() {
          state.cancelCount += 1;
          state.speaking = false;
          const utterance = state.currentUtterance;
          state.currentUtterance = null;
          utterance?.onerror?.({ error: "canceled" });
        },
      };

      browserWindow.__speechMock = state;
      Object.defineProperty(browserWindow, "SpeechSynthesisUtterance", {
        configurable: true,
        value: MockSpeechSynthesisUtterance,
      });
      Object.defineProperty(browserWindow, "speechSynthesis", {
        configurable: true,
        value: synthesis,
      });
    },
    { shouldAutoFinish: autoFinish },
  );
}

test.describe("read aloud", () => {
  test("restores speed and voice preferences and uses them for speech", async ({ page }) => {
    await installSpeechSynthesisMock(page);
    await page.goto(postUrl);

    const rateSelect = page.locator("#narrator-rate");
    const voiceSelect = page.locator("#narrator-voice");

    await expect(voiceSelect.locator("option")).toHaveText([
      "Device default",
      "Welsh Voice (cy-GB)",
      "English Voice (en-GB) — default",
    ]);

    await rateSelect.selectOption("1.5");
    await voiceSelect.selectOption("voice-welsh");
    await page.reload();

    await expect(rateSelect).toHaveValue("1.5");
    await expect(voiceSelect).toHaveValue("voice-welsh");

    await page.locator("#read-aloud").click();
    await expect
      .poll(() =>
        page.evaluate(() => /** @type {any} */ (window).__speechMock.calls[0]),
      )
      .toMatchObject({ rate: 1.5, voiceUri: "voice-welsh" });
  });

  test("reads the post title and h2 subheadings", async ({ page }) => {
    await installSpeechSynthesisMock(page, { autoFinish: true });
    await page.goto(postUrl);

    await page.locator("#read-aloud").click();

    await expect
      .poll(() => page.evaluate(() => /** @type {any} */ (window).__speechMock.calls))
      .toEqual(
        expect.arrayContaining([
          expect.objectContaining({ text: "The Dream Team Nightmare by Portia Tung" }),
          expect.objectContaining({ text: "Full Disclosure" }),
        ]),
      );
  });

  test("clicking the button again cancels speech and restores the UI", async ({ page }) => {
    await installSpeechSynthesisMock(page);
    await page.goto(postUrl);

    const button = page.locator("#read-aloud");
    const originalTitle = await page.title();

    await button.click();
    await expect(button).toHaveClass(/narrator-active/);
    await expect(button).toHaveAttribute("aria-label", "Stop reading this page aloud");
    await expect(page).toHaveTitle(`[🔊] ${originalTitle}`);

    await button.click();

    await expect(button).not.toHaveClass(/narrator-active/);
    await expect(button).toHaveAttribute("aria-label", "Read this page aloud");
    await expect(page.locator("#read-aloud-label")).toHaveText("Read this aloud");
    await expect(page).toHaveTitle(originalTitle);
    await expect
      .poll(() => page.evaluate(() => /** @type {any} */ (window).__speechMock.cancelCount))
      .toBe(1);
  });
});
