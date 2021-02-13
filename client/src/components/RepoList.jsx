import React from 'react';

const RepoList = (props) => {
  // Renders top 25 repo names only
  // const repoList = props.repos.map((repo, i) => {
  //   return <li key={i}>{repo}</li>
  // });

  // Renders top 25 repos with url
  const repoList = props.repos.map((repo, i) => {
    return <li key={i}><a href={repo.url}>{repo.repo}</a></li>
  })

  return (
    <div>
      <h4> Repo List Component - Top 25</h4>
      <ol>{repoList}</ol>
    </div>
  )
}

export default RepoList;