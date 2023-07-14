import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import {useNavigate} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { client } from '../client';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

const Login = () => {

  const navigate = useNavigate()

  const responseGoogle = (response) => {
      var decode = jwt_decode(response.credential)
      localStorage.setItem('user', JSON.stringify(decode))
      const {name, sub, picture} = decode
      // console.log(decode)
      const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
      }

      client.createIfNotExists(doc)
      .then(() => {
        navigate('/', {replace: true})
      })
  }


  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
          <video
            src={shareVideo}
            type='mp4'
            loop
            controls={false}
            autoPlay
            muted
            className='w-full h-full object-cover'
          />
          <div className='absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay'>
            <div className="p-5">
              <img src={logo} width="130px" alt="logo" />
            </div>
            <div className='shadow-2xl'>
              <GoogleOAuthProvider clientId="1069032692829-0u3h3icofq6qrngt4omsk5n7m41c1cdv.apps.googleusercontent.com">
                <GoogleLogin
                  render = {(renderProps) => (
                    <button
                      type='button'
                      className='bg-mainColor'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}

                    >
                      <FcGoogle className='mr-4' /> Sign in with Google                
                    </button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy="single_host_origin"
                />
                </GoogleOAuthProvider>
            </div>
          </div>
      </div>
      </div>
  )
}

export default Login