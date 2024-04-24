import React from "react";
import { shallow } from "enzyme";
import DropIndicator from "./DropIndicator";

describe("DropIndicator", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<DropIndicator />);
    expect(wrapper).toMatchSnapshot();
  });
});
