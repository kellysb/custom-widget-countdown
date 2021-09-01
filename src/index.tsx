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

import React from "react";
import ReactDOM from "react-dom";

import { BlockFactory, BlockDefinition, ExternalBlockDefinition, BaseBlock } from "widget-sdk";
import { SimpleCountdownProps, SimpleCountdown } from "./simple-countdown";
import { configurationSchema, uiSchema } from "./configuration-schema";
import pkg from '../package.json'

/**
 * Define wich attributes are handled by the widget. This should be also reflected in configuration schema
 */
const widgetAttributes: string[] = [
  'enddate',
];

/**
 * This factory creates the class which is registered with the tagname in the `custom element registry`
 * Gets the parental class and a set of helper utilities provided by the hosting application.
 */
const factory: BlockFactory = (BaseBlockClass, _widgetApi) => {

  return class SimpleCountdownBlock extends BaseBlockClass implements BaseBlock {
    public constructor() {
      super();
    }

    private get props(): SimpleCountdownProps {
      const attrs = this.parseAttributes<SimpleCountdownProps>();
      return {
        ...attrs,
        contentLanguage: this.contentLanguage,
      };
    }

    public renderBlock(container: HTMLElement): void {
      ReactDOM.render(<SimpleCountdown {...this.props} />, container);
    }

    /**
     * The observed attributes, where the widgets reacts on.
     */
    public static get observedAttributes(): string[] {
      return widgetAttributes;
    }

    /**
     * Callback invoked on every change of an observed attribute. Call the parental method before
     * applying own logic.
     */
    public attributeChangedCallback(...args: [string, string | undefined, string | undefined]): void {
      super.attributeChangedCallback.apply(this, args);
    }
  };
};

/**
 * The definition of the block, to let it successful register to the hosting application
 */
const blockDefinition: BlockDefinition = {
    name: "simple-countdown",
    factory: factory,
    attributes: widgetAttributes,
    blockLevel: 'block',
    configurationSchema: configurationSchema,
    uiSchema: uiSchema,
    label: 'Countdown',
    iconUrl: 'https://cdn.eyo.net/production/image/upload/v1630511338/HUxgk4PBgvdJb2WygLKLOQaiYAtQTz3enSeFbR6JvLG1LwNf5O0Gw4LPnSpixWpHuGHUDhwSYGIcVzXq1g4N6870AKAHFeeVxyjJ5N2JrOoroWUcFj495pA33FsZU21PbGeO7Zop3MWdnlmjoNknpc7d5krAuBNzQUMsal5oPBqBZsdA4lAWByEfaE77PJgu/countdown.png',
};

/**
 * Wrapping definition, which defines meta informations about the block.
 */
const externalBlockDefinition: ExternalBlockDefinition = {
  blockDefinition,
  author: pkg.author,
  version: pkg.version
};

/**
 * This call is mandatory to register the block in the hosting application.
 */
window.defineBlock(externalBlockDefinition);