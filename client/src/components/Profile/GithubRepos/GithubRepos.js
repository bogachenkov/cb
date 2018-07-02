import React, { Component } from 'react';
import Spinner from '../../UI/Spinner/Spinner';

import './GithubRepos.scss';

class GithubRepos extends Component {

  state = {
    clientId: '3d7ab6ae5e61497ecce5',
    clientSecret: '8eed5e5da0e388df3f14306ac2134de858f7a93d',
    count: 5,
    sort: 'created: asc',
    repos: [],
    error: ''
  }

  componentDidMount() {
    const { username } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;

    fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
     .then(res => res.json())
      .then(data => {
        this.setState({
          repos: data,
          error: ''
        });
      })
      .catch(error => {
        this.setState({
          error
        })
      })
  }

  render () {

    const { repos, error } = this.state;

    if (error) return <p className="has-text-danger has-text-centered">Ошибка при загрузке</p>;

    let repoItems = <Spinner />

    if (repos.length > 0) {
      repoItems = repos.map(repo => (
        <div key={repo.id} className="card card-content has-margin-10">
          <div className="is-vcentered is-jbetween GithubRepo">
            <div>
              <h4>
                <a href={repo.html_url} target="_blank">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <div className="field is-grouped is-grouped-multiline">
                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-dark">Stars</span>
                    <span className="tag is-info">{repo.stargazers_count}</span>
                  </div>
                </div>

                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-dark">Watchers</span>
                    <span className="tag is-success">{repo.watchers_count}</span>
                  </div>
                </div>

                <div className="control">
                  <div className="tags has-addons">
                    <span className="tag is-dark">Forks</span>
                    <span className="tag is-primary">{repo.forks_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    }

    return (
      <div>
        {repoItems}
      </div>
    )
  }
}

export default GithubRepos
