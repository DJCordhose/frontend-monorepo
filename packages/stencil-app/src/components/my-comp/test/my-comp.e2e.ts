import { newE2EPage } from '@stencil/core/testing';

describe('my-comp', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<my-comp></my-comp>');

    const element = await page.find('my-comp');
    expect(element).toHaveClass('hydrated');
  });
});
