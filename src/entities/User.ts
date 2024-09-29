export default interface User {
  id: number;
  email: string | null;
  username: string | null;
  phone: string;
  first_name: string | null;
  last_name: string | null;
  hasPassword: boolean;
}
