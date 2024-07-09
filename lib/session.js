const { redirect } = require("next/navigation");

export default async function getSessionUser() {
    const session = await auth();

    if (!session){
        redirect('/login');
        return 
    }

    return session.user
}