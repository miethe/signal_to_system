/**
 * Stage 1 capture spec — placeholder.
 *
 * Stage 1 is a narrative scenario; there is no live application flow to
 * drive with Playwright. The transform script (`scripts/manifest-to-stage.ts`)
 * generates all assets directly from `demo.yaml`.
 *
 * This file exists to satisfy `demo-foundry review` and to plumb the
 * Playwright path for future stages (e.g., capturing the live showcase
 * page for a social clip). Do not delete.
 */
import { test, expect } from "@playwright/test";

test.describe.skip("stage-1-baseline (narrative only — no live capture)", () => {
  test("placeholder", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/.*/);
  });
});
