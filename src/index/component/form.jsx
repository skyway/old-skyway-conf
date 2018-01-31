import React from 'react';
import { observer } from 'mobx-react';

const Form = ({ form, ui, onSubmit }) => (
  <React.Fragment>
    <form
      className="Form"
      noValidate
      onSubmit={ev => {
        ev.preventDefault();
        onSubmit();
      }}
    >
      <label className="Form_NameInput">
        <div
          className="Form_NameInput_Tip"
          data-visible={ui.isFocusInput && form.isNameValid === false}
        >
          半角英数字4-32文字のルーム名を入力してください。
        </div>
        <div className="Form_NameInput_Placeholder">
          <span>conf.webrtc.ecl.ntt.com/#!/</span>
          <span>{form.type}</span>
          <span>/</span>
        </div>
        <input
          type="text"
          className="Form_NameInput_Input"
          placeholder="room-name"
          value={form.name}
          onChange={ev => form.set('name', ev.currentTarget.value)}
          onFocus={() => ui.set('isFocusInput', true)}
          onBlur={() => ui.set('isFocusInput', false)}
        />
      </label>
      <button
        type="submit"
        className="Form_Button"
        disabled={form.isNameValid === false}
      >
        ルーム作成
      </button>
    </form>

    <div className="FormTypeSelector">
      <label className="FormTypeSelector_Item">
        <input
          type="radio"
          name="type"
          value="sfu"
          onChange={() => form.set('type', 'sfu')}
          checked={form.type === 'sfu'}
        />
        <span className="FormTypeSelector_Item_Text">SFU</span>
      </label>
      <label className="FormTypeSelector_Item">
        <input
          type="radio"
          name="type"
          value="mesh"
          onChange={() => form.set('type', 'mesh')}
          checked={form.type === 'mesh'}
        />
        <span className="FormTypeSelector_Item_Text">FullMesh</span>
      </label>
    </div>
  </React.Fragment>
);

export default observer(Form);
