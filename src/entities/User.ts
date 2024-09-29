export default interface User {
  id: number,
  username: string,
  phone: number,
  email: string,
  first_name: string,
  last_name: string,
  active: boolean,
  role: string,
  hasPassword?: boolean,
  createdAt: Date,
  updatedAt: Date | null,
  deletedAt: Date | null
}
