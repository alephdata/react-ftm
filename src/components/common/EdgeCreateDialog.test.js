import React from 'react';
import { shallow } from 'enzyme';
import { EdgeCreateDialog } from './EdgeCreateDialog';
import { EdgeType } from 'pants';
jest.mock('pants/EdgeType');

describe('<EdgeCreateDialog />', () => {
    it('Should render correctly with no properties', () => {
        const thing = {
            model: "yay"
        }
        EdgeType.getAll.mockResolvedValue("");
        const wrapper = shallow(intl(<EdgeCreateDialog entityManager={thing} />))
        expect(wrapper).toMatchSnapshot();
    });

    it('Should render correctly with properties', () => {
        const component = shallow(intl(<EdgeCreateDialog className="my-dialog" />));
        expect(component).toMatchSnapshot();
    });
});
