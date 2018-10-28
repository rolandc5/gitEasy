import React, { Component } from 'react';
import axios from 'axios';

export default class listRepo extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            key: '',
            list: [],
            toDelete: [],
            error: '',
            repoData: {}
        }
    }
    handleForm = (e) => {
        let name = e.target.name;
        this.setState({ [name]: e.target.value });
    }
    handleListRepo = (username) => {
        axios.get(`https://api.github.com/users/${username}/repos`)
            .then(response => {
                this.setState({ list: response.data });
            })
            .catch(err => {
                if (this.state.username === '') {
                    return
                }
                else {
                    this.setState({ error: err.data });
                }
            });
    }
    handleSingleRepo = (data) => {
        this.setState({ repoData: data });
    }
    handleDelete = (toDelete) => {
        if (toDelete !== this.state.delrepoName) {
            return;
        }
        axios.delete(`https://api.github.com/repos/${toDelete}`, {headers: { "Authorization": `bearer ${this.state.key}`}})
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                this.setState({ error: err });
                console.log(err)
            })
    }
    render = () => {
        return (
            <div className='l-container'>
                <div className='l-wrapper'>
                    <div className='l-navContainer'>
                        <input className='l-usernameForm' type='text' placeholder='username (not email)' name='username' onChange={ (e) => this.handleForm(e) }/>
                        <input className='l-authForm' type='text' placeholder='(Optional) authorization key - 40 digit key' name='key' onChange={ (e) => this.handleForm(e) }/>
                        <button className='l-listButtonForm' onClick={ () => this.handleListRepo(this.state.username) }>Search</button>
                    </div>
                    <div className='l-repoContainer'>
                        <div>
                            <div className='l-listContainer'>{ this.state.list.length > 0 ?
                                this.state.list.map((value, index) => {
                                    return (
                                        <div key={index}>
                                            <div className='l-listedRepo' onClick={ () => { this.handleSingleRepo(value) }}>{ value.name }</div>
                                        </div>
                                    )
                                }) : <div className='l-noRepo'>no repos</div>
                            }</div>
                        </div>
                        <div className='l-repoInfo'>
                            { this.state.repoData.full_name ? 
                                <div className=''>
                                    <div>
                                        <h2>name</h2> { this.state.repoData.full_name }
                                    </div>
                                    <div>
                                        <h2>link</h2> <a target="_blank" rel="noopener noreferrer" href={`https://github.com/${this.state.repoData.full_name}`}>{ `https://github.com/${this.state.repoData.full_name}` }</a>
                                    </div>
                                    <div>
                                        <h2>clone</h2> { this.state.repoData.git_url }
                                    </div>
                                    <div className=''>
                                        <h2>delete</h2><button onClick={ () => this.handleDelete(this.state.repoData.full_name) }>Delete Repo (Requires auth key)</button>
                                        <br/><input type='text' name='delrepoName' placeholder='enter repo name to confirm' onChange={ (e) => this.handleForm(e) }/>
                                    </div>   
                                </div> 
                            : this.state.repoData.full_name ? <div className='l-noRepo'> click on repo to display info </div> :  <div className='l-noRepo'> no repo </div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/*
              a className='l-listedRepo' target="_blank" rel="noopener noreferrer" href={`https://github.com/${value.full_name}`}
*/
