import s from './Github.module.css'
import {useEffect, useState} from "react";
import axios from "axios";

type SearchUserType = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUserType[]
}
type UserType = {
    "login": string
    "id": number
    "avatar_url": string
    followers: number
}
export const Github = () => {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [userDetails, setUserDetails] = useState<null | UserType>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [tempSearch, setTempSearch] = useState('it-kamasutra')
    const [searchTemp, setSearchTemp] = useState('it-kamasutra')

    const fetchData = (term: string) => {
        axios
            .get<SearchResult>(`https://api.github.com/search/users?q=${term}`)
            .then(res => {
                setUsers(res.data.items)
            })
    }
    useEffect(() => {
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])

    useEffect(() => {
        fetchData(tempSearch)
        /* axios
             .get<SearchResult>('https://api.github.com/search/users?q=it-kamasutra')
             .then(res => {
                 setUsers(res.data.items)
             })*/

    }, [searchTemp])
    useEffect(() => {
        if (!!selectedUser) {
            axios
                .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDetails(res.data)
                })

        }
    }, [selectedUser])

    return <div className={s.container}>
        <div>
            <div>
                <input
                    placeholder={'search'}
                    value={tempSearch}
                    onChange={(e) => {
                        setTempSearch(e.currentTarget.value)
                    }}
                />
                <button onClick={() => {
                    setSearchTemp(tempSearch)
                    /*axios
                        .get<SearchResult>(`https://api.github.com/search/users?q=${tempSearch}`)
                        .then(res => {
                            setUsers(res.data.items)
                        })*/
                }
                }> find
                </button>
            </div>
            <ul>
                {users.map(u =>
                    <li key={u.id}
                        className={selectedUser === u ? s.selected : ''}
                        onClick={() => {
                            setSelectedUser(u)
                            /*document.title=u*/
                        }}>
                        {u.login}
                    </li>)}
            </ul>
        </div>
        <div>
            <h2>UserName</h2>
            {userDetails &&
                <div>
                    <img src={userDetails.avatar_url}/>
                    <br/>
                    {userDetails.login}, followers:{userDetails.followers}
                </div>}
            </div>
                </div>
            }
