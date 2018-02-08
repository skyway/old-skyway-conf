import React from 'react';
import { observer } from 'mobx-react';

class ChatMessageList extends React.Component {
  constructor() {
    super();
    this._ref = null;
  }

  render() {
    const { chat } = this.props;
    return (
      <ul className="ChatMessageList" ref={ref => (this._ref = ref)}>
        {chat.messages.map(msg => (
          <li key={msg.id}>
            <div className="ChatMessageList_Item">
              <div className="ChatMessageList_Item_Thumb">
                <img src={msg.thumb} />
              </div>
              <div>
                <p>{msg.dispName}</p>
                <p>{msg.text}</p>
                <div>{msg.dispDate}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  componentWillReact() {
    this._ref &&
      requestAnimationFrame(
        () => (this._ref.scrollTop = this._ref.scrollHeight)
      );
  }
}

export default observer(ChatMessageList);
