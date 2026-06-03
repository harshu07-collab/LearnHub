import dynamic from 'next/dynamic';
import ProfileLoading from './loading';

const ProfileClient = dynamic(() => import('./ProfileClient'), {
  loading: () => <ProfileLoading />,
  ssr: true,
});

export default function ProfilePage() {
  return <ProfileClient />;
}
