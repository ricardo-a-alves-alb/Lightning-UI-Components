/**
 * Copyright 2021 Comcast Cable Communications Management, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import lng from '@lightningjs/core';
import TestUtils from '../../test/lightning-test-utils';
import withTags from '.';

const updateMock = jest.fn();

describe('withTags', () => {
  let withTagsComponent, testRenderer;
  class Example extends lng.Component {
    static get tags() {
      return ['Title', { name: 'WrappedItem', path: 'Wrapper.WrappedItem' }];
    }

    static _template() {
      return {
        x: 50,
        y: 50,
        Title: {
          text: 'title'
        },
        Wrapper: {
          WrappedItem: {
            text: 'WrappedItem'
          }
        }
      };
    }
  }

  beforeEach(() => {
    [withTagsComponent, testRenderer] = TestUtils.makeCreateComponent(
      withTags(Example)
    )();
  });

  afterEach(() => {
    withTagsComponent = null;
  });

  it('extends the base class', () => {
    expect(withTagsComponent.constructor.name).toBe('Example');
  });

  it('creates tag for _Title', () => {
    let tag = withTagsComponent.tag('Title');
    expect(withTagsComponent._Title).toEqual(tag);
  });

  it('creates tags _WrappedItem', () => {
    let tag = withTagsComponent.tag('Wrapper.WrappedItem');
    expect(withTagsComponent._WrappedItem).toEqual(tag);
  });
});
