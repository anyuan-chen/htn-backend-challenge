import { Skill } from "@prisma/client";
import { context } from "./context.js";
import { UserCreateInput, UserUpdateInput } from "./types.js";

const allUserResolver = (parent, args, contextValue) => {
  return context.prisma.user.findMany();
};

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

const skillFrequencyResolver = (parent, args, contextValue) => {
  return context.prisma.skill.count;
};

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
const updateUserResolver = async (
  parent,
  args: { data: UserUpdateInput; uid: number },
  contextValue
) => {
  if (args.data.skills) {
    //can't do upsert many here which would be more efficient

    //Two options:
    //Option 1 (implemented)
    //read all the skills which already exist for the users
    //filter to two lists:
    //update all skills that already exist
    //create new skills that doen't exist

    const all_skills = await context.prisma.skill.findMany({
      where: {
        user_uid: args.uid,
      },
    });
    let update_list: Skill[] = [];
    let create_list: Skill[] = [];
    for (const skill of all_skills) {
      if (
        all_skills.find(
          (unknown_skill) => skill.skill == unknown_skill.skill
        ) != undefined
      ) {
        update_list.push(skill);
      } else {
        create_list.push(skill);
      }
    }
    update_list.forEach((skill) => {
      context.prisma.skill.update({
        where: {
          uid: skill.uid,
        },
        data: {
          skill: skill.skill,
          rating: skill.rating,
        },
      });
    });
    create_list.forEach((skill) => {
      context.prisma.skill.create({
        data: skill,
      });
    });
  }
  return context.prisma.user.update({
    where : {
        uid: args.uid
    }, 
    data: {
        name: args.data.name,
        company: args.data.company,
        phone: args.data.phone,
        email: args.data.email,
    }
  })
};

export {
  userResolver,
  skillFrequencyResolver,
  skillsResolver,
  userCreateInputResolver,
  allUserResolver,
  updateUserResolver,
};
