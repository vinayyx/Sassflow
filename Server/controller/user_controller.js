import sql from "../config/db.js"

export const getusercreation = async (req, res) => {
    try {

        const { userId } = req.auth()

        const creation = await sql`SELECT * FROM creation WHERE user_id =${userId} ORDER BY created_at DESC`;

        res.json({ success: true, creation })




    } catch (error) {

        res.json({ success: false, message: error.message })


    }
}


export const getpubishcreation = async (req, res) => {
    try {


        const creation = await sql`SELECT * FROM creation WHERE publish = true  ORDER BY created_at DESC`;

        res.json({ success: true, creation })




    } catch (error) {

        res.json({ success: false, message: error.message })


    }
}


export const togglelikecreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;


    const [creation] = await sql`SELECT * FROM creation WHERE id = ${id}`;

    if (!creation) {
      return res.json({ success: false, message: "creation not found" });
    }

    const currentlike = creation.likes || [];
    const userIdstr = userId.toString();
    let updatedLikes;
    let message;

    if (currentlike.includes(userIdstr)) {
      // Unlike
      updatedLikes = currentlike.filter((user) => user !== userIdstr);
      message = "creation unliked";
    } else {
      // Like
      updatedLikes = [...currentlike, userIdstr];
      message = "creation liked";
    }

    const formattedArray = `{${updatedLikes.join(",")}}`;

    await sql`UPDATE creation SET likes = ${formattedArray}::text[] WHERE id = ${id}`;

    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
