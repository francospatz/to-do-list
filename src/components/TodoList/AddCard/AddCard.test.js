import React from "react";
import { shallow } from "enzyme";
import AddCard from "./AddCard";

describe("AddCard", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<AddCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
