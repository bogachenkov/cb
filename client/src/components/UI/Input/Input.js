import React from 'react';

const Input = (props) => {

  const renderInput = () => (
    <input onChange={props.changed}
      className={"input " + (props.error ? "is-danger" : null)}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder} />
  )

  const renderFileInput = () => (
    <div className="file is-large is-boxed has-name">
      <label className="file-label">
        <input
          className="file-input"
          type="file"
          name="avatar"
          value={props.value}
          onChange={props.changed} />
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload"></i>
          </span>
          <span className="file-label">
            {props.fieldText}
          </span>
        </span>
        <span className="file-name">
          {props.value}
        </span>
      </label>
    </div>
  )

  const renderSelect = () => (
    <div className="select">
      <select onChange={props.changed} value={props.value}>
        {props.options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  )

  const renderCheckbox = () => (
    <label className="checkbox">
      <input
        type="checkbox"
        onClick={props.changed}
        checked={props.value} />
      {props.placeholder}
    </label>
  )

  const renderTextarea = () => (
    <textarea
      onChange={props.changed}
      rows={props.rows || 3}
      className={"textarea " + (props.error ? "is-danger" : null)}
      value={props.value} placeholder={props.placeholder}>
    </textarea>
  )

  const renderElement = () => {
    switch (props.controlType) {
      case 'textarea':
        return renderTextarea();
      case 'select':
        return renderSelect();
      case 'checkbox':
        return renderCheckbox();
      case 'file':
        return renderFileInput();
      default:
        return renderInput();
    }
  }

  return (
    <div className="field">
      {(props.withLabel && (props.controlType !== 'checkbox')) ? <label className="label">{props.placeholder}</label> : null}
      <div className={props.icon ? "control has-icons-left" : "control"} >
        {(props.addon || props.addonIco) ? (
          <div className="field has-addons">
            <p className="control">
              <a className="button is-static">
                {props.addon}
                <i className={props.addonIco}></i>
              </a>
            </p>
            {renderElement()}
          </div>
        ) : renderElement()}
        {
          props.icon ?
          (<span className="icon is-small is-left">
            <i className={props.icon}></i>
          </span>) :
          null
        }
      </div>
      {
        props.error ?
        (
          <p className="help is-danger">
            {props.error}
          </p>
        ) : null
      }
      <p className="help has-text-grey">{props.help}</p>
    </div>
  )
}

export default Input
