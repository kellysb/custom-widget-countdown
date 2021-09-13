/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ReactElement } from "react";
import { BlockAttributes } from "widget-sdk";
import CSS from "csstype";

/**
 * React Component
 */
export interface SimpleCountdownProps extends BlockAttributes {
  enddate: string;
  expiredmessage: string;
  colorbg: string;
  colorfont: string;
  borderradius: integer;
}

const calculatedifference=(startdate: number, enddate: string)=>{
  const end = new Date(enddate).getTime();

  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  const distance = end - startdate;

  const days= Math.floor(distance / (day));
  const hours = Math.floor((distance % (day)) / (hour));
  const minutes = Math.floor((distance % (hour)) / (minute));
  const seconds = Math.floor((distance % (minute)) / second);

  return {distance, days, hours, minutes, seconds}
}


export const SimpleCountdown = ({ enddate, expiredmessage, colorbg, colorfont, borderradius }: SimpleCountdownProps): ReactElement => {
	const [actualdate,setactualdate] = React.useState(Date.now());
	const {distance, days, hours, minutes, seconds} = calculatedifference(actualdate,enddate)
	React.useEffect(()=>{
    	setInterval(()=>{setactualdate(Date.now())},1000)
	},[])

  const cardStyle: CSS.Properties = {
    font: "sans-serif",
    display: "block",
    textAlign: "center",
    fontSize: "30px",
    margin: "-20px 0 25px 0",
  };

  const boxStyle: CSS.Properties = {
    borderRadius: borderradius + "px",
    color: colorfont,
    display: "inline-block",
    marginRight: "5px",
    width: "22.5%",
    padding: "15px 0",
    background: colorbg,
  };

  const smalltextStyle: CSS.Properties = {
    paddingTop: "5px",
    fontSize: "16px",
    color: colorfont,
    borderRadius: "3px",
    display: "inline-block",
  }

  return <div style={cardStyle}>
    { distance < 0 ?
      <div><span style={smalltextStyle}>{expiredmessage}</span></div>
      :
      <div>
        <div style={boxStyle}>
          <div>{days}</div>
          <span style={smalltextStyle}>Days</span>
        </div>
        <div style={boxStyle}>
          <div>{hours}</div>
          <span style={smalltextStyle}>Hours</span>
        </div>
        <div style={boxStyle}>
          <div>{minutes}</div>
          <span style={smalltextStyle}>Minutes</span>
        </div>
        <div style={boxStyle}>
          <div>{seconds}</div>
          <span style={smalltextStyle}>Seconds</span>
        </div> 
      </div>
    }
  </div>;
};

