import React, {
  useEffect,
  useState,
} from "react";
import { Language } from "../types";
import { GetLanguages } from "../utils";
import LanguageDropdown from "./LanguageDropdown";
import { TextProps, TextStyle, View, ViewStyle } from "react-native";

type PageProps = TextProps & {
  defaultValue?: Language;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  onChange?: (e: Language) => void;
  onTextChange?: (e: string) => void;
  placeHolder?: string;
  displayNative?: boolean;
};
const LanguageSelect = ({
  containerStyle,
  inputStyle,
  onTextChange,
  defaultValue,
  onChange,
  placeHolder,
  displayNative,
  ...props
}: PageProps) => {
  const [languagesunfiltered, setLanguages] = useState<Language[]>([]);
  useEffect(() => {
    GetLanguages().then((data) => {
      setLanguages(data);
    });
  }, []);
  return (
    <>
      <View style={containerStyle}>
        <LanguageDropdown
          {...props}
          placeHolder={placeHolder}
          options={languagesunfiltered}
          onChange={(value) => {
            if (onChange) {
              onChange(value as Language);
            }
          }}
          displayNative={displayNative}
          onTextChange={onTextChange}
          defaultValue={defaultValue}
          inputStyle={inputStyle}
        />
      </View>
    </>
  );
};

export default LanguageSelect;
