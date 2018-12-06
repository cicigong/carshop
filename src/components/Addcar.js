import React, { Component } from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

class Addcar extends Component {
    constructor(props) {
        super(props);
        this.state = {brand: '', model: '', color: '', year: '', fuel: '', price: ''};
        this.addModal = React.createRef();
    }

    handleChange = (event)=> {
        this.setState({[event.target.name] : event.target.value});
    }
    //recommend to use const
    //cost inisde the order is not matter
    //setState!
    saveCar = () => {
        const car = {brand: this.state.brand, model:this.state.model, color:this.state.color, year:this.state.year, fuel: this.state.fuel, price: this.state.price}
        this.props.saveCar(car);
        this.setState({brand: '', model: ''})
        this.addModal.current.hide();
    }
    render() {
        //from yellow one box
        const addDialog = {
            
            width: '30%',
            height: '300px',
            marginLeft: '-35%',
            
          };
        return (
            //
            <div>
            
               
        <Button style={{margin: 10}} variant="contained" color="primary" onClick={() =>this.addModal.current.show()}><AddIcon></AddIcon>New car</Button>   
        <SkyLight dialogstyles={addDialog} hideOnOverlayClicked ref={this.addModal} title="Add car">
         <TextField placeholder= "Brand" name="brand" onChange={this.handleChange} value={this.state.brand} /><br />
         <TextField placeholder= "Model" name="model" onChange={this.handleChange} value={this.state.model} /><br />
         <TextField placeholder= "Color" name="color" onChange={this.handleChange} value={this.state.color} /><br />
         <TextField placeholder= "Year" name="year" onChange={this.handleChange} value={this.state.year} /><br />
         <TextField placeholder= "Fuel" name="fuel" onChange={this.handleChange} value={this.state.fuel} /><br />
         <TextField placeholder= "Price" name="price" onChange={this.handleChange} value={this.state.price} /><br />
         <Button style={{margin:15}} onClick={this.saveCar} variant="contained" color="default"><SaveIcon></SaveIcon>save</Button>
        </SkyLight>   
            </div>
        );
    }
}


export default Addcar;