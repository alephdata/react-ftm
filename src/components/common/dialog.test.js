import React from 'react';
import { shallow } from 'enzyme';
import { Dialog } from './Dialog';

describe('<Dialog />', () => {
    it('Should render correctly with no properties', () => {
        const component = shallow(<Dialog />);
        expect(component).toMatchSnapshot();
    });

    it('Should render correctly with properties', () => {
        const component = shallow(<Dialog className="my-dialog" />);
        expect(component).toMatchSnapshot();
    });
});
