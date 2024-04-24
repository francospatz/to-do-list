import React from "react";
import { shallow } from "enzyme";
import TodoList from "./TodoList";

describe("TodoList", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<TodoList />);
    expect(wrapper).toMatchSnapshot();
  });
});
