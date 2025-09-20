
import { useEffect } from 'react';
import { Redirect } from 'expo-router';

export default function Index() {
  useEffect(() => {
    console.log('App starting, redirecting to splash screen');
  }, []);

  return <Redirect href="/splash" />;
}
