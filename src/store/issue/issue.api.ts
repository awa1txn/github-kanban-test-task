import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IssueType } from '../../types'


export const issueApi = createApi({
    reducerPath: 'issueApi',
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/vnd.github.v3+json')
        }
    }),
    endpoints: (builder) => ({
        getIssueByRequest: builder.query<IssueType, string>({
            query: (link: string) => { 
                let patternGithubUrlPath = /(https?:\/\/)?(www\.)?github\.com\/[^\s]+/g;
                let patternStraightPath = /^\w+\/\w+$/;
                
                if( patternGithubUrlPath.test(link) ) {
                    return `https://api.github.com/repos/${link.split('/')[3]}/${link.split('/')[4]}/issues` 
                } 
                else if(patternStraightPath.test(link)){
                    return `https://api.github.com/repos/${link.split('/')[0]}/${link.split('/')[1]}/issues`
                }
                return ``
            },
        })
    })
})

export const {useGetIssueByRequestQuery} = issueApi;