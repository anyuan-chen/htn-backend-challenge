import { context } from "./context.js";
import { UserCreateInput } from "./types.js";

const userResolver = (parent, args, contextValue) => {
  return context.prisma.user.findFirst({
    where: {
      uid: {
        equals: args.uid,
      },
    },
    include: {
      skills: true,
    },
  });
};
const skillFrequencyResolver = (parent, args, contextValue) => {};

const skillsResolver = (parent, args, contextValue) => {
  return context.prisma.skill.findMany();
};

const addSkillsResolver = (parent, args, contextValue) => {};

const userCreateInputResolver = async (
  parent,
  args: { data: UserCreateInput },
  contextValue
) => {
  //console.log(args);
  const skills = args.data.skills.map((skill) => {
    return {
      skill: skill.skill,
      rating: skill.rating,
    };
  });
  return context.prisma.user.create({
    data: {
      name: args.data.name,
      phone: args.data.phone,
      company: args.data.company,
      email: args.data.email,
      skills: {
        create: skills,
      },
    },
    include: {
      skills: true,
    },
  });
};

export {
  userResolver,
  skillFrequencyResolver,
  skillsResolver,
  userCreateInputResolver,
};
