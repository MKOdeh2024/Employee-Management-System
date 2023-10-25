import { ADVERTISEMENT } from "../@types/advertisement.js";import { Advertisement } from "../db/entities/Advertisement.js";


const insertAdvertisement = async (payload: ADVERTISEMENT.Item) => {
    try {
        // console.log(employeeId)
        // console.log(payload)
    const advertisement =new Advertisement();
    let time = new Date().getTime();
    let date = new Date(time);
    advertisement.date = new Date(date);
    advertisement.title = payload.title;
    advertisement.content = payload.content;
    console.log(advertisement)
    await advertisement.save();
    return advertisement;
  } catch (error) {
    throw ("Something went wrong , can't create vacation "+error);
  }
}

const getAdvertisements = async () => {
    
    try {
      const advertisements = await Advertisement.find()
      if(advertisements){
        return advertisements;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
    }
};

const getAdvertisement = async (advId:number) => {
    try {
      const advertisement =await Advertisement.findOne({where:{id:advId}});
      if(advertisement){
        return advertisement;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
    }
};

const deleteAdvertisement = async ( advId:number) => {
    try {
      const advertisement =await Advertisement.delete({id:advId});
      if(advertisement.affected !=0){
        return advertisement;
      }
      else 
        return 1;
    } catch (error) {
      return 0;
  
  };
}

const updateAdvertisement= async (payload:ADVERTISEMENT.updateAdvertisement) => {
    try {
      const advertisement = await Advertisement.findOneBy({id:payload.id});
      console.log(advertisement)
        if(advertisement){
            advertisement.title =payload.title || advertisement.title;
            advertisement.date = new Date(payload.date || advertisement.date)
            advertisement.content = payload.content || advertisement.content;
          console.log(advertisement)
          const result = await advertisement.save();
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
  
  };
}

export {
    insertAdvertisement,
    getAdvertisement,
    getAdvertisements,
    deleteAdvertisement,
    updateAdvertisement
}
