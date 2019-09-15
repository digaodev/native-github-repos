import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({ navigation }) {
  const [page, setPage] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stars, setStars] = useState([]);
  const [errors, setErrors] = useState(null);

  const user = navigation.getParam('user');

  async function getStars() {
    try {
      const { data } = await api.get(
        `/users/${user.login}/starred?page=${page + 1}`,
      );
      setStars(currentStars => [...currentStars, ...data]);
    } catch (error) {
      setErrors(error.message);
    }

    setPage(currentPage => currentPage + 1);
    setIsRefreshing(false);
  }

  async function loadMore() {
    getStars();
  }

  function renderListFooter() {
    return (
      <View style={{ alignSelf: 'center', marginVertical: 20 }}>
        <ActivityIndicator color="#7159c1" />
      </View>
    );
  }

  function refreshList() {
    setIsRefreshing(true);

    setStars([]);
    setPage(0);
    getStars();
  }

  function handleNavigate(item) {
    navigation.navigate('Repository', { repo: item });
  }

  useEffect(() => {
    getStars();
  }, []);

  if (errors)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{errors}</Text>
      </View>
    );

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars
        onRefresh={refreshList} // Função dispara quando o usuário arrasta a lista pra baixo
        refreshing={isRefreshing} // Variável que armazena um estado true/false que representa se a lista está atualizando
        onEndReachedThreshold={0.1} // Carrega mais itens quando chegar em 10% do fim
        onEndReached={loadMore} // Função que carrega mais itens
        ListFooterComponent={renderListFooter}
        data={stars}
        keyExtractor={star => String(star.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleNavigate(item)}>
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

User.navigationOptions = ({ navigation }) => ({
  title: `${navigation.getParam('user').name}`,
});

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};
