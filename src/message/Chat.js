import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { authentication} from '../config/firebase'
import { getDatabase, ref, query, orderByChild, equalTo, onValue, off, orderByValue, orderByKey, set, push  } from "firebase/database";
import { doc } from 'firebase/firestore';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const db = getDatabase()
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hey there, I will be at pickup point in 3 minutes.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  useEffect(()=>{
    const chatRef = ref(db, "chat");
    const chatQuery = query(chatRef, orderByChild("createdAt"));

    const onChatValue = onValue(chatQuery, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const chat = Object.values(data);
        setMessages(chat);
      } else {
        setMessages([]);
      }
    });
    return () => {
      off(chatRef, "value", onChatValue);
    };
  }, [])



  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    const {
      _id,
      createdAt,
      text,
      user
    }= messages[0]
    const chatRef = ref(db, 'chat');
    const newChatRef = push(chatRef);
    set(newChatRef, {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: authentication.currentUser.uid
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});