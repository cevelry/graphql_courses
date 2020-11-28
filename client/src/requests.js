const endpointURL='http://localhost:9000/graphql'
export async function loadCourses(){
  const response=await  fetch(endpointURL,{
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({
            query:`
            {courses{id
                title
                  type
                  level
                  image
                  start_date
                  end_date
                }}
            `
        })
    })
    const responseBody=await response.json()
    return responseBody.data.courses
}