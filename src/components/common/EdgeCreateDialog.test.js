import React from 'react';
import { shallow } from 'enzyme';
import { EdgeCreateDialog } from './EdgeCreateDialog';
import { EdgeType } from 'types';

jest.mock('types/EdgeType');

describe('<EdgeCreateDialog />', () => {
    it('Should render correctly with no properties', () => {
        const thing = {
            model: "yay"
        }
        EdgeType.getAll.mockResolvedValue("");
        // eslint-disable-next-line no-undef
        const wrapper = shallow(intl(<EdgeCreateDialog entityManager={thing} />));
        expect(wrapper).toMatchSnapshot();
    });

    it('Should render correctly with properties', () => {
        // eslint-disable-next-line no-undef
        const component = shallow(intl(<EdgeCreateDialog className="my-dialog" />));
        expect(component).toMatchSnapshot();
    });
});
