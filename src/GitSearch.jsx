import {useState, useEffect} from 'react'
import useLocalStorage from 'use-local-storage'
import {BiSearch, BiLogoTwitter} from 'react-icons/bi'
import {MdLocationPin, MdMail} from 'react-icons/md'
import {FaLink, FaSadCry} from 'react-icons/fa'
import {RiCloseLine} from 'react-icons/ri'
import light from './Assets/light.svg'
import dark from './Assets/dark.svg'

const GitSearch = () => {
  const [toggleImg , setToggleImg] = useState(false)

  // theme swither
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const swithTheme = ()=>{
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }
    
  // https://api.github.com/users/SholaCity 
  
  const [text, setText]= useState('');
  const [gitRepoData, setGitRepoData]= useState([])
  const [gitFollowingData, setGitFollowingData]= useState([])
  const [gitFollowersData, setGitFollowersData]= useState([])
  const [gitInfo, setGitInfo]= useState([])
  const [date, setDate]= useState(null)
  const [errorState, setErrorState]= useState(null)

 
  const [linkTab, setLinkTab]= useState(false);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const  genLink = localStorage.getItem("gen_profile")
    const  data_repo = localStorage.getItem("data_repo")
    const  data_following = localStorage.getItem("data_following")
    const  data_follows = localStorage.getItem("data_follows")
    if(genLink) {
      const data = JSON.parse(genLink)
      const RepoInfo = JSON.parse(data_repo)
      const FollowingInfo = JSON.parse(data_following)
      const FollowersInfo = JSON.parse(data_follows)

      if (data !== null) {
        setGitInfo(data)
        setGitRepoData(RepoInfo)
        setGitFollowersData(FollowersInfo);
        setGitFollowingData(FollowingInfo)
        // console.log("gitRepoData ",gitRepoData);
        // console.log("gitFollowersData ",gitFollowersData);
        // console.log("gitFollowingData " ,gitFollowingData); 
        setLinkTab(true)
        const d = new Date(data.created_at)
        let month = months[d.getMonth()];
        setDate( d.getDate() +" "+  month +" "+ d.getFullYear());
       
      }
      console.log(gitInfo);
      // console.log(data); 
      // console.log(genLink);
    }
}, [])


    
  function handleChange (e){
    const newValue = e.target.value
    setText(newValue);
  }

    const handleSubmit =(e)=>{
      e.preventDefault()
      if(!text){
        setErrorState(true)
      } else {
        const mainLink = ('https://api.github.com/users/' + `${text}`)
        const ReposLink = ('https://api.github.com/users/'+ `${text}` + '/repos')
        const FollowersLink = ('https://api.github.com/users/'+ `${text}` + '/followers')
        const FollowingLink = ('https://api.github.com/users/'+ `${text}` + '/following')

        // check if its a valid link
        const gitData = async ()=>{

          const responses = await Promise.all([fetch(mainLink),fetch(ReposLink),fetch(FollowersLink), fetch(FollowingLink)])

          const data = await responses[0].json()
          const repoData = await responses[1].json()
          const FollowersData = await responses[2].json()
          const FollowingData = await responses[3].json()

          setGitInfo(data)
          setGitRepoData(repoData)
          setGitFollowersData(FollowersData)
          setGitFollowingData(FollowingData)

          // console.log(data); 
          // console.log(ReposLink);
          // console.log(FollowersLink);
          // console.log(FollowingLink);
          

          // console.log("repoData ",repoData);
          // console.log("repoData ",repoData);
          // console.log("FollowData ",FollowersData);
          // console.log("FollowingData", FollowingData);
          setText("")
          if (data.message == "Not Found") {
            setLinkTab(false)
          } else {
            setLinkTab(true)

          }
          const d = new Date(data.created_at)
          let month = months[d.getMonth()];
          setDate( d.getDate() +" "+  month +" "+ d.getFullYear());
        }
         

        gitData()
        // console.log(gitInfo);
        // console.log("gitRepoData length",gitRepoData.length);
        // console.log("gitFollowingData " ,gitFollowingData.length);
        // console.log( "gitFollowersData ", gitFollowersData.length);
        // console.log("gitRepoData ", gitRepoData);
        // console.log("gitFollowingData " ,gitFollowingData);
        // console.log( "gitFollowersData ", gitFollowersData.length);
      }
    }
    const InfoData = [
      {
        id: 1,
        type: "Repos",
        value: gitInfo.public_repos,
        name:"repositories",
      },
      {
        id: 2,
        type: "followers",
        value: gitInfo.followers,
        name:"followers",
      },
      {
        id: 3,
        type: "following", 
        value: gitInfo.following,
        name:"followers",
 
      },
    ]
    
    // console.log(InfoData);
    useEffect(() => {
      window.localStorage.setItem("gen_profile", JSON.stringify(gitInfo))
      window.localStorage.setItem("data_repo", JSON.stringify(gitRepoData))
      window.localStorage.setItem("data_follows", JSON.stringify(gitFollowersData))
      window.localStorage.setItem("data_following", JSON.stringify(gitFollowingData))

    }, [gitInfo])
    
   

    const Avatar =({onClick})=>{
      return <img onClick={onClick} src={gitInfo.avatar_url} alt='profile icon'/>
    }
    // 

    // 
    console.log(toggleImg);
    const MoreData = ()=>{
      return (<div className='getMoreData'>
      <div className='item'>
        <button className='get_btn'>Top Repos</button>
        <div className='data_wrap'>
        {gitRepoData.length > 0 ?
        (gitRepoData.map((props)=>{
          return (<a href={props.html_url} className='repo__link'>{props.name}</a>)
        })) :<p className='empty'>no repository</p>}
        </div>
      </div>
      <div className='item'>
        <button className='get_btn'>Top followers</button>
        <div className='data_wrap'>
        {gitFollowersData.length > -0 ? 

        (gitFollowersData.map((props)=>{
          return (
          <a href='#top' className='follow_tab' onClick={()=>{
            setText(props.login)
            callSubmit()
            }}
          ><img src={props.avatar_url} className='follow_icon'/>{props.login}</a>
        )
        })) : <p className='empty'>no followers</p>}
        </div>
      </div>
      <div className='item'> 
        <button className='get_btn'>following</button>
        <div className='data_wrap'>
        {gitFollowingData.length > 0 ? 

        (gitFollowingData.map((props)=>{
          return <a href='#top' className='follow_tab'
          onClick={()=>{
            setText(props.login)
            callSubmit()
            }}><img src={props.avatar_url} className='follow_icon'/>{props.login}</a>
        })) :  <p className='empty'>not following any user</p>}
        </div>
      </div>
   </div>)
    }
    const GitProfile = ()=>{
      return <div className='gitsearch__profile'>
                  <div className={toggleImg ? "avatar_pop active ": "avatar_pop" } >
                    <Avatar  />
                    <p className='name'>{gitInfo.name}</p>
                    <RiCloseLine onClick={()=>setToggleImg(false)}   className='close' /> 
                  </div>
                 
                <div className='gitsearch__profile-wrap'>
                  <div className='gitsearch__profile-head'>
                    <Avatar  onClick={()=>{setToggleImg(true)}}/>
                    <div className='info'>
                      <div className=''>
                        <p className='name'>{gitInfo.name}</p>
                        <a href={gitInfo.html_url} className='username'>@{gitInfo.login}</a>
                      </div>
                      <p className='date'>Joined {date}</p>
                    </div>
                  </div>
                    {gitInfo.bio == null ?  
                      <p className='na'>This user has no bio</p>:
                      <p className='bio'>{gitInfo.bio}</p>
}
                  <div className='user-stats'>
                  {InfoData.map((props)=> {
                    return <div className='item' key={props.id}>
                      <p className='type'>{props.type}</p>
                      <p className='value'>{props.value}</p>
                     
                    </div>
                  })} 
                     
                  </div>
                 
                
                  <div className='user-directs'>
                    <div className='link'>
                      <MdLocationPin className='icon'/>
                      {gitInfo.location == null ?  
                      <p className='na'>location not available</p>
                      : <p className='text'> {gitInfo.location}</p>
                      }                    </div>
                    <div className='link'>
                      <BiLogoTwitter className='icon'/>
                      {gitInfo.twitter_username == null ?  
                      <p className='na'>username not available</p>
                      : <p className='text'> {gitInfo.twitter_username}</p>
                      }
                    </div>
                    <div className='link'>
                      <FaLink className='icon'/>
                      {gitInfo.blog == "" ?  
                      <p className='na'>website not available</p>:
                      <p className='text'>{gitInfo.blog}</p>}
                    </div>
                    <div className='link'>
                    <MdMail className='icon'/>
                      {gitInfo.email == null ?  <p className='na'>email not available</p> : <p className='text'>{gitInfo.email}</p>}
                    </div>
                  </div>
                  
                </div>
                <MoreData/>
             </div>
    }
  
    return (
      <div id='top' className='container' data-theme={theme}>
        <div className='gitsearch' >
          <div className='gitsearch__header'><h1>devFinder</h1>
          <span className='theme' onClick={()=>{
            swithTheme()
          }}>{theme === 'dark' ?  'light' : 'dark'} <img src={theme === 'dark' ?  light : dark} className='theme-icon'/></span> 
          </div>
          <form className='gitsearch__form' onSubmit={handleSubmit}>
          <div className='icon_input-wrap'>
            <BiSearch className='icon'/>
              <input 
              placeholder='Search Gitub Username...' 
              type='text'
              onChange={handleChange}
              value={text}
              /> 
            </div>
            <button type='submit' className='gitsearch__button' onClick={handleSubmit}>Search</button>
          </form>
          {gitInfo.message === "Not Found" && <p> User {gitInfo.message}</p>}
          
          {linkTab ? <GitProfile/> : <p>find that Dev</p>}
        </div>
      </div>
    )
  }
   

export default GitSearch