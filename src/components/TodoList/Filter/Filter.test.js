import React from "react";
import { shallow } from "enzyme";
import Filter from "./Filter";

describe("Filter", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Filter />);
    expect(wrapper).toMatchSnapshot();
  });
});
