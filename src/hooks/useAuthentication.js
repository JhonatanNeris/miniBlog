import { db } from '../firebase/config'

import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    singOut,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';

export const useAuthentication = () =>{
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // cleanup
    // deal with memory leak

    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled(){
        if (cancelled){
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled()

        setLoading(true)
        setError(null)

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false);

            return user

        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message) 
            
            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "As senhas precisam conter pelo menos 6 caracteres."
            }else if(error.message.includes("email-already")){
                systemErrorMessage = "E-mail já cadastrado."
            }else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }
            setLoading(false);
            setError(systemErrorMessage)
        }

    };

    // Função de logout - sing out 

    const logout = () => {
        checkIfIsCancelled();

        signOut(auth)
    }

    //Função de login - sign in 
    const login = async(data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false);
            setError(false)

        } catch (error) {
            let systemErrorMessage;

            console.log(error.message);
            console.log(error.code);
            console.log(typeof error.message);
            console.log(error.message.includes("user-not"));

            if(error.message.includes("user-not-found")){
                systemErrorMessage = "Usuário não encontrado.";
            } else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Senha Incorreta.";
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde.";
            }     
            
            console.log(systemErrorMessage)
            setError(systemErrorMessage)
            
        }

        console.log(error)
        setLoading(false)
    }

    useEffect(()=>{
        return () => setCancelled(true)
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
};