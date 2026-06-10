import pool from "../config/db.js";
import {getCache, serCache, deleteCache} from "../config/redis.js"

 const getAllPoojas =  async ()=>{
  const cashKeey = "all_poojas";
  const cachedData = await getCache(cashKeey);
  if(cachedData){
    console.log("Cache hit for poojas");
    return cachedData;
  }
    console.log("Cache miss for poojas, fetching from DB...");
    const result = await pool.query("SELECT * FROM poojas");
    await serCache(cashKeey, result.rows);

    return result.rows
}

 const createPooja = async (pooja) => {
 
    const { name, price, duration, description, image=null } = pooja;

    console.log(`the inout data is ${name}, ${price}, ${duration}, ${description}, ${image}`)
  
    const payload = { 
      name,
      base_price: price,
      duration,
      description,
      image_url:image
    }
    try {

   const result = await pool.insert("poojas", payload);

   console.log("RESULT:", result);

   return result;

} catch (error) {

   console.error("DB INSERT ERROR:", error);

   throw error;
}
    // const result = await pool.query(
    //   'INSERT INTO poojas (name, base_price, duration, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    //   [name, price, duration, description, image]
    // );
    // return result.rows[0];
  };
  const modifyPooja = async (id, pooja) => {
    const { name, price, duration, description, image } = pooja;
    const payload = {
      name,
      base_price: price,
      duration,
      description,
      image_url:image
    }
    const result = await pool.update("poojas", id, payload);
    console.log("result..."+ result.name)
    return result;
    // const result = await pool.query(
    //   `UPDATE poojas
    //    SET name = $1,
    //        base_price = $2,
    //        duration = $3,
    //        description = $4,
    //        image_url = $5
    //    WHERE id = $6
    //    RETURNING *`,
    //   [name, price, duration, description, image, id]
    // );
    // return result.rows[0];
  };

export {getAllPoojas, createPooja, modifyPooja};
