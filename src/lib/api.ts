import axios from "axios"

export const axiosInstance = () => {
    return axios.create({
        baseURL: "https://api.storyblok.com/v2/cdn/stories",
        params: {
            token: process.env.STORYBLOK_PREVIEW_TOKEN!,
            version: "draft"
        },
        timeout: 5000
    })
}

export const fetchAllPosts = async (per_page = 10, page = 1) => {
    try {
        const { data } = await axiosInstance().get("/", {
            params: {
                page,
                per_page
            }
        });
        return data?.stories;
    } catch (error) {
        console.log(error)
        return null
    }
}

export const searchPosts = async(keyword) => {
    try {
        const {data} = await axiosInstance().get('/?' + `filter_query[title][like]=*${keyword}*`)
        return data.stories;
    } catch (error) {
        console.log(error)
        return null
    }
}

export const myPosts = async(keyword) => {
    try {
        const {data} = await axiosInstance().get('/?' + `filter_query[author][like]=${keyword}`)
        return data.stories;
    } catch (error) {
        console.log(error)
        return null
    }
}

export const deleteHabbo = async (storyId: number) => {  
   const SPACE_ID = '285378710485282'

    const headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Authorization', process.env.STORYBLOK_MANAGEMENT_TOKEN!)
  await axios.delete(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${storyId}`, {
    headers
  })
}