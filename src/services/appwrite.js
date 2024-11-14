import { Account, Client, Databases, ID, Query } from "appwrite";

// Appwrite configuration with embedded variables (for debugging purposes only)
const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1", // Your Appwrite endpoint
  projectId: "672cfc4e003a4709c911", // Your Appwrite project ID
  databaseId: "672cfccb002f456cb332", // Your Appwrite database ID
  userCollectionId: "672cfcd0003c114264cd", // Your Appwrite user collection ID
  clientCollectionId: "6733b503002217cbe823", // Your Appwrite client collection ID
};

if (!appwriteConfig.endpoint || !appwriteConfig.projectId) {
  throw new Error("Appwrite environment variables are not defined.");
}

// Initialize Appwrite client
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
export const databases = new Databases(client);

export async function createUser(email, password, name, role = "user") {
  try {
    // Step 1: Create the new account
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error("Account creation failed.");

    // Check if there is already an active session
    let session;
    try {
      session = await account.getSession("current");
    } catch (error) {
      if (
        error.message.includes("Session not found") ||
        error.message.includes("No active session")
      ) {
        // Step 2: Sign in the new user to establish a session
        session = await account.createEmailPasswordSession(email, password);
        if (!session) throw new Error("Failed to create session.");
      } else {
        throw error;
      }
    }

    // Step 3: Create the user document in the database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        role, // Set role to 'admin' or 'user' as needed
      }
    );

    // Return the newUser object
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message || "Error creating user");
  }
}

// Function to sign in a user
export async function signIn(email, password) {
  try {
    // Check if there is already an active session
    const currentSession = await account.getSession("current");
    console.log("User is already signed in.");
    return currentSession; // Use the existing session if available
  } catch (error) {
    // Proceed to create a new session only if no active session exists
    if (
      error.message.includes("Session not found") ||
      error.message.includes("No active session")
    ) {
      try {
        const newSession = await account.createEmailPasswordSession(
          email,
          password
        );
        if (newSession) {
          console.log("New session created successfully.");
          return newSession; // Return the new session if creation is successful
        } else {
          throw new Error("Failed to create new session.");
        }
      } catch (innerError) {
        console.error("Error creating a new session:", innerError.message);
        throw new Error(
          innerError.message || "Error signing in with new session"
        );
      }
    } else {
      console.error("Error checking session:", error.message);
      throw new Error(error.message || "Error checking existing session");
    }
  }
}

// Function to get the current account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    if (
      error.message.includes("Missing scope") ||
      error.message.includes("unauthorized")
    ) {
      console.warn(
        "User is not authenticated. Redirect to login or handle session."
      );
      return null; // Return null if unauthorized
    } else {
      throw new Error(error.message || "Error fetching account");
    }
  }
}

// Function to get the current user document
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount || !currentAccount.$id) {
      throw new Error("No account found.");
    }

    const currentUserResponse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)] // Ensure 'accountId' is the correct field name
    );

    if (!currentUserResponse || currentUserResponse.total === 0) {
      throw new Error("No user document found.");
    }

    const userDocument = currentUserResponse.documents[0];
    if (!userDocument.role) {
      userDocument.role = "user"; // Default role
    }

    return userDocument;
  } catch (error) {
    console.error("Error fetching current user:", error.message);
    return null;
  }
}

// Function to get all users
export async function getAllUsers() {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId
    );
    return response.documents;
  } catch (error) {
    throw new Error("Error fetching users");
  }
}

// Function to sign out the current user
export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw new Error(error.message || "Error signing out");
  }
}

export async function submitTourismForm(formData) {
  try {
    const result = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.clientCollectionId,
      ID.unique(),
      formData
    );
    return result;
  } catch (error) {
    console.error("Failed to submit form data:", error);
    throw new Error("Failed to submit form data");
  }
}
