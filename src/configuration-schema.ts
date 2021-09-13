/*!
 * Copyright 2021, Staffbase GmbH and contributors.
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

import { UiSchema } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";

/**
 * schema used for generation of the configuration dialog
 * see https://react-jsonschema-form.readthedocs.io/en/latest/ for documentation
 */
export const configurationSchema: JSONSchema7 = {
  required: [
  	"enddate",
  	"expiredmessage"
  ],
  properties: {
    enddate: {
      type: "string",
      title: "End Date",
      format: "date-time",
    },
    expiredmessage: {
    	type: "string",
    	title: "Expired Message",
    	default: "Countdown is done.",
    },
    colorbg: {
    	type: "string",
    	title: "Background Color",
    	default: "#16ab79"
    },
    colorfont: {
    	type: "string",
    	title: "Text Color",
    	default: "#00000"
    },
    borderradius: {
    	type: "integer",
    	title: "Border Radius",
    	default: 5,
    	minimum: 0,
    	maximum: 100
    }
  },
};

/**
 * schema to add more customization to the form's look and feel
 * @see https://react-jsonschema-form.readthedocs.io/en/latest/api-reference/uiSchema/
 */
export const uiSchema: UiSchema = {
  enddate: {
    "ui:help": "Please enter a date in the Unix date format.",
  },
  expiredmessage: {
  	"ui:help": "Enter an expiration message for the coundown."
  },
  colorbg: {
  	"ui:widget": "color",
  	"ui:help": "Choose a color for the background of the countdown boxes."
  },
  colorfont: {
  	"ui:widget": "color",
  	"ui:help": "Choose a color for the text."
  },
  borderradius: {
  	"ui:widget": "range",
  	"ui:help": "Choose a border radius for the countdown boxes."
  },
};
