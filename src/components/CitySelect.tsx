import React, {
  useEffect,
  useState,
} from "react";
import { City } from "../types";
import { GetCity } from "../utils";
import Dropdown from "./Dropdown";
import { TextProps, TextStyle, View, ViewStyle } from "react-native";
type PageProps = TextProps & {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onChange?: (e: City) => void;
  onTextChange?: (e: string) => void;
  defaultValue?: City;
  countryid: number;
  stateid: number;
  placeHolder?: string;
};

const CitySelect = ({
  containerStyle,
  inputStyle,
  onTextChange,
  defaultValue,
  onChange,
  countryid,
  stateid,
  placeHolder,
  ...props
}: PageProps) => {
  const [cities, setCities] = useState<City[]>([]);
  useEffect(() => {
    if (countryid) {
      GetCity(countryid, stateid).then((data) => {
        setCities(data);
      });
    }
  }, [countryid, stateid]);
  return (
    <>
      <View style={containerStyle}>
        <Dropdown
          {...props}
          placeHolder={placeHolder}
          options={cities}
          onChange={(value) => {
            if (onChange) {
              onChange(value as City);
            }
          }}
          onTextChange={onTextChange}
          defaultValue={defaultValue}
          inputStyle={inputStyle}
        />
      </View>
    </>
  );
};

export default CitySelect;
