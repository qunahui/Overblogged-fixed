import React from 'react'
import { shallow } from 'enzyme'
import DashBoardPage from '../../components/nDashboardPage'

test('should render ExpenDashBoardPage correctly', () => {
    const wrapper = shallow(<DashBoardPage />);
    expect(wrapper).toMatchSnapshot();
});