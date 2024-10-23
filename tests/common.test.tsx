import React from "react";
import "jest-canvas-mock";
import renderer from "react-test-renderer";
import { CountrySelect, GetCity, GetCountries, GetState } from "../src";
import fetchmock from "jest-fetch-mock";
fetchmock.dontMock();
describe("Common render", () => {
  it("fetching records", async () => {
    const country = await GetCountries();
    expect(country.length).toBe(250);

    const state = await GetState(101);
    expect(state[0].name).toBe("Andaman and Nicobar Islands");

    const city = await GetCity(101, 4035);
    expect(city[0].name).toBe("Abiramam");
  });
  it("should render correctly without crash", () => {
    const tree = renderer.create(<CountrySelect />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
