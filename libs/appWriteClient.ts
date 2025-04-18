import { Client , Account, Databases, ID, Query} from 'appwrite';

const serverClient = new Client();
serverClient.setEndpoint(process.env.NEXT_PUBLIC_REGION_URL as string).setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

const databases = new Databases(serverClient);
const anonAccount = new Account(serverClient);

export { serverClient, databases, anonAccount , ID, Query};