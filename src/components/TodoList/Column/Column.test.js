import React from "react";
import { shallow } from "enzyme";
import Column from "./Column";

describe("Column", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Column />);
    expect(wrapper).toMatchSnapshot();
  });
});
