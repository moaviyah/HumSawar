import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from './MessageStyles';

const Messages_data = [
  {
    id: '1',
    userName: 'Taimoor Hassan',
    userImg: require('../pics/Taimoor-pic.png'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, I will be at pickup point in 3 minutes.',
  },
  {
    id: '2',
    userName: 'Muhammad Saad',
    userImg: require('../pics/Ch-pic.png'),
    messageTime: '2 hours ago',
    messageText:
      'I will pick you up at 8.30am sharp',
  },
  {
    id: '3',
    userName: 'Hammad',
    userImg: require('../pics/Cr-pic.png'),
    messageTime: '1 hours ago',
    messageText:
      'I will be late by five minutes',
  },
  {
    id: '4',
    userName: 'Hamad Sindhi',
    userImg: require('../pics/Hammad-pic.png'),
    messageTime: '1 day ago',
    messageText:
      'It was nice sharing ride with you',
  },
  {
    id: '5',
    userName: 'Sir Tariq',
    userImg: require('../pics/Sir-Tariq-pic.png'),
    messageTime: '2 days ago',
    messageText:
      'Hope to see you again!',
  },
];

const Messages = ({navigation}) => {
    return (
      <Container>
        <FlatList 
          data={Messages_data}
          keyExtractor={item=>item.id}
          renderItem={({item}) => (
            <Card onPress={() => navigation.navigate('Chat', {userName: item.userName})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.userImg} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.userName}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.messageText}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    );
};

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});