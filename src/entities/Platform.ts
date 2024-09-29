export default interface Platform {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
  update_at?: Date;
}
