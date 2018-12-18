import React from 'react';
import ReactDOM from 'react-dom';
import { Characters } from './Characters';
import CharactersRedux from './Characters';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import sinon from 'sinon';

import { store, actions } from './store';
import { Provider } from 'react-redux';

import { MemoryRouter as Router, Route } from 'react-router-dom';


Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
  let comp = Enzyme.mount(<Characters characters={[]} />);
  expect(comp.find(".loading").at(0).text()).toEqual("Cargando...");
});

it('Simulate click', () => {
  let fake = sinon.fake.returns(23);

  let comp = Enzyme.mount(<Characters characters={[]} click={fake} />);
  let link = comp.find(".link").at(0);
  link.simulate("click");
  expect(comp.state().click).toEqual(1);
  link.simulate("click");
  expect(comp.state().click).toEqual(2);

  expect(fake.callCount).toBe(2);

  expect(comp.state().fake).not.toEqual(22);
  expect(comp.state().fake).toEqual(23);
});

let chars = [];

describe('conjunto', () => {
    beforeEach(() => {
        chars.push({ id: 1, name: "rick", state: "alive", gender: "male", episode: [] });
    });

    afterEach(() => {
        chars = [];
    });

    it('test1', () => {
        expect(chars.length).toBe(1);
        chars.push({ id: 2, name: "morty", state: "alive", gender: "male", episode: [] });
        expect(chars.length).toBe(2);

        let comp = Enzyme.mount(
            <Provider store={store}>
                <Router>
                    <Route component={CharactersRedux} />
                </Router>
            </Provider>
        );

        store.dispatch(actions.addChar(chars[0]));
    });

    it('test2', () => {
        expect(chars.length).toBe(1);
        chars.push({ id: 2, name: "morty", state: "alive", gender: "male", episode: [] });
        chars.push({ id: 5, name: "morty", state: "alive", gender: "male", episode: [] });

        let callback = sinon.fake();

        let comp = Enzyme.mount(
            <Router>
                <Route render={() => <Characters characters={chars} set={callback} /> } />
            </Router>
        );

        let c = comp.find(Characters);
        expect(c.props().characters.length).toBe(3);
        expect(c.find(".col").length).toBe(3);
    });
});
