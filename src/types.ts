interface UserCreateInput {
  name: string;
  phone: string;
  company?: string;
  email: string;
  skills?: [SkillCreateInput];
}
interface SkillCreateInput {
  skill: string;
  rating: number;
}
export { UserCreateInput, SkillCreateInput };
