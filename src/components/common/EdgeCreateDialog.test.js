import React from 'react';
import { EdgeCreateDialog } from './EdgeCreateDialog';
import { shallowWithIntl } from '../../setupTests';

jest.mock('types/EdgeType');

describe('<EdgeCreateDialog />', () => {
    it('Should render correctly with no properties', () => {
        const thing = {
            model: "yay"
        }
        const wrapper = shallowWithIntl(<EdgeCreateDialog entityManager={thing} />);
        expect(wrapper).toMatchSnapshot();
    });
});
