import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ProfileCard from './profilecard'; 
//useRouter, onClick function, useEffect cannot be used in server components, so we use redirect from next/navigation
// instead of directly, using client-side,create a useClient component in the same side.
// Call the component directly in the server component, if the user exists or logged in , it shows the user name, session?.user.name
const Profiles = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/authentication');
  }

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who is watching?</h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <ProfileCard name={session.user?.name || 'Guest'} />
        </div>
      </div>
    </div>
  );
};

export default Profiles;
