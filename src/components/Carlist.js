import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Addcar from './Addcar';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';


class Carlist extends Component {
    constructor(params) {
        super(params);
        this.state = {cars: [], Snackbar:false, msg:''};
    }

    componentDidMount() {
       this.listCars();
    }
    // Delete a car
    deleteCar = (link) => {
       fetch(link, {method: 'DELETE'})
       .then(response => {
           this.listCars();
           this.setState({showSnack:true, msg:'Car deleted'})
       })
    }

    saveCar = (car) => {
       fetch('https://carstockrest.herokuapp.com/cars', 
       {method: 'POST',
       headers: {'Content-Type':'application/json'},
       body: JSON.stringify(car)})
       .then(response =>{
        
         this.listCars();
         

       })
       

    }
    //UPDATE EXISTING CAR
    updateCar = (car, link) =>{fetch(link, 
    {method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(car)})
    .then(response =>{
      this.setState({showSnack: true, msg:'car saved'})
      this.listCars();
    })
    .catch(err => {
      console.error(err);
      this.setState({msg:"Error in saving"})
    })
}

    renderEditable = (cellInfo) =>{
      return (
          <div style={{ backgroundColor: "#fafafa" }}
          contentEditable
          suppressContentEditableWarning
          onBlur={e => {
            const data = [...this.state.cars];
            data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
            this.setState({cars: data });
          }}
          dangerouslySetInnerHTML={{
            __html: this.state.cars[cellInfo.index][cellInfo.column.id]
          }} />
            
          
      );
  }

    //copy from doucmentation, then change to showSnack for this case.
    handleClose = () => {
        this.setState({ showSnack: false });
      };
     //copy code from componentDidMount, then delete those from it and add this.listcars() make it function works.same as in delete cars.
    listCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(responseData => {
            this.setState({cars: responseData._embedded.cars})
        }) 
    }

    render() {
        const columns = [{
            Header: 'Brand',
            accessor: 'brand', 
            Cell: this.renderEditable
          }, {
            Header: 'Model',
            accessor: 'model',
            Cell: this.renderEditable
          }, {
            Header: 'Year',
            accessor: 'year',
            Cell: this.renderEditable
          }, {
            Header: 'Color',
            accessor: 'color',
            Cell: this.renderEditable
          }, {
            Header: 'Fuel',
            accessor: 'fuel',
            Cell: this.renderEditable
          }, {
            Header: 'Price (€)',
            accessor: 'price',
            Cell: this.renderEditable
          }, {
            Header: '',
            filterable: false,
            sortable: false,
            minWidth:30,
            accessor: '_links.self.href',
            
           
            Cell: ({row,value}) => ( 
            <IconButton size="small" color="default" onClick={()=>this.updateCar(row,value)}><SaveIcon /></IconButton>)
            
          },
           
            //the value of it but dont want to show the link
            //if dont have arrow function here, then everytime when it renders, it will delete all the rows
           //<Tooltip title="Delete">
        
            //this html button exapmple. then the below change to material ui button looks nicer.<button onClick={() =>this.deleteCar(value)}>Delete</button>
          {
            Header: '',
            filterable: false,
            sortable: false,
            minWidth: 30,
            accessor: '_links.self.href',
            
          
            Cell: ({value}) => ( 
            <Tooltip title="Delete" placement="right"><IconButton color="secondary" size="small" onClick={() =>this.deleteCar(value)} aria-label="Delete">
               <DeleteIcon />
            </IconButton></Tooltip>)
            
          }
        ]
       

       //send saveCar() this props to Addcar Component
       
        return (
            <div >
              
              <Addcar saveCar={this.saveCar} />
              <ReactTable defaultPageSize={10} filterable={true} data={this.state.cars} columns={columns} />
              <Snackbar message={this.state.msg} autoHideDuration={2000} open={this.state.showSnack} onClose={this.handleClose} />          
            </div>
        );
    }
}


export default Carlist;