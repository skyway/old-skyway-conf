import React from 'react';

const Form = () => (
  <React.Fragment>
    <form className="Form">
      <label className="Form_NameInput">
        <div className="Form_NameInput_Placeholder">
          <span>conf.webrtc.ecl.ntt.com/#!/</span>
          <span>$type</span>
          <span>/</span>
        </div>
        <input
          type="text"
          className="Form_NameInput_Input"
          placeholder="room-name"
          required
          pattern="^[0-9a-z-_]{4,32}$"
        />
      </label>
      <button type="submit" className="Form_Button">ルーム作成</button>
    </form>

    <div className="FormTypeSelector">
      <label className="FormTypeSelector_Item">
        <input type="radio" name="type" value="sfu" defaultChecked />
        <span className="FormTypeSelector_Item_Text">SFU</span>
      </label>
      <label className="FormTypeSelector_Item">
        <input type="radio" name="type" value="mesh" />
        <span className="FormTypeSelector_Item_Text">FullMesh</span>
      </label>
    </div>
  </React.Fragment>
);

export default Form;
