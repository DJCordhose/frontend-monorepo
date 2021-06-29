import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-comp',
  styleUrl: 'my-comp.css',
  shadow: true,
})
export class MyComp {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
