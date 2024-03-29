/* eslint-disable @angular-eslint/component-class-suffix */

import { Component, input, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('swc-plugin-angular', () => {
  it('should load component with templateUrl & styleUrl', () => {
    @Component({
      standalone: true,
      templateUrl: './test.component.html',
      styleUrl: './test.component.css'
    })
    class Container {
    }

    const { title } = render(Container);
    expect(title).toBe('Hello templateUrl!');
  });

  it('should bind inputs', () => {
    @Component({
      standalone: true,
      selector: 'jsc-title',
      template: `
        <h1>Hello {{ title() }}!</h1>
      `
    })
    class Title {
      title = input<string>();
    }

    @Component({
      standalone: true,
      imports: [
        Title
      ],
      template: `
        <jsc-title [title]='title' />
      `
    })
    class Container {
      title = 'input';
    }

    const { title } = render(Container);
    expect(title).toBe('Hello input!');
  });

  it('should bind required inputs', () => {
    @Component({
      standalone: true,
      selector: 'jsc-title',
      template: `
        <h1>Hello {{ title() }}!</h1>
      `
    })
    class Title {
      title = input.required<string>();
    }

    @Component({
      standalone: true,
      imports: [
        Title
      ],
      template: `
        <jsc-title [title]='title' />
      `
    })
    class Container {
      title = 'required input';
    }

    const { title } = render(Container);
    expect(title).toBe('Hello required input!');
  });

  it('should bind aliased inputs', () => {
    @Component({
      standalone: true,
      selector: 'jsc-title',
      template: `
        <h1>Hello {{ myTitle() }}!</h1>
      `
    })
    class Title {
      myTitle = input('', { alias: 'title' });
    }

    @Component({
      standalone: true,
      imports: [
        Title
      ],
      template: `
        <jsc-title [title]='title' />
      `
    })
    class Container {
      title = 'input alias';
    }

    const { title } = render(Container);
    expect(title).toBe('Hello input alias!');
  });

  it('should bind required aliased inputs', () => {
    @Component({
      standalone: true,
      selector: 'jsc-title',
      template: `<h1>Hello {{ myTitle() }}!</h1>`
    })
    class Title {
      myTitle = input.required<string>({ alias: 'title' });
    }

    @Component({
      standalone: true,
      imports: [Title],
      template: '<jsc-title [title]="title"/>'
    })
    class Container {
      title = 'required input alias';
    }

    const { title } = render(Container);
    expect(title).toBe('Hello required input alias!');
  });

  function render(cmpType: Type<unknown>) {
    const fixture = TestBed.createComponent(cmpType);
    fixture.autoDetectChanges();

    return {
      title: fixture.nativeElement.querySelector('h1')?.textContent
    };
  }
});
