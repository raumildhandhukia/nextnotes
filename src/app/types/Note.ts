export default interface NoteType {
  _id: string;
  id: string;
  userId: string;
  title: string | null;
  content: string | null;
  userIDs: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserData {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}
