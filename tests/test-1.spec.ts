import { test, expect } from "@playwright/test";
require("dotenv").config();
const url = "http://localhost:3000/playground";
const secret = process.env.SECRETTESTING as string;

test.describe.configure({ mode: "parallel" });

test.describe("Overall features inside playground without AI needs", () => {
  test("should render the chart section in a holding state, ai settings section, prompt section", async ({
    page,
  }) => {
    await page.goto(url);
    await expect(
      page.locator('[data-test="chart-zone-holding"]')
    ).toBeVisible();
    await expect(page.locator('[data-test="card-ai-settings"]')).toBeVisible();
    await expect(
      page.locator('[data-test="card-prompt-configuration"]')
    ).toBeVisible();
  });

  test("should verify secret keys modal open / closes", async ({ page }) => {
    await page.goto(url);
    await expect(
      page.locator('[data-test="secrets-trigger-modal"]')
    ).toBeVisible();
    await page.locator('[data-test="secrets-trigger-modal"]').click();
    await expect(
      page.locator('[data-test="dialog-secret-keys"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-test="provider-google-generative"]')
    ).toBeVisible();
    await expect(page.locator('[data-test="provider-groq"]')).toBeVisible();
    await expect(page.locator('[data-test="provider-openai"]')).toBeVisible();
    await page.locator('[data-test="provider-google-generative"]').click();
    await page
      .locator('[data-test="provider-google-generative"]')
      .fill("asdsads");
    await page.locator('[data-test="provider-groq"]').click();
    await page.locator('[data-test="provider-groq"]').fill("asdsadsa");
    await page.locator('[data-test="provider-openai"]').click();
    await page.locator('[data-test="provider-openai"]').fill("asdsdsa");
    await expect(page.getByRole("button", { name: "Close" })).toBeVisible();
    await page.getByRole("button", { name: "Close" }).click();
    await expect(page.locator('[data-test="dialog-secret-keys"]')).toBeHidden();
  });

  test("should allow open/close and show the models providers list on ai-settings", async ({
    page,
  }) => {
    await page.goto(url);
    await expect(page.locator('[data-test="select-model"]')).toBeVisible();
    await page.locator('[data-test="select-model"]').click();
    await expect(page.getByText("Google generative")).toBeVisible();
    await expect(page.getByText("Groq")).toBeVisible();
    await expect(page.getByText("OpenAI (Experimental)")).toBeVisible();
    await page.locator("html").click();
  });

  test("Should launch button keep disabled until select a model", async ({
    page,
  }) => {
    // Manipulate prompt settings
    await page.goto(url);
    await expect(
      page.locator('[data-test="card-prompt-configuration"]')
    ).toBeVisible();
    await expect(page.locator('[data-test="select-metadata1"]')).toBeVisible();
    await expect(page.locator('[data-test="select-comparison"]')).toBeVisible();
    await expect(page.locator('[data-test="select-metadata2"]')).toBeVisible();
    await expect(page.locator('[data-test="select-size"]')).toBeVisible();
    await page.locator('[data-test="select-metadata1"]').click();
    await page.getByText("Countries").click();
    await page.locator('[data-test="select-comparison"]').click();
    await page.getByLabel("Most").click();
    await page.locator('[data-test="select-metadata2"]').click();
    await page.getByLabel("People").click();
    await page.locator('[data-test="select-size"]').click();
    await page.getByLabel("10").click();

    // Missing select model - button keeps disabled
    await expect(page.locator('[data-test="button-launch"]')).toBeDisabled();
  });

  test("Should change button-launch visibility after choose a model", async ({
    page,
  }) => {
    // Manipulate prompt options
    await page.goto(url);
    await expect(
      page.locator('[data-test="card-prompt-configuration"]')
    ).toBeVisible();
    await expect(page.locator('[data-test="select-metadata1"]')).toBeVisible();
    await expect(page.locator('[data-test="select-comparison"]')).toBeVisible();
    await expect(page.locator('[data-test="select-metadata2"]')).toBeVisible();
    await expect(page.locator('[data-test="select-size"]')).toBeVisible();
    await page.locator('[data-test="select-metadata1"]').click();
    await page.getByText("Countries").click();
    await page.locator('[data-test="select-comparison"]').click();
    await page.getByLabel("Most").click();
    await page.locator('[data-test="select-metadata2"]').click();
    await page.getByLabel("People").click();
    await page.locator('[data-test="select-size"]').click();
    await page.getByLabel("10").click();
    await expect(page.locator('[data-test="button-launch"]')).toBeDisabled();

    // Select model

    await expect(page.locator('[data-test="select-model"]')).toBeVisible();
    await page.locator('[data-test="select-model"]').click();
    await page.getByLabel("Gemini 1.5 Flash").click();

    // Button change status
    await expect(page.locator('[data-test="button-launch"]')).toBeVisible();
  });
});

test.describe("Should do a full execution entering google-generative API Key, select the model, customize the prompt options", () => {
  test("Should wait chart render successfully", async ({ page }) => {
    await page.goto(url);

    // Open modal
    await page.locator('[data-test="secrets-trigger-modal"]').click();
    await page.locator('[data-test="provider-google-generative"]').click();

    // Fill key
    await page.locator('[data-test="provider-google-generative"]').fill(secret);

    // Close dialog
    await page.getByRole("button", { name: "Close" }).click();

    // Fullfil prompt settings
    await page.locator('[data-test="select-metadata1"]').click();
    await page.getByLabel("Countries").click();
    await page.locator('[data-test="select-comparison"]').click();
    await page.getByLabel("Most").click();
    await page.locator('[data-test="select-metadata2"]').click();
    await page.getByLabel("Cars").click();
    await page.locator('[data-test="select-size"]').click();
    await page.getByLabel("10").click();

    // Fullfil ai settings
    await page.locator('[data-test="select-model"]').click();
    await page.getByLabel("Gemini 1.5 Flash").click();

    // Start processing
    await page.locator('[data-test="button-launch"]').click();
    await expect(page.locator('[data-test="loading-chart"]')).toBeVisible();
    await expect(page.locator('[data-test="spinner"]')).toBeVisible();

    // Finished processing
    await expect(page.getByRole("application")).toBeVisible();
    await expect(
      page.locator('[data-test="chart-options-title"]')
    ).toBeVisible();
    await expect(page.locator('[data-test="button-view-data"]')).toBeVisible();

    // Test open dialog - (raw data)
    await page.locator('[data-test="button-view-data"]').click();
    await expect(page.locator('[data-test="dialog-raw-data"]')).toBeVisible();
    await expect(page.locator('[data-test="raw-data-code"]')).toBeVisible();
  });
});
