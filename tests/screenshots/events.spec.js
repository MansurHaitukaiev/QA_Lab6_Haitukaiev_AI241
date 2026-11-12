// tests/screenshots/events.spec.js
const { test, expect } = require('@playwright/test');

test('Перевірка вигляду сторінки сервісу подій за скриншотом', async ({ page }) => {
  await page.goto('http://localhost:3000/events.html');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.screenshot()).toMatchSnapshot('screenshots/events-page/full-page.png', {
    maxDiffPixelRatio: 0.1,
  });
});

test('Порівняння скриншота форми створення події', async ({ page }) => {
  await page.goto('http://localhost:3000/events.html');
  await page.evaluate(() => document.fonts.ready);
  const formCard = page.locator('.card').first();
  expect(await formCard.screenshot()).toMatchSnapshot('screenshots/events-page/event-form-card.png', {
    maxDiffPixelRatio: 0.1,
  });
});