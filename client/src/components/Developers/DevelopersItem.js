import React from 'react';
import { Link } from 'react-router-dom';
import {Image} from 'cloudinary-react';

const DevelopersItem = ({profile}) => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-128x128">
            <Image cloudName="dpf2wcgaq" publicId={profile.avatar} />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <Link to={{
                  pathname: `developers/${profile.username}`,
                  state: {
                    developer: true,
                  }
                }} className="is-size-5 has-text-black">{`${profile.name} ${profile.surname}`}</Link>
              <br />
            <span className="has-text-link">{profile.specialty}</span>
            </p>
            <div className="tags" style={{margin: '20px 0'}}>
              { profile.skills.map((skill) => (
                <span key={skill} className="tag">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}

export default DevelopersItem
