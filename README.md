# React-native-country-state-city

A lightweight and easy-to-use React Native library that provides a comprehensive list of countries, states, cities and languages for creating dynamic and searchable dropdowns. Ideal for building forms and input fields that require accurate and up-to-date geographical selections, with seamless integration for improved user experience.

## Installation

```
$ npm install --save react-native-country-state-city
$ yarn add react-native-country-state-city

$ import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-native-country-state-city";

```

## Features

- Easy to set up for real, you can make it work in less than 1minute!
- Super easy to customize
- Can also use it in your own custom UI.
- Autosuggest: a list of matching countries is displayed when the input text changes.
- Country data is provided, State data is provided based on given country id, City data is provided based on given country id and state id.
- Country flag icons.
- onChange and onTextChange callbacks.
- And much more !
- Language dropdown to list and search all languages in English and native too.

## The gist

### Default

```jsx
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-native-country-state-city";
import {Text,View} from 'react-native';
function App() {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  return (
    <View>
      <Text>Country</Text>
      <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
        }}
        placeHolder="Select Country"
      />
      <Text>State</Text>
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
        }}
        placeHolder="Select State"
      />
      <Text>City</Text>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select City"
      />
      <Text>Language</Text>
      <LanguageSelect
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select Language"
      />
    </View>
  );
}
```

### Custom

```jsx
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-native-country-state-city";
import {Picker,Text,View} from 'react-native';
function App() {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);
  const [language, setLanguage] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountries(result);
    });

    GetLanguages().then((result) => {
      setLanguageList(result);
    });
  }, []);
  return (
    <View>
      <Text>Country</Text>
      <Picker
        onValueChange={(val) => {
          const country = stateList[val]; //here you will get full country object.
          setCountryid(country.id);
          GetState(country.id).then((result) => {
            setStateList(result);
          });
        }}
        selectedValue={countryid}
      >
        {countryList.map((item, index) => (
          <Picker.Item label={item.name} key={index} value={index} />
        ))}
      </Picker>
      <Text>State</Text>
      <Picker
        onValueChange={(val) => {
          const state = stateList[val]; //here you will get full state object.
          setStateid(state.id);
          GetCity(countryid, state.id).then((result) => {
            setCityList(result);
          });
        }}
        selectedValue={stateid}
      >
        {stateList.map((item, index) => (
          <Picker.Item label={item.name} key={index} value={index} />
        ))}
      </Picker>
      <Text>City</Text>
      <Picker
        onValueChange={(val) => {
          const city = cityList[val]; //here you will get full city object.
          setCityid(city.id);
        }}
        selectedValue={cityid}
      >
        {cityList.map((item, index) => (
          <Picker.Item label={item.name} key={index} value={index} />
        ))}
      </Picker>
      <Text>Language</Text>
      <Picker
        onValueChange={(val) => {
          setLanguage(val);
        }}
        selectedValue={language}
      >
        {languageList.map((item, index) => (
          <Picker.Item label={item.name} key={index} value={index} />
        ))}
      </Picker>
    </View>
  );
}
```

### City Example

<img src="https://raw.githubusercontent.com/venkatmcajj/react-native-country-state-city/master/example/src/example1.png" alt="React country state city example screenshot"/>

### GetCity - Result

[
{
id: number;
name: string;
latitude: string;
longitude: string;
},
...
]

### State Example

<img src="https://raw.githubusercontent.com/venkatmcajj/react-native-country-state-city/master/example/src/example2.png" alt="React country state city example screenshot"/>

### GetState - Result

[
{
id: number;
name: string;
state_code: string;
latitude: string;
longitude: string;
},
...
]

### Country Example

<img src="https://raw.githubusercontent.com/venkatmcajj/react-native-country-state-city/master/example/src/example3.png" alt="React country state city example screenshot"/>

### GetCountries - Result

[
{
id: number;
name: string;
iso3: string;
iso2: string;
numeric_code: string;
phone_code: number;
capital: string;
currency: string;
currency_name: string;
currency_symbol: string;
native: string;
region: string;
subregion: string;
emoji: string;
emojiU: string;
tld: string;
latitude: string;
longitude: string;
},
...
]

### Language Example

<img src="https://raw.githubusercontent.com/venkatmcajj/react-native-country-state-city/master/example/src/example4.png" alt="React country state city example screenshot"/>

<img src="https://raw.githubusercontent.com/venkatmcajj/react-native-country-state-city/master/example/src/example5.png" alt="React country state city example screenshot"/>


### GetLanguages - Result

[
{
code: string;
name: string;
native: string;
},
...
]

## The Country Select Properties

Properties used to customise the rendering:

| Name               | Type     | Description                                                                             |
| ------------------ | -------- | --------------------------------------------------------------------------------------- |
| defaultValue       | Country  | `optional` The current value: a country object                                          |
| containerClassName | string   | `optional` styles for a container                                                       |
| inputClassName     | string   | `optional` styles for input box                                                         |
| onChange           | function | `optional` The current value: a country object.The argument is the country object       |
| onTextChange       | function | `optional` A callback fired when the input text changes.                                |
| placeHolder        | string   | `optional` Placeholder text displayed in empty input                                    |
| showFlag           | boolean  | `optional` Flags are displayed when true and not displayed when false. default is true. |

## State Select Properties

The same country select properties and additionally

| Name      | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| countryid | number | `required` The id of the selected country object |

## City Select Properties

The same country select properties and additionally

| Name      | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| countryid | number | `required` The id of the selected country object |
| stateid   | number | `required` The id of the selected state object   |

## The Language Select Properties

Properties used to customise the rendering:

| Name               | Type     | Description                                                                                                                                |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| defaultValue       | Country  | `optional` The current value: a country object                                                                                             |
| containerClassName | string   | `optional` styles for a container                                                                                                          |
| inputClassName     | string   | `optional` styles for input box                                                                                                            |
| onChange           | function | `optional` The current value: a country object.The argument is the country object                                                          |
| onTextChange       | function | `optional` A callback fired when the input text changes.                                                                                   |
| placeHolder        | string   | `optional` Placeholder text displayed in empty input                                                                                       |
| displayNative      | boolean  | `optional` value are used to display the languages in native language when is true and display in english when is false. default is false. |

## Demo

[A demo is worth a thousand words](https://venkatmcajj.github.io/react-native-country-state-city/example)

## Contribute

Show your ❤️ and support by giving a ⭐. Any suggestions are welcome! venkatmcajj@gmail.com

## Financial Contributors

Buy me a cup of coffee,

Binance Smart Chain - 0x7C6Bfb7f240f6028Fd2a0039924826eD8B879635
Ethereum - 0x7C6Bfb7f240f6028Fd2a0039924826eD8B879635

## License

Licensed under MIT
