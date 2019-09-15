import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;

  padding: 32px 24px;
`;

export const Form = styled.View`
  flex-direction: row;

  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;

  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 16px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;

  background: #7159c1;
  border-radius: 4px;
  margin-left: 16px;
  padding: 0 16px;
  opacity: ${props => (props.isLoading ? 0.7 : 1)};
`;

export const ErrorMessage = styled.Text`
  /* flex: 1; */

  color: red;
  font-size: 16px;
  margin: 8px;
  padding: 8px;
  text-align: center;
`;

export const List = styled.FlatList`
  margin-top: 16px;
`;

export const User = styled.View`
  align-items: center;

  margin: 0 24px 32px;
`;

export const Avatar = styled.Image`
  background: #eee;
  border-radius: 32px;
  height: 64px;
  width: 64px;
`;

export const Name = styled.Text`
  color: #333;
  font-size: 14px;
  font-weight: bold;
  margin-top: 8px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #999
  font-size: 12px;
  line-height: 16px;
  margin-top: 8px;
  text-align: left
`;

export const ProfileButton = styled(RectButton)`
  align-self: stretch;
  align-items: center;
  justify-content: center;

  background: #7159c1;
  border-radius: 4px;
  height: 40px;
  margin-top: 16px;
`;

export const ProfileButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;
