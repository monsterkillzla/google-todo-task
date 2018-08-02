import React, { Component } from 'react';
//import moment from 'moment';

import Checkbox from 'material-ui/Checkbox';
import ListItem from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import NoteIcon from 'material-ui/svg-icons/communication/message';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import '../styles/Task.less';

const ENTER_KEY = 13;
const ESC_KEY = 27;

class Task extends Component {
  state = {
    isEditing: false
  }    

  constructor(props) {
    super(props);

    // Bind `this` within methods
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleEdit(e) {
    this.setState({ isEditing: true }, this.focusInput);
  }

  handleCancel() {
    this.cancelTask();
  }

  handleSave() {
    this.saveTask();
  }

  handleCheck() {
    //console.log(this);
    this.props.onUpdate({
      isCompleted: !this.props.isCompleted
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.saveTask();
    }

    if (e.keyCode === ESC_KEY) {
      this.cancelTask();
    }
  }

  focusInput() {
    this.text.focus();
  }

  saveTask() {
    //console.log(this);
    this.props.onUpdate({ 
      text: this.text.value,
      note: this.note.value,
      due: this.due.state.date
    });
    this.setState({ isEditing: false });
  }

  cancelTask() {
    this.setState({ isEditing: false });
  }

  render() {
    const { text, note, due, isCompleted, onDelete } = this.props;
    return (
      this.state.isEditing
      ?
        <div className='Task editing'>
          <input
            className='Task__text-input'
            type='text'
            defaultValue={text}
            onKeyDown={this.handleKeyDown}
            ref={c => this.text = c}
          />

          <textarea
            className='Task__note-input'
            type='text'
            defaultValue={note}
            onKeyDown={this.handleKeyDown}
            ref={c => this.note = c}
          />
          {
            due
            ?
              <DatePicker
                autoOk
                fullWidth
                defaultDate={due}
                ref={c => this.due = c}
                floatingLabelText='Enter due time'
              />
            :
              <DatePicker
                autoOk
                fullWidth
                ref={c => this.due = c}
                floatingLabelText='Enter due time'
              />
          }
          <div className='Task__toolbar'>
            <div>
              <RaisedButton primary onClick={this.handleSave} label='Save' />
              <FlatButton onClick={this.handleCancel} label='Cancel' />
            </div>
          </div>
        </div>
      :
        <div className='Task'>
          <Checkbox
            className='Task__checkbox'
            checked={isCompleted}
            onCheck={this.handleCheck}
          />

          <div className={'Task__text '+ (isCompleted ? 'complete' : '')} onClick={this.handleEdit}>
            <div className='Task__title'>
              {text}
              {
                note
                ?
                  <span title={note}>
                    <NoteIcon className='Task__note' />
                  </span>
                :
                  null
              }
            </div>
            {
              due
              ?
                <div className='Task__due'>
                  {'due ' + new Intl.DateTimeFormat().format(due)}
                </div>
              :
                null
            }
          </div>

          <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
            <MenuItem onClick={this.handleEdit}>Edit</MenuItem>
            <MenuItem onClick={onDelete}>Delete</MenuItem>
          </IconMenu>
        </div>
    );
  }
}

export default Task;
