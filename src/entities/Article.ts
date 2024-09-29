export default interface Article {
  id: number;
  title: string;
  content: string;
  user_id: number;
  image: string;
  view: number;
  created_at: Date;
  updated_at: Date;
}
