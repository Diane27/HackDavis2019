import 'react-native';
import React from 'react';
import { NunitoText } from '../StyledText';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<NunitoText>Snapshot test!</NunitoText>).toJSON();

  expect(tree).toMatchSnapshot();
});
