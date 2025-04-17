import { Client , Databases, ID, Query} from 'appwrite';

const serverClient = new Client();
serverClient.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(serverClient);

export { serverClient, databases , ID, Query};