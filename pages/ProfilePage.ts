import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProfilePage extends BasePage {
  readonly searchInput: Locator;
  readonly deleteAllBooksButton: Locator;
  readonly confirmOkButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder(/type to search/i);
    this.deleteAllBooksButton = page.getByRole('button', { name: 'Delete All Books' });
    this.confirmOkButton = page.getByRole('button', { name: 'OK', exact: true });
  }

  async open() {
    await this.goto('https://demoqa.com/profile');
  }

  getBookRow(bookName: string): Locator {
    return this.page.getByRole('row').filter({ hasText: bookName });
  }

  async deleteBook(bookName: string) {
    await this.getBookRow(bookName).locator('span[title="Delete"]').click();
    await this.confirmOkButton.click();
  }

  async deleteAllBooks() {
    await this.deleteAllBooksButton.click();
    await this.confirmOkButton.click();
  }

  async expectBookInCollection(bookName: string) {
    await expect(this.getBookRow(bookName)).toBeVisible();
  }

  async expectBookNotInCollection(bookName: string) {
    await expect(this.getBookRow(bookName)).toHaveCount(0);
  }
}
