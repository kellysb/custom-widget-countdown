import React from "react"
import {screen, render} from "@testing-library/react"

import {SimpleCountdown} from "./simple-countdown";

describe("SimpleCountdown", () => {
    it("should render the component", () => {
        render(<SimpleCountdown contentLanguage="en_US" message="World"/>);

        expect(screen.getByText(/Hello World/)).toBeInTheDocument();
    })
})
