import React from 'react';

const RepoList = (props) => {
  const repoList = props.repos.map((repo, key) => {
    return <li key={key}>{repo}</li>
  });

  return (
    <div>
      <h4> Repo List Component - Top 25</h4>
      <ol>{repoList}</ol>
    </div>
  )
}

export default RepoList;