import React, { useState, useRef, useEffect } from 'react';
import { useCreateUser, useSignIn } from '../../services/api.js';

function Dialog({ isOpen, handleClose }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { mutateAsync: createUser, isLoading: isCreateLoading, error: createError } = useCreateUser();
  const { mutateAsync: signInUser, isLoading: isSignInLoading, error: signInError } = useSignIn();
  const emailInputRef = useRef(null);
  const nameInputRef = useRef(null); // Adicionando uma referência para o campo de nome

  useEffect(() => {
    if (isOpen) {
      emailInputRef.current.focus();
    }
  }, [isOpen, isSignUp]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (isSignUp) {
      await createUser({ name, email });
      localStorage.setItem('crunch-userEmail', email);
      handleClose();
    } else {
      await signInUser({ email });
      localStorage.setItem('crunch-userEmail', email);
      handleClose();
    }
    window.location.reload();
  };

  return (
    <div>
      {isOpen && (
        <div data-testid="dialog-sign" className="modal-signin">
          <div className="modal-signin-content">
            <span className="modal-signin-close-button" onClick={handleClose}>
              ×
            </span>
            <form onSubmit={handleSubmit} className="modal-signin-form">
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  ref={emailInputRef}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your email"
                  required
                />
              </label>
              {isSignUp && (
                <>
                  <label htmlFor="nameInput">
                    Name:
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      placeholder="your name"
                      ref={nameInputRef} // Adicionando a referência ao campo de entrada de nome
                    />
                  </label>
                </>
              )}

              <div className="modal-signin-button-container">
                {isSignUp ? (
                  <>
                    <button type="button" onClick={() => setIsSignUp(false)}>
                      Back
                    </button>

                    <input type="submit" value={isCreateLoading ? '...' : 'Register'} data-testid="register-button" />
                  </>
                ) : (
                  <>
                    <input type="submit" value={isSignInLoading ? '...' : 'Sign In'} />
                    <button type="button" onClick={() => setIsSignUp(true)}>
                      Sign Up
                    </button>
                  </>
                )}
              </div>
              
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dialog;
