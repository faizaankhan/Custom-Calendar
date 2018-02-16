import React, { Component } from "react";

class InlineEditLabel extends Component{
  constructor(props){
    super(props);
    this.state={
      isEditing : this.props.isEditable || false,
      value: this.props.value || "",
    };

    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentWillReceiveProps(){
    this.setState(
      {
        isEditing : this.props.isEditable || false,
        value : this.props.value || ""
      }
    );
  }

  handleEditClick(e){
    this.setState({
      isEditing : true
    });
  }

  handleSaveClick(e){
    if(this.state.value.trim().length>0){
      this.setState({
        isEditing : false
      });
      this.props.onSave(e,this.state.value);
    }

    else{
      this.props.onDelete(e);
    }

  }

  handleChange(e){
    this.setState({value: e.target.value});
  }


  render(){
    const label = (
      <div>
        <label>{this.props.value}</label>
        <i onClick={this.handleEditClick} className="fa fa-pencil fa-lg"></i>
        <i onClick={this.props.onDelete} className="fa fa-trash-o fa-lg"></i>
      </div>);
    const edit =( 
      <div className="input-group">
        <input type="text" className="form-control form-control-sm" 
          autoFocus={true}
          value={this.state.value} 
          onChange={this.handleChange}
          onKeyDown={e=>{if(e.keyCode===13){this.handleSaveClick(e);}}} 
        />
        <span className="input-group-addon">
          <i onClick={this.handleSaveClick} className="fa fa-floppy-o fa-lg"></i>
        </span>
      </div>);
    return(
      <div>
        {this.state.isEditing?edit:label}
      </div>
    );
  }
}

export default InlineEditLabel;