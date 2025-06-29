import { auth } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
// serverAuth is a u-function that is runned async 
const serverAuth = async () => {
  const session = await auth();
  // it is used to track the current user. so we are doing this by checking whether the user is authenticated or not.
 // if(!session?.user?.email) throws an error   means  , if there is no current user , then it means the user is not signed in.
  if (!session?.user?.email) {
    throw new Error("Not signed in");
  }
  //Process to do if signed in , currentUser , through prismadb, existing user is found and checked.
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!currentUser) {
    throw new Error("Not signed in");
  }

  return { currentUser }; // Remember to return a available user at end of the function.
};

export default serverAuth;

/*
This lines of code , is used to check whether the user is validated or not , if validated then the protected route
is accesible by the user.
First it Authenticates
Gets the current user details from the prismadb.
Suppose if the user is not authenticated then, the error is thrown.

The general node js structure would be like this.
const auth = require('./auth);
const prisma = require('./prismadb);

.. here a serverAuth a utility function is created.
this function is used to track the sessioned user;
const serverAuth = async () =>
{
const session = await auth(); // This line calls the current user session, if the user is logged in or not, if yes their details will be stored
// as username.name; username.emial;
// After the session is created, to check whether the session is an active user session or not.
.. To do that , if() condition is used to check;
if(!session?.user?.email)
{
// If not error will be thrown
}
.. Hence in schema, we have declared the emial of the user model as a unique.
const currentUser = await prismadb.user.findUnique({
where:{
email:session.user.email,// It access the user emial. in a nested way.
}
});

suppose if the user is found , and the details are sent to the req body.
Then, the currentUser will be returned.
return {currentUser};

} 
*/