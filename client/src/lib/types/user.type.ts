interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  type: "user" | "owner",
  usageLimit: {
    notes: number,
    chat: number,
  }
}

export default User;
