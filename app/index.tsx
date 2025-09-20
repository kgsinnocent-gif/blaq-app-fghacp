
import { Redirect } from 'expo-router';

export default function Index() {
  console.log('Index screen loaded, redirecting to splash');
  return <Redirect href="/splash" />;
}
