import React from 'react';
import './About.scss';
import isEmpty from '../../../store/utils/isEmpty';
import Wrapper from '../../../HOC/Wrapper/Wrapper';
import ExperienceDisplay from '../ExperienceDisplay/ExperienceDisplay';

const About = ({profile, user}) => {

  const renderContacts = () => {
    if (isEmpty(profile.contacts)) return null;
    return (
      <Wrapper>
        {isEmpty(profile.contacts.phone) ? null :
          <tr>
            <td className="col1 is-capitalized">Телефон:</td>
            <td><a href={`tel:+7${profile.contacts.phone}`}>+7{profile.contacts.phone}</a></td>
          </tr>
        }
        {isEmpty(profile.contacts.email) ? null :
          <tr>
            <td className="is-capitalized">Email:</td>
            <td><a href={`mailto:${profile.contacts.email}`}>{profile.contacts.email}</a></td>
          </tr>
        }
        {isEmpty(profile.contacts.skype) ? null :
          <tr>
            <td className="is-capitalized">Skype:</td>
            <td>{profile.contacts.skype}</td>
          </tr>
        }
        {isEmpty(profile.contacts.telegram) ? null :
          <tr>
            <td className="is-capitalized">Telegram:</td>
            <td>{profile.contacts.telegram}</td>
          </tr>
        }
      </Wrapper>
    );
  }

  const checkContactsEmpty = () => {
    if (isEmpty(profile.contacts) && isEmpty(profile.website)) {
      return <p className="has-text-grey-light About-section">Контактная информация не указана</p>;
    } else {
      return (
        <Wrapper>
          <p className="About-section has-text-grey-light">Контактная информация</p>
          <table className="About has-text-weight-semibold" cellSpacing="0" cellPadding="0">
            <tbody>
              {renderContacts()}
              {isEmpty(profile.website) ? null :
                <tr>
                  <td className="is-capitalized">Сайт:</td>
                  <td><a href={profile.website} target="_blank">{profile.website}</a></td>
                </tr>
              }
            </tbody>
          </table>
        </Wrapper>
      );
    }
  }

  const checkExperienceEmpty = () => {
    if (isEmpty(profile.experience)) {
      return <p className="has-text-grey-light About-section">Опыт работы не указан</p>;
    } else {
      return <ExperienceDisplay profileID={profile._id} exp={profile.experience} /> ;
    }
  }

  return (
    <div>
      {
        isEmpty(profile.about) ? null :
        <Wrapper>
          <p className="has-text-grey-light About-section">Личная информация</p>
          <p style={{whiteSpace: 'pre-line'}}>
            { profile.about }
          </p>
        </Wrapper>
      }
      { checkContactsEmpty() }
      { checkExperienceEmpty()}
    </div>
  )
}

export default About
