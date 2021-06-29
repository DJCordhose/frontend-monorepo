import { newSpecPage } from '@stencil/core/testing';
import { MyComp } from '../my-comp';

describe('my-comp', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyComp],
      html: `<my-comp></my-comp>`,
    });
    expect(page.root).toEqualHtml(`
      <my-comp>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </my-comp>
    `);
  });
});
