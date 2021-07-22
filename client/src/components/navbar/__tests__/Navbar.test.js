import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Navbar from '../Navbar.js';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';




const user = {
    email: "johndoe@me.com",
    email_verified: true,
    sub: "google-oauth2|12345678901234",
};

const adminUser = {
    email: "johndoe@me.com",
    email_verified: true,
    sub: "google-oauth2|12345678901234",
    "https://<<API_URL>>/roles": ["admin", "superuser"],
};


jest.mock("@auth0/auth0-react");

describe('components/NavBar - logged in', () => {
    beforeEach(() => {
      // Mock the Auth0 hook and make it return a logged in state
      useAuth0.mockReturnValue({
        isAuthenticated: true,
        user,
        logout: jest.fn(),
        loginWithRedirect: jest.fn(),
      });
    });

    test('homepage navbar has an apply, sign in, and sign up button', () => {
        render(<Router><Navbar props={{employerNavBar: false}}></Navbar></Router>);
        const loginButton = screen.getAllByTestId("navbar-login-button");
        const applyButton = screen.getAllByTestId("navbar-apply-button");
        const signupButton = screen.getAllByTestId("navbar-signup-button");
        expect(loginButton).toBeDefined();
        expect(applyButton).toBeDefined();
        expect(signupButton).toBeDefined();
    })
    
    test('should render login on navbar', () => {
        const mockLogin = jest.fn() 
        const { getByTestId } = render(<Router><Navbar props={{employerNavBar: false}}></Navbar></Router>)
        const clickIndicator = getByTestId('navbar-login-button')
        expect(screen.findAllByText('Log in')).toBeDefined;
        expect(mockLogin).not.toBeCalledTimes(1);
    })

    test('should render signup on navbar', () => {
        const mockSignup = jest.fn() 
        const { getByTestId } = render(<Router><Navbar props={{employerNavBar: false}}></Navbar></Router>)
        const clickIndicator = getByTestId('navbar-signup-button')
        expect(screen.findAllByText('Sign Up')).toBeDefined;
        expect(mockSignup).not.toBeCalledTimes(1);
    })

    test('should render apply on navbar', () => {
        const mockApply = jest.fn() 
        const { getByTestId } = render(<Router><Navbar props={{employerNavBar: false}}></Navbar></Router>)
        const clickIndicator = getByTestId('navbar-apply-button')
        expect(screen.findAllByText('Apply')).toBeDefined;
        expect(mockApply).not.toBeCalledTimes(1);
    })

    test('should not render login on navbar', () => {
        expect(screen.findAllByText('Log Out')).not.toBeDefined;
    })

})



