import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  padding: 32px;
`;

export const Header = styled.View`
  align-items: center;

  border-color: #eee;
  border-bottom-width: 1px;
  padding-bottom: 24px;
`;

export const Avatar = styled.Image`
  height: 100px;
  width: 100px;

  background: #eee;
  border-radius: 50px;
`;

export const Name = styled.Text`
  color: #333;
  font-size: 24px;
  font-weight: bold;
  margin-top: 16px;
  text-align: center;
`;

export const Bio = styled.Text`
  color: #999;
  font-size: 14px;
  line-height: 18px;
  margin-top: 8px;
  text-align: center;
`;

export const Stars = styled.FlatList`
  margin-top: 24px;
`;

export const Starred = styled.View`
  flex-direction: row;
  align-items: center;

  background: #f7f7f7;
  border-radius: 4px;
  margin-bottom: 16px;
  padding: 14px 16px;
`;

export const OwnerAvatar = styled.Image`
  border-radius: 21px;
  height: 42px;
  width: 42px;

  background: #eee;
`;

export const Info = styled.View`
  flex: 1;

  margin-left: 10px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 16px;
  font-weight: bold;
`;

export const Author = styled.Text`
  color: #333;
  font-size: 14px;
  margin-top: 2px;
`;
