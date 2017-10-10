import { MrTuskPage } from './app.po';

describe('mr-tusk App', () => {
  let page: MrTuskPage;

  beforeEach(() => {
    page = new MrTuskPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
