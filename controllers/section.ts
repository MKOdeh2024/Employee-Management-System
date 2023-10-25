import { Section } from "../db/entities/Section.js";
import { SECTION } from "../@types/section.js";
import { Employee } from "../db/entities/Employee.js";

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

const getSections = async () => {
  try {
    const sections = await Section.find()
    if(sections){
      return sections;
    }
    else 
      return 1;
  } catch (error) {
    return 0;
  }
};

const getSection = async (secId:number) => {
  try {
    const section =await Section.findOne({where:{id:secId}});
    if(section){
      return section;
    }
    else 
      return 1;
  } catch (error) {
    return 0;
  }
};

const deleteSection = async (secId:number) => {
  try {
    const section =await Section.findOneBy({id:secId});
    if(section){
      const employees = await Employee.findOneBy({section:secId});
      console.log(employees)
      if(employees){
        return 3;
      }else return 2;
    }
    else 
      return 1;
  } catch (error) {
    return 0;

};
}

const updateSection = async (payload:SECTION.updateSection) => {

  try {
    const section = await Section.findOneBy({id:payload.id});
    console.log(section)
      if(section){
        section.name =payload.name || section.name;
        console.log(section)
        const result = await section.save();
        if(result){
          return result;
        }else {
          return 2;
        }
    }else 
        return 1;
  
  } catch (error) {
    console.log(error)
    return 0;
}}



export{
  insertSection,
  getSection,
  getSections,
  deleteSection,
  updateSection
}