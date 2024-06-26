"use client"

import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const userId = 'user-id';
// const token = 'authentication-token';
// const user: User = { id: userId };

// const client = new StreamVideoClient({ apiKey, user, token });
// const call = client.call('default', 'my-first-call');
// call.join({ create: true });

type ProviderProps = {
    children: React.ReactNode;
}

export const StreamVideoProvider = ({ children }: ProviderProps) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();

    // getting info of a currently logged in user
    const {user, isLoaded} = useUser()
       
    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!apiKey) throw new Error("Stream API key mising");

        const client = new StreamVideoClient({
            apiKey, 
            user:{
                id: user?.id,
                name: user?.username || user?.id, 
                image: user?.imageUrl
            }, 
            tokenProvider: tokenProvider
        })

        setVideoClient(client)
    }, [user, isLoaded]);

    if(!videoClient) return <Loader /> 

  return (
    <StreamVideo client={videoClient}>
        {children}
    </StreamVideo>
  );
};

export default StreamVideoProvider