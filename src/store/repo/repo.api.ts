

export async function getRepoNotation(link:string) {
    let patternGithubUrlPath = /(https?:\/\/)?(www\.)?github\.com\/[^\s]+/g;
    let patternStraightPath = /^\w+\/\w+$/;
    
    if( patternGithubUrlPath.test(link) ) {
        return await (await fetch(`https://api.github.com/repos/${link.split('/')[3]}/${link.split('/')[4]}`)).json() 
    } 
    else if(patternStraightPath.test(link)){
        return await (await fetch(`https://api.github.com/repos/${link.split('/')[0]}/${link.split('/')[1]}`)).json()
    }
    return ''
}