import React from 'react'
import CustomButton from '../CustomButton';

const SocialSignInButtons = () => {
    const handleSignInWithFacebook = () => {
        console.warn('sign in with facebook');
    }
    const handleSignInWithGoogle = () => {
        console.warn('sign in with Google');
    }
    const handleSignInWithApple = () => {
        console.warn('sign in with Apple');
    }

    return (
        <>
            <CustomButton
                onPress={handleSignInWithFacebook}
                text="Ingresar con Facebook"
                backgroundColor="#E7EAF4"
                foregroundColor="#4765A9"
            />
            <CustomButton
                onPress={handleSignInWithGoogle}
                text="Ingresar con Google"
                backgroundColor="#FAE9EA"
                foregroundColor="#DD4044"
            />
            <CustomButton
                onPress={handleSignInWithApple}
                text="Ingresar con Apple"
                backgroundColor="#E3E3E3"
                foregroundColor="#363636"
            />
        </>
    );
}

export default SocialSignInButtons;