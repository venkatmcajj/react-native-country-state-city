import React, {
  useEffect,
  useState,
} from "react";
import { State } from "../types";
import { GetState } from "../utils";
import Dropdown from "./Dropdown";
import { TextProps, TextStyle, View, ViewStyle } from "react-native";
type PageProps = TextProps & {
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onChange?: (e: State) => void;
  onTextChange?: (e: string) => void;
  defaultValue?: State;
  countryid: number;
  placeHolder?: string;
};

const StateSelect = ({
  containerStyle,
  inputStyle,
  onTextChange,
  defaultValue,
  onChange,
  countryid,
  placeHolder,
  ...props
}: PageProps) => {
  const [states, setStates] = useState<State[]>([]);
  useEffect(() => {
    if (countryid) {
      GetState(countryid).then((data) => {
        setStates(data);
      });
    }
  }, [countryid]);
  return (
    <>
      <View style={containerStyle}>
        <Dropdown
          {...props}
          placeHolder={placeHolder}
          options={states}
          onChange={(value) => {
            if (onChange) {
              onChange(value as State);
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

export default StateSelect;
