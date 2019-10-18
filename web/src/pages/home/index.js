import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/logo.svg';
import like from '../../assets/like.svg';
import dislike from '../../assets/dislike.svg';

import api from '../../services/api';

export default function Home() {
  const [devs, setDevs] = useState([]);
  const authId = localStorage.getItem('authId');

  useEffect(() => {
    async function getDevs() {
      const response = await api.get('/devs', {
        headers: { auth: authId }
      });
      setDevs(response.data.devs);
    }
    getDevs()
  }, []);

  async function handleDislike(user_id){
	const response = await api.post(`/devs/${user_id}/dislike`, null, {
		headers:{
			auth:authId
		}
	});
	if(response.status === 200){
		setDevs(devs.filter( user => user._id !== user_id ));
	}
  }

  async function handleLike(user_id){
	const response = await api.post(`/devs/${user_id}/like`, null, {
		headers:{
			auth:authId
		}
	});
	if(response.status === 200){
		setDevs(devs.filter( user => user._id !== user_id ));
	}
  }

  return (
    <div className="main-container">
		<Link to="/">
	    	<img src={logo} className="logo" alt="logo" />
		</Link>
		{ 
			devs.length > 0 ?
			(
				<div className="grid">
					{  
						devs.map(user => (
								<div key={user._id} className="item-card">
									<img src={user.avatar} />	
									<footer>
										<strong>{user.name}</strong>
										<p>{user.bio}</p>
									</footer>
									<div className="btns">
										<button type="button" onClick={ () => handleDislike(user._id) }> <img src={dislike} alt="dislike" /> </button>
										<button type="button" onClick={ () => handleLike(user._id) }> <img src={like} alt="like" /> </button>
									</div>
								</div>
							)
						)
					}
				</div>
			) : (
				<div className="empty"> Nenhum dev encontrado ):</div>
			)
		}
    </div>
  );
}
