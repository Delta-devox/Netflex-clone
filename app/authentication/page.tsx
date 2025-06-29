'use client';
import Image from "next/image"; 
import Input from "../components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState(''); 
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState<'login' | 'register'>('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentValue) => currentValue === 'login' ? 'register' : 'login');
  }, []);// It keeps the value of the variant state in sync with the current value of the variant state. This is useful for toggling between two states, such as 'login' and 'register', without having to manually set the state each time.

  const login = useCallback(async () => {
    try {
      await signIn('credentials', { // custom login provider
        email,
        password,
        redirect: true,
        callbackUrl: '/profiles',
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-center bg-fixed bg-cover">
      <div className="w-full h-full">
        <nav className="px-12 py-5">
          <Image src="/images/logo.png" width={50} height={50} alt="logo" className="h-12 w-auto" />
        </nav>

        <div className="flex justify-center items-center h-full">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center w-full max-w-md lg:max-w-lg rounded-md">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Create an account'}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  label="Username"
                  onChange={(ev: any) => setName(ev.target.value)}
                  id="name"
                  value={name}
                />
              )}
              <Input
                label="Email"
                onChange={(ev: any) => setEmail(ev.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(ev: any) => setPassword(ev.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </div>

            <button
              type="button"
              onClick={variant === 'login' ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === 'login' ? 'Login' : 'Register'}
            </button>

            <div className="flex flex-row justify-center gap-4 mt-8">
              <div onClick={()=>signIn('google',{callbackUrl:'/profiles'})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition cursor-pointer">
                <FcGoogle size={30} />
              </div>
              <div onClick={()=>signIn('github',{callbackUrl:'/profiles'})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition cursor-pointer">
                <FaGithub size={30} />
              </div>{/*To do google credentials, signIn('google',{callbackUrl:'/'}) */}
            </div>

            <p className="text-neutral-500 mt-8 text-center">
              {variant === 'login' ? "New to Netflix?" : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline hover:text-red-400 cursor-pointer"
              >
                {variant === 'login' ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
