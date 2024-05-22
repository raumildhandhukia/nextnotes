export default interface NoteType {
  _id: string;
  title: string | null;
  content: string | null;
  userIDs: string[];
  createdAt: Date;
  updatedAt: Date;
}
