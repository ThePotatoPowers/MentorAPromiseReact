import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,

} from "./NavbarElements";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />

                <NavMenu>
                    <NavLink to="/" >
                        Home
                    </NavLink>
                    <NavLink to="/counting" activeStyle>
                        Counting
                    </NavLink>
                    <NavLink to="/counting2" activeStyle>
                        Counting 2
                    </NavLink>

                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;