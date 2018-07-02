import React from 'react'

import './Social.scss';
import isEmpty from '../../../store/utils/isEmpty';

const Social = ({social}) => {

  const { twitter, vk, linkedin, facebook } = social;
  const notSpecify = isEmpty(twitter) && isEmpty(vk) && isEmpty(linkedin) && isEmpty(facebook);

  return (
    <div className="Social">
      <p className="About-section has-text-grey-light">Социальные сети {notSpecify ? 'не указаны' : null}</p>
        <div className="tags">
          {
            isEmpty(twitter) ? null :
            <a className="tag is-link is-medium"
              href={twitter}
              target="_blank"
              style={{background: '#55acee'}}>
              <i className="fab fa-twitter"></i>
              Twitter
            </a>
          }
          {
            isEmpty(vk) ? null :
            <a className="tag is-link is-medium"
              href={vk}
              target="_blank"
              style={{background: '#4c75a3'}}>
              <i className="fab fa-vk"></i>
              Вконтакте
            </a>
          }
          {
            isEmpty(linkedin) ? null :
            <a className="tag is-link is-medium"
              href={linkedin}
              target="_blank"
              style={{background: '#0077B5'}}>
              <i className="fab fa-linkedin-in"></i>
              LinkedIn
            </a>
          }
          {
            isEmpty(facebook) ? null :
            <a className="tag is-link is-medium"
              href={facebook}
              target="_blank"
              style={{background: '#3b5999'}}>
              <i className="fab fa-facebook-f"></i>
              Facebook
            </a>
          }
        </div>
    </div>
  )
}

export default Social
