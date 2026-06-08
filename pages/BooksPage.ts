import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class BooksPage extends BasePage {
  readonly searchInput: Locator;
  readonly addToCollectionButton: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.getByPlaceholder(/type to search/i);
    this.addToCollectionButton = page.getByRole('button', { name: 'Add To Your Collection' });
  }

  async open() {
    await this.goto('https://demoqa.com/books');
  }

  async searchBook(query: string) {
    await this.searchInput.fill(query);
  }

  async openBookDetail(bookName: string) {
    await this.page.getByRole('link', { name: bookName }).click();
  }

  async addToCollection() {
    await this.addToCollectionButton.click();
  }

  async searchAndAddBook(query: string, bookName: string) {
    await this.searchBook(query);
    await this.openBookDetail(bookName);
    await this.addToCollection();
  }

  async expectSearchResultContains(text: string | RegExp) {
    await expect(this.page.getByRole('link', { name: text }).first()).toBeVisible();
  }
}
