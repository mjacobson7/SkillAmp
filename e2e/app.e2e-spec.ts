import { CcProjectPage } from './app.po';

describe('cc-project App', () => {
  let page: CcProjectPage;

  beforeEach(() => {
    page = new CcProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
