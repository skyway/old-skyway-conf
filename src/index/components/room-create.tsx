import * as React from 'react';
import { css } from '@emotion/core';

const style = css({
  textAlign: 'center',
});

export default () => (
  <div css={style}>
    <div>
      <input type="text" />
      <button>Create</button>
    </div>
    <div>
      <label>
        <input type="radio" name="room-type" /> Mesh
      </label>
      <label>
        <input defaultChecked type="radio" name="room-type" /> SFU
      </label>
    </div>
  </div>
);
