import React from "react";
import renderer from "react-test-renderer";
import DisplayComponent from ".";
import { DataResponse } from "../DisplayComponent";

const createNodeMock = (element: React.ReactElement<any, string>) => {
  if (element.type === "div") {
    return {
      textContent: ""
    };
  }
  return null;
};

const dataResponse: DataResponse = {
  name: "express",
  version: "1.2.3",
  dependencies: {
    test1: "~1.3.7"
  },
  devDependencies: {
    test2: "0.8.2"
  },
  peerDependencies: {
    test3: "4.2.1"
  }
};

describe("<DisplayComponent />", () => {
  it("renders DisplayComponent with displayList", async () => {
    let wrapper = renderer.create(
      <DisplayComponent displayList={dataResponse} />,
      { createNodeMock }
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  it("renders DisplayComponent with empty displayList", async () => {
    let wrapper = renderer.create(
      <DisplayComponent displayList={{} as DataResponse} />,
      { createNodeMock }
    );

    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
