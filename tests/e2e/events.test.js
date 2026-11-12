// tests/e2e/events.test.js
const { test, expect } = require('@playwright/test');

test('Перевірка заголовка сторінки сервісу подій', async ({ page }) => {
  await page.goto('http://localhost:3000/events.html');
  await expect(page).toHaveTitle(/Сервіс управління подіями/);
  await expect(page.locator('#pageTitle')).toHaveText('Сервіс управління подіями');
});

test('Додавання нової події до списку', async ({ page }) => {
  await page.goto('http://localhost:3000/events.html');
  await page.fill('#eventTitle', 'AI Summit 2026');
  await page.selectOption('#eventCategory', 'MEETUP');
  await page.click('#addEventBtn');

  const lastItem = page.locator('#eventsList li').last();
  await expect(lastItem).toHaveText('[MEETUP] AI Summit 2026');
});

test('Фільтрація подій через рядок пошуку', async ({ page }) => {
  await page.goto('http://localhost:3000/events.html');
  await page.fill('#searchInput', 'Node.js');

  await expect(page.locator('#eventsList li').nth(0)).toBeVisible();
  await expect(page.locator('#eventsList li').nth(1)).toBeHidden();
});

test('Перевірка стороннього сайту Example Domain', async ({ page }) => {
  await page.goto('https://example.com/');
  await expect(page).toHaveTitle(/Example Domain/);
  await expect(page.locator('body')).toContainText('This domain is for use in documentation examples');
  await expect(page.locator('a', { hasText: 'Learn more' })).toBeVisible();
});