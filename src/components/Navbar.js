import React, { useState } from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Nav>
                <Bars onClick={toggleMenu} />
                <NavMenu isOpen={isOpen}>
                    <NavLink to="/" onClick={() => setIsOpen(false)}>
                        Home
                    </NavLink>
                    <NavLink to="/counting" onClick={() => setIsOpen(false)}>
                        Counting
                    </NavLink>
                    <NavLink to="/counting2" onClick={() => setIsOpen(false)}>
                        Counting 2
                    </NavLink>
                    <NavLink to="/alphabet" onClick={() => setIsOpen(false)}>
                        Alphabet
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
