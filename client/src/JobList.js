import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class JobList extends Component {
  render() {
    const {jobs} = this.props;
    console.log(this.props);
    return (
      <ul className="box">
        {console.log(jobs)}
        {jobs.map(this.renderJob.bind(this))}
      </ul>
    );
  }

  renderJob(job) {
    const title =  `${job.level} at ${job.type} type for ${job.title} image : ${job.image}`
    return (
      <li className="media" key={job.id}>
        <div className="media-content">
          <Link>{title}</Link>
        </div>
      </li>
    );
  }
}
