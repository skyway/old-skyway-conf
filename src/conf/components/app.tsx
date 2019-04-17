import { useContext, useEffect } from 'react';
import * as React from 'react';
import { css } from '@emotion/core';
import { ActionContext } from '../contexts';

export default () => {
  const action = useContext(ActionContext);
  useEffect(() => {
    action.onLoad(navigator.userAgent);
  }, []);

  return (
    <div css={wrapperStyle}>
      <img src="./images/conf/icon-loading.svg" />
    </div>
  );
};

const wrapperStyle = css({
  height: '100vh',
  position: 'relative',
});
