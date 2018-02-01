import React from 'react';
import { observer } from 'mobx-react';

const FormMain = ({ form, ui, action }) => (
  <form
    className="FormMain"
    noValidate
    onSubmit={ev => {
      ev.preventDefault();
      action.onSubmitForm();
    }}
  >
    <label className="FormMain_NameInput">
      <div
        className="FormMain_NameInput_Tip"
        data-visible={ui.isFocusInput && form.isNameValid === false}
      >
        半角英数字4-32文字のルーム名を入力してください。
      </div>
      <div className="FormMain_NameInput_Placeholder">
        <span>conf.webrtc.ecl.ntt.com/#!/</span>
        <span>{form.type}</span>
        <span>/</span>
      </div>
      <input
        type="text"
        className="FormMain_NameInput_Input"
        placeholder="room-name"
        value={form.name}
        onChange={ev => action.$update('form.name', ev.target.value)}
        onFocus={() => action.$update('ui.isFocusInput', true)}
        onBlur={() => action.$update('ui.isFocusInput', false)}
      />
    </label>
    <button
      type="submit"
      className="FormMain_Button"
      disabled={form.isNameValid === false}
    >
      ルーム作成
    </button>
  </form>
);

export default observer(FormMain);
