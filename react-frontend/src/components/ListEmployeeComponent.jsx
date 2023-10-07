import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'
// import '../App.css'
import './employess.scss';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div className="container">
                 <h2>Employees List</h2>
                 <div>
                    <button className="btn btn-primary button" onClick={this.addEmployee}> Add Employee</button>
                 </div>
                 <div>
                        <table className = "table responsive-table">

                            <thead className='table-headers'>
                                <tr className='header-row'>
                                    <th className='col cols-1'> Employee First Name</th>
                                    <th className='col cols-2'> Employee Last Name</th>
                                    <th className='col cols-3'> Employee Email Id</th>
                                    <th className='col cols-4'> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.employees.map(
                                        employee => 
                                        <tr key = {employee.id} className='table-row'>
                                             <td className='col cols-1'> { employee.firstName} </td>   
                                             <td className='col cols-2'> {employee.lastName}</td>
                                             <td className='col cols-3'> {employee.emailId}</td>
                                             <td className='col cols-4'>
                                                 <button onClick={ () => this.editEmployee(employee.id)} className="btn btn-info button">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteEmployee(employee.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewEmployee(employee.id)} className="btn btn-info button">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListEmployeeComponent
