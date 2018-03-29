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
                <img
                  className="ChatMessageList_Item_Thumb_Image"
                  src={msg.thumb}
                />
              </div>
              <div className="ChatMessageList_Item_Content">
                <div className="ChatMessageList_Item_Content_Head">
                  <span className="ChatMessageList_Item_Content_HeadName">
                    {msg.dispName}
                  </span>
                  <span className="ChatMessageList_Item_Content_HeadDate">
                    at {msg.dispDate}
                  </span>
                </div>
                <p className="ChatMessageList_Item_Content_Body">{msg.text}</p>
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
