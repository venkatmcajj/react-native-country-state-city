
import React, { useState } from 'react';
import {
  Text,
  View
} from 'react-native';
import { StateSelect,CountrySelect, CitySelect, LanguageSelect } from 'react-native-country-state-city';
function App(): React.JSX.Element {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  return (
    <View style={{flex:1,backgroundColor:'white',padding:5}}>
      <Text style={{marginVertical:5}}>Country</Text>
      <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
        }}
        placeHolder="Select Country"
      />
      <Text style={{marginTop:10,marginBottom:5}}>State</Text>
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
        }}
        placeHolder="Select State"
      />
      <Text style={{marginTop:10,marginBottom:5}}>City</Text>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select City"
      />
      <Text style={{marginTop:10,marginBottom:5}}>Language</Text>
      <LanguageSelect
      displayNative
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select Language"
      />
    </View>
  );
}

export default App;
