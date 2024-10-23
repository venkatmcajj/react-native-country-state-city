import React, {Fragment, useEffect, useRef, useState} from 'react';
import {City, Country, State} from '../types';
import {
  FlatList,
  Text,
  TextInput,
  TextProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../styles/styles';

type ComponentProps = TextProps & {
  placeHolder?: string;
  options: Array<Country | State | City>;
  inputStyle?: TextStyle;
  onTextChange?: (e: string) => void;
  defaultValue?: Country | State | City;
  onChange: (e: Country | State | City) => void;
  showFlag?: boolean;
};
const Dropdown = ({
  placeHolder,
  options,
  onChange,
  inputStyle,
  onTextChange,
  defaultValue,
  showFlag = true,
  ...props
}: ComponentProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<Country | State | City>();
  const [searchValue, setSearchValue] = useState('');
  const [menus, setMenus] = useState<Array<Country | State | City>>([]);
  const searchRef = useRef<TextInput>(null);
  const inputRef = useRef<View>(null);
  useEffect(() => {
    if (defaultValue) setSelectedValue(defaultValue);
  }, [defaultValue]);
  useEffect(() => {
    setSearchValue('');
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  const handleInputClick = () => {
    setShowMenu(true);
  };

  const getDisplay = () => {
    if (!selectedValue) {
      return searchValue ? searchValue : '';
    }
    return `${
      showFlag && 'emoji' in selectedValue ? selectedValue.emoji : ''
    } ${selectedValue.name}`;
  };

  const onItemClick = (option: Country | State | City) => {
    setSelectedValue(option);
    onChange(option);
  };

  const isSelected = (option: Country | State | City) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue.id === option.id;
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
      (option: Country | State | City) =>
        option.name.toLowerCase().indexOf(_txt.toLowerCase()) >= 0,
    );
  };

  return (
      <Fragment>
        <View style={[styles.stdropdownContainer]}>
          <TouchableOpacity
            ref={inputRef}
            onPress={handleInputClick}
            style={[styles.stdropdownInput, styles.stsearchBox]}>
            <TextInput
              {...props}
              style={[inputStyle, {flex: 1}]}
              onChangeText={onSearch}
              value={getDisplay()}
              placeholder={placeHolder}
              onFocus={handleInputClick}
              onBlur={()=>setShowMenu(false)}
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
            keyExtractor={item => item.name}
            style={styles.stdropdownMenu}
            contentContainerStyle={{marginBottom: 10}}
            keyboardShouldPersistTaps="handled"
            renderItem={({item: option}) => {
              return (
                <TouchableOpacity
                  onPress={() => onItemClick(option)}
                  key={option.name}>
                  <Text
                    style={[
                      styles.stdropdownItem,
                      isSelected(option) && styles.stdropdownItemSelected,
                    ]}>
                    {showFlag && (
                      <Text>{'emoji' in option ? option.emoji : ''} </Text>
                    )}
                    {option.name}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </Fragment>
  );
};

export default Dropdown;
