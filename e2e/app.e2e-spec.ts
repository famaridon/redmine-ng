import { RedmineNgPage } from './app.po';

describe('redmine-ng App', () => {
  let page: RedmineNgPage;

  beforeEach(() => {
    page = new RedmineNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
