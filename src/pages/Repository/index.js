import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

// import api from '../../services/api';

// import { Container, Header } from './styles';

export default function Repository({ navigation }) {
  const repo = navigation.getParam('repo');

  return <WebView source={{ uri: repo.html_url }} style={{ flex: 1 }} />;
}

Repository.navigationOptions = ({ navigation }) => ({
  title: `${navigation.getParam('repo').html_url}`,
});

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};
