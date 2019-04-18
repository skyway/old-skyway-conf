import * as React from "react";
import { useState } from "react";
import { css } from "@emotion/core";
import { globalColors } from "../../shared/global-style";
import {
  maxRoomNameLength,
  roomNameRe,
  isValidRoomName
} from "../../shared/validate";
import { enterConference } from "../effects";

export default function RoomCreate() {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("sfu");
  const [isRoomNameValid, setRoomNameValid] = useState(true);

  return (
    <form
      css={wrapperStyle}
      onSubmit={ev => {
        ev.preventDefault();
        enterConference(roomType, roomName);
      }}
    >
      <div css={itemStyle}>
        <div>NAME:</div>
        <input
          type="text"
          placeholder="room-name"
          value={roomName}
          onChange={ev => setRoomName(ev.target.value)}
          onBlur={() => setRoomNameValid(isValidRoomName(roomName))}
          required
          maxLength={maxRoomNameLength}
          pattern={roomNameRe}
          css={roomNameStyle}
        />
      </div>
      <span css={tipStyle}>
        {isRoomNameValid ? "" : "half width, 4~16 characters are required!"}
      </span>

      <div css={itemStyle}>
        <div>TYPE:</div>
        {["mesh", "sfu"].map(type => (
          <label key={type} css={roomTypeStyle}>
            <input
              type="radio"
              onChange={() => setRoomType(type)}
              value={roomType}
              checked={roomType === type}
              name="room-type"
            />{" "}
            {type}
          </label>
        ))}
      </div>

      <div css={buttonWrapStyle}>
        <button
          css={createButtonStyle}
          type="submit"
          disabled={!isValidRoomName(roomName)}
        >
          <i className="material-icons">meeting_room</i>
          <span>CREATE ROOM</span>
        </button>
      </div>
    </form>
  );
}

const wrapperStyle = css({
  margin: "24px auto 40px",
  backgroundColor: globalColors.white,
  border: `1px solid ${globalColors.gray}`,
  padding: 24,
  borderRadius: 2
});

const itemStyle = css({
  display: "flex",
  alignItems: "center",
  height: 40,
  marginBottom: 4,
  "& > div": {
    width: 80
  }
});

const roomNameStyle = css({
  appearance: "none",
  border: 0,
  borderBottom: `1px solid ${globalColors.gray}`,
  fontSize: 20,
  padding: "4px 8px",
  "&:focus": {
    borderColor: globalColors.blue
  }
});

const tipStyle = css({
  color: globalColors.red,
  fontSize: 12
});

const roomTypeStyle = css({
  margin: "0 8px",
  fontSize: 20,
  "& > input": {
    verticalAlign: "middle"
  }
});

const buttonWrapStyle = css({
  marginTop: 24
});

const createButtonStyle = css({
  display: "inline-flex",
  alignItems: "center",
  backgroundColor: globalColors.blue,
  color: globalColors.white,
  height: 40,
  border: 0,
  cursor: "pointer",
  padding: "0 24px",
  fontSize: 16,
  borderRadius: 2,
  "&:hover": {
    opacity: 0.8
  },
  "&:disabled": {
    pointerEvents: "none",
    backgroundColor: globalColors.gray
  }
});
