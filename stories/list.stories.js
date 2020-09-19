import React from 'react';
import { storiesOf } from '@storybook/react';
import CollectionList from './../src/content'

storiesOf('CollectionList', module)
  .add('CollectionList',() => (
    <CollectionList />
  ))
