import { Section } from "../db/entities/Section.js";
import { SECTION } from "../@types/section.js";

const insertSection = async (payload: SECTION.Item) => {
    try {
    const section =new Section();
    section.name = payload.name;
    await section.save();
    return section;
  } catch (error) {
    throw ("Something went wrong , can't create the section");
  }
}

export{
  insertSection
}