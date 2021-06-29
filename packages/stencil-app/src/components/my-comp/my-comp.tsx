import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'my-comp',
  styleUrl: 'my-comp.css',
  // shadow: true,
  shadow: false,
})
export class MyComp {

  render() {
    return (
      <Host>
        <h1>My Component</h1>
        <slot></slot>
      </Host>
    );
  }

}
