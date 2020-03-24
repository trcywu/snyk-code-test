import React from "react";
import { DataResponse } from "./DisplayComponent";
import renderer, { act } from "react-test-renderer";
import App from "./App";
import SearchComponent from "./SearchComponent";
import DisplayComponent from "./DisplayComponent";

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

const createNodeMock = (element: React.ReactElement<any, string>) => {
  if (element.type === "div") {
    return {
      textContent: ""
    };
  }
  return null;
};

describe("fetchNodePackage", () => {
  test("calls api and populates dataList prop", async () => {
    // mock fetch
    const mockJsonPromise = Promise.resolve(dataResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise
    });
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    // render component
    const wrapper = renderer.create(<App />, { createNodeMock });

    // simulate onSearch
    const instance = wrapper.root;
    const search = instance.findByType(SearchComponent);
    await act(async () => {
      search.props.onSearch("test");
    });

    expect(window.fetch).toHaveBeenCalledWith("/api/packages/test");
    expect(instance.findByType(DisplayComponent).props.displayList).toEqual(
      dataResponse
    );
  });
});
