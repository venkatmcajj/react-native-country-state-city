import React, {
  useEffect,
  useState,
} from "react";
import { Country } from "../types";
import { GetCountries } from "../utils";
import Dropdown from "./Dropdown";
import { TextProps, TextStyle, View, ViewStyle } from "react-native";

type PageProps = TextProps & {
  defaultValue?: Country;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onChange?: (e: Country) => void;
  onTextChange?: (e: string) => void;
  placeHolder?: string;
  showFlag?: boolean;
};
const CountrySelect = ({
  containerStyle,
  inputStyle,
  onTextChange,
  defaultValue,
  onChange,
  placeHolder,
  showFlag,
  ...props
}: PageProps) => {
  const [countriesunfiltered, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    GetCountries().then((data) => {
      setCountries(data);
    });
  },[]);
  return (
    <>
      <View style={containerStyle}>
        <Dropdown
          {...props}
          placeHolder={placeHolder}
          options={countriesunfiltered}
          onChange={(value) => {
            if (onChange) {
              onChange(value as Country);
            }
          }}
          showFlag={showFlag}
          onTextChange={onTextChange}
          defaultValue={defaultValue}
          inputStyle={inputStyle}
        />
      </View>
    </>
  );
};

export default CountrySelect;
