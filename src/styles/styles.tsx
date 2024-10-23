import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  stdropdownContainer: {
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontFamily: 'Twemoji Mozilla',
  },
  stdropdownInput: {
    height: 50,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stdropdownMenu: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    zIndex: 2,
    maxHeight: 200,
    position: 'absolute',
    top: 50,
    left: 5,
    right: 5,
  },
  stdropdownItem: {
    padding: 5,
    color: 'black',
  },
  stdropdownItemSelected: {
    backgroundColor: '#0d6efd',
    color: '#fff',
  },
  stdropdownTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 5,
  },
  stdropdownTagItem: {
    backgroundColor: '#ddd',
    paddingVertical: 2,
    paddingHorizontal: 4,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stdropdownTagClose: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stsearchBox: {
    padding: 5,
    backgroundColor: 'transparent',
  },
  stsearchBoxInput: {
    width: '100%',
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default styles;
