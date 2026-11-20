import { useState } from "react";
import  "./App.css"


function App() {


  const [name, setname]= useState("")
const [email, setemail]= useState("")
const [department, setdepartment]= useState("")
  const [salary, setsalary]= useState("")
 
 const[error, seterror]=useState("")
 const [employees, setemployees] = useState([])
 const [editId, seteditId] = useState(null);
 const [search, setsearch] = useState("");
  
  function UserName(event){
setname(event.target.value)
  }

  function Useremail(event){
setemail(event.target.value)
  }
  
  function UseDepartment(event){
setdepartment(event.target.value)
  }
  
  function UserSalary(event){
setsalary(event.target.value)
  }




function submit() {

  if(name === ""){
    seterror("cannot be empty")
  }
  else if(email === ""){
    seterror("email cannot be empty")
  }
  else if(department === ""){
    seterror("department cannot be empty")
  }
  else if(salary === ""){
    seterror("salary cannot be empty")
  }
  else {
    seterror("")

    if(editId !== null) {

      setemployees(employees.map(function(employee) {

        if(employee.id === editId) {
          return {
            ...employee,
            name: name,
            email: email,
            department: department,
            salary: salary
          };
        }

        return employee;
      }));

      seteditId(null);

    }
    else {

      const employee = {
        id: Date.now(),
        name: name,
        email: email,
        department: department,
        salary: salary
      };

      setemployees([...employees, employee]);

    }

    setname("");
    setemail("");
    setdepartment("");
    setsalary("");
  }
}


function Deleteemployee(id) {
  setemployees(employees.filter(function(employee) {
    return employee.id !== id;
  }));
}

function editemployee(id) {
  const employee = employees.find(function(employee) {
    return employee.id === id;
  });

  setname(employee.name);
  setemail(employee.email);
  setdepartment(employee.department);
  setsalary(employee.salary);
  seteditId(id);
} 

function search_here(event){
 setsearch(event.target.value)
}

const filteredEmployees = employees.filter(function(employee) {
  return employee.name.toLowerCase().includes(search.toLowerCase());
});


  return(

    <div className="app-container">
    <h2>Employee Management System - Version 2.</h2>
    <p>What is your name</p>
   <input type="text" value={name} placeholder=" what is your name" onChange={UserName}></input> 
   <p>What is your email</p>
    <input type="email" value={email} placeholder=" what is your name" onChange={Useremail}></input> 
    <p>What is your department</p>
   
    <input type="text" value={department} placeholder=" what is your name" onChange={UseDepartment}></input> 
    <p>What is your salary</p>
   
    <input type="number" value={salary} placeholder=" what is your name" onChange={UserSalary}></input> 
   <div>
    <button onClick={submit}>
  {editId !== null ? "Update Employee" : "Add Employee"}
</button>
<input placeholder="Search here" type="text" value={search} onChange={search_here}></input>
 <p>{error}</p>
 
 {filteredEmployees.map(function(employ) {
    return(
      <div key={employ.id}>
        <p>Name: {employ.name}</p>
        <p>Email: {employ.email}</p>
        <p>Department: {employ.department}</p>
        <p>Salary: {employ.salary}</p>
         <button onClick={() => Deleteemployee(employ.id)}>Delete</button>
        
         <button onClick={() => editemployee(employ.id)}>edit</button>
   
      </div>
    )
})}
  

    </div>
    </div>
  ) 

}


export default App;