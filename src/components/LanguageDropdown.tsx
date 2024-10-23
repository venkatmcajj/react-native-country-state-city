import React, { Fragment, useEffect, useRef, useState } from "react";
import { Language } from "../types";
import {
  FlatList,
  Text,
  TextInput,
  TextProps,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../styles/styles";

type ComponentProps = TextProps & {
  placeHolder?: string;
  options: Array<Language>;
  inputStyle?: TextStyle;
  onTextChange?: (e: string) => void;
  defaultValue?: Language;
  onChange: (e: Language) => void;
  displayNative?: boolean;
};
const LanguageDropdown = ({
  placeHolder,
  options,
  onChange,
  inputStyle,
  onTextChange,
  defaultValue,
  displayNative,
  ...props
}: ComponentProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Language>();
  const [searchValue, setSearchValue] = useState("");
  const [menus, setMenus] = useState<Array<Language>>([]);
  const searchRef = useRef<TextInput>(null);
  const inputRef = useRef<View>(null);
  useEffect(() => {
    if (defaultValue) setSelectedValue(defaultValue);
  }, [defaultValue]);
  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  const handleInputClick = () => {
    setShowMenu(true);
  };

  const getDisplay = () => {
    if (!selectedValue) {
      return searchValue ? searchValue : "";
    }
    return `${displayNative ? selectedValue.native : selectedValue.name}`;
  };

  const onItemClick = (option: Language) => {
    setSelectedValue(option);
    onChange(option);
  };

  const isSelected = (option: Language) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.code === option.code;
  };

  const onSearch = (e: string) => {
    setSearchValue(e);
    let obj = getOptions(e);
    setMenus(obj);
    setSelectedValue(undefined);
    if (onTextChange) {
      onTextChange(e);
    }
  };
  useEffect(() => {
    let obj = getOptions(searchValue);
    setMenus(obj);
  }, [options]);
  const getOptions = (_txt: string) => {
    if (!_txt) {
      return options;
    }
    return options.filter(
      (option: Language) =>
        option.name.toLowerCase().indexOf(_txt.toLowerCase()) >= 0
    );
  };

  return (
    <Fragment>
      <View style={styles.stdropdownContainer}>
        <TouchableOpacity
          ref={inputRef}
          onPress={handleInputClick}
          style={[styles.stdropdownInput, styles.stsearchBox]}
        >
          <TextInput
            {...props}
            style={inputStyle}
            onChangeText={onSearch}
            value={getDisplay()}
            placeholder={placeHolder}
            onFocus={handleInputClick}
            onBlur={() => setShowMenu(false)}
            ref={searchRef}
          />
          <View>
            <View>
              <Text>▼</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {showMenu && (
        <FlatList
          data={menus}
          keyExtractor={(item) => item.name}
          style={styles.stdropdownMenu}
          contentContainerStyle={{ marginBottom: 10 }}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item: option }) => {
            return (
              <TouchableOpacity
                onPress={() => onItemClick(option)}
                key={option.code}
                style={[
                  styles.stdropdownItem,
                  isSelected(option) && styles.stdropdownItemSelected,
                ]}
              >
                <Text> {displayNative ? option.native : option.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </Fragment>
  );
};

export default LanguageDropdown;
