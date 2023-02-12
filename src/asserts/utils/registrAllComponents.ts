import { registerComponent } from '../../core';
import { Button, ButtonSVG } from '../../components/button';
import { Form } from '../../components/form';
import Input from '../../components/input';
import Layout from '../../components/layout';
import ErrorComponent from '../../components/error';
import { Card } from '../../components/card/card';
import { Avatar } from '../../components/avatar/avatar';
import Chat_layout from '../../components/chat-layout';
import ChatFeed from '../../components/chat-feed';
import Message from '../../components/message';
import MessageFeed from '../../components/message-feed';
import Modal from '../../components/modal';
import Popup from '../../components/popup';
import ChatList from '../../components/chat-list';

export function regAll() {
    registerComponent(Button);
    registerComponent(ButtonSVG);
    registerComponent(Form);
    registerComponent(Input);
    registerComponent(Layout);
    registerComponent(ErrorComponent);
    registerComponent(Card);
    registerComponent(Avatar);
    registerComponent(Chat_layout);
    registerComponent(ChatFeed);
    registerComponent(Message);
    registerComponent(MessageFeed);
    registerComponent(Modal);
    registerComponent(Popup);
    registerComponent(ChatList);
}
