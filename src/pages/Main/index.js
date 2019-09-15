import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  ErrorMessage,
} from './styles';

export default function Main(props) {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [errors, setErrors] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUsersFromStorage() {
      const savedUsers = await AsyncStorage.getItem('users');

      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
      }
    }

    getUsersFromStorage();
  }, []);

  useEffect(() => {
    async function saveUsersToStorage() {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }

    saveUsersToStorage();
  }, [users]);

  function handleInput(text) {
    setInputValue(text);
  }

  async function handleAddUser() {
    if (isLoading || inputValue === '') return;

    setIsLoading(true);

    try {
      const { data } = await api.get(`/users/${inputValue}`);

      const newUser = {
        name: data.name,
        login: data.login,
        bio: data.bio,
        avatar: data.avatar_url,
      };

      setUsers(currentUsers => [newUser, ...currentUsers]);

      setInputValue('');
      Keyboard.dismiss();
    } catch (error) {
      setErrors('Usuário não encontrado');
    }
    setIsLoading(false);
  }

  function handleNavigate(user) {
    props.navigation.navigate('User', { user });
  }

  return (
    <Container>
      <Form>
        <Input
          autocorrect={false}
          autoCapitalize="none"
          autoCompleteType="off"
          placeholder="Adicionar usuário"
          value={inputValue}
          onChangeText={handleInput}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />

        <SubmitButton isloading={isLoading} onPress={handleAddUser}>
          <View accessible>
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </View>
        </SubmitButton>
      </Form>
      <ErrorMessage>{errors}</ErrorMessage>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton onPress={() => handleNavigate(item)}>
              <View accessible>
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </View>
            </ProfileButton>
          </User>
        )}
      />

      {/* <ProfileButton onPress={() => AsyncStorage.clear()}>
        <View accessible>
          <ProfileButtonText>Clear</ProfileButtonText>
        </View>
      </ProfileButton> */}
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Usuários',
};

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
