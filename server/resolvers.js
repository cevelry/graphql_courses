const db=require('./data/courses.json')

const Query={
   courses:()=>db.courses.map(x=>x)
}
module.exports={Query}

