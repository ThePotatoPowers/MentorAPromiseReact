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
                    <NavLink to="/counting" >
                        Counting
                    </NavLink>
                    <NavLink to="/counting2" >
                        Counting 2
                    </NavLink>

                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;