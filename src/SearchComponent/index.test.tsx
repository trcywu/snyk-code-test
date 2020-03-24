import React from "react";
import renderer from "react-test-renderer";
import SearchComponent from ".";

describe("<SearchComponent />", () => {
  const onSearch = jest.fn();
  it("renders SearchComponent", () => {
    const wrapper = renderer.create(<SearchComponent onSearch={onSearch} />);

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
