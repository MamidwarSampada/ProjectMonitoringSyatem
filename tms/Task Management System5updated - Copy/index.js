// start for control coding
var addBtn=document.querySelector("#add-btn");
var modal=document.querySelector(".modal");
var closebtn=document.querySelector(".close-icon");
var fulldata=[];
var ids=[];
// console.log(fulldata);
// console.log(ids);
addBtn.onclick=function(){
    modal.classList.add("active");
}

closebtn.onclick=function(){
    modal.classList.remove("active");
}


var selectedRow=null;
function onformsubmit(){
   event.preventDefault();
   var formdata=readformdata();
   var editdata=Editreadformdata();
   if(selectedRow===null){
    if(formdata){
    insertNewRecord(formdata);
    closebtn.click();
    // console.log(fulldata);
    // console.log(ids);
   }
   }
   else{
      updaterecord(editdata);
      closebtn.click();
   }
   resetform();
   selectedRow=null;
}

function readformdata(){
    var formdata={};
    const errorDisplay = document.getElementById('errorDisplay');
    currentid=document.getElementById("taskid").value;
    if (ids.includes(currentid)){
           event.preventDefault();
           errorDisplay.textContent = 'ID must be unique.';
           setTimeout(function(){ errorDisplay.textContent = " " },1500);
           return false
    }
    else{
    formdata["taskid"]=document.getElementById("taskid").value;
    formdata["TaskName"]=document.getElementById("TaskName").value;
    formdata["StartDate"]=document.getElementById("StartDate").value;
    formdata["EndDate"]=document.getElementById("EndDate").value;
    formdata["Status"]=document.getElementById("Status").value;
      
    ids.push(document.getElementById("taskid").value);
    fulldata.push(formdata);
    errorDisplay.textContent = '';

    return formdata;}
}


// insert data in table*******************
function insertNewRecord(data)
{
    var table=document.getElementById("fulltable").getElementsByTagName('tbody')[0];
    
    var newrow=table.insertRow(table.length);
    
    var cell1=newrow.insertCell(0);
    cell1.innerHTML=data.taskid;
    var cell2=newrow.insertCell(1);
    cell2.innerHTML=data.TaskName;
    var cell3=newrow.insertCell(2);
    cell3.innerHTML=data.StartDate;
    var cell4=newrow.insertCell(3);
    cell4.innerHTML=data.EndDate;
    var cell5=newrow.insertCell(4);
    cell5.innerHTML=data.Status;
    var cell6=newrow.insertCell(5);
    cell6.innerHTML=`<button id="sub-btn" style="background-color: hsl(213, 75%, 50%);color:white" onclick="subtaskbtn(this)">Add Subtask</button>
    <button id="showbtn" style="background-color: #555555;color:white" onclick="showsubtask()" >show Subtask</button>
    <button id="editbtn" onclick='onedit(this)' style="background-color: rgb(221, 221, 26);color:black" >Edit</button> 
    <button id="delete" onclick='ondelete(this)'>Delete</button>` 
}

//  edit data of table
function onedit(td){
    selectedRow=td.parentElement.parentElement;
    document.getElementById("taskid").value=selectedRow.cells[0].innerHTML;
    document.getElementById("TaskName").value=selectedRow.cells[1].innerHTML;
    document.getElementById("StartDate").value=selectedRow.cells[2].innerHTML;
    document.getElementById("EndDate").value=selectedRow.cells[3].innerHTML;
    document.getElementById("Status").value=selectedRow.cells[4].innerHTML;
    modal.classList.add("active");

    
}
function Editreadformdata(){
    var formdata={};
    formdata["taskid"]=document.getElementById("taskid").value;
    formdata["TaskName"]=document.getElementById("TaskName").value;
    formdata["StartDate"]=document.getElementById("StartDate").value;
    formdata["EndDate"]=document.getElementById("EndDate").value;
    formdata["Status"]=document.getElementById("Status").value;
      
    ids.push(document.getElementById("taskid").value);
    fulldata.push(formdata);
    // console.log(formdata);
    return formdata;
}

function updaterecord(formdata){
    selectedRow.cells[0].innerHTML=formdata.taskid;
    selectedRow.cells[1].innerHTML=formdata.TaskName;
    selectedRow.cells[2].innerHTML=formdata.StartDate;
    selectedRow.cells[3].innerHTML=formdata.EndDate;
    selectedRow.cells[4].innerHTML =formdata.Status;
    
}

// resetform form
function resetform(){
    document.getElementById("taskid").value='';
    document.getElementById("TaskName").value='';
    document.getElementById("StartDate").value='';
    document.getElementById("EndDate").value='';
    document.getElementById("Status").value='';
}

// delete data in table
function ondelete(td){
    if(confirm("do you want to delete this record")){
    row=td.parentElement.parentElement;
    document.getElementById('fulltable').deleteRow(row.rowIndex);
}
resetform();
}
// search functon start*****
function searchinput(){
    
  const searchInput = document.getElementById('search');
  const dataTable = document.getElementById('fulltable');
  const rows = dataTable.getElementsByTagName('tr');
  

//   searchInput.addEventListener('input', function() 
    const searchTerm = searchInput.value.toLowerCase();
console.log("search");
    for (let i = 0; i < rows.length; i++) { // Start from 1 to skip header row
      const row = rows[i];
      const columns = row.getElementsByTagName('td');
      let shouldDisplay = false;

      for (let j = 0; j < columns.length; j++) {
        const cellText = columns[j].textContent.toLowerCase();

        if (cellText.includes(searchTerm)) {
          shouldDisplay = true;
          break;
        }
      }

      row.style.display = shouldDisplay ? '' : 'none';
    }
  document.getElementById('search').value="";
}


// to show subtask*********
const myTable = document.getElementById('subfulltable');

  // To hide the table
  myTable.style.display = 'none';

  // To show the table again
function showsubtask(){
  myTable.style.display = 'table';
  setTimeout(function(){ myTable.style.display = 'none' },10000);
}

//**********************************************code for subtask******************************************
var submodal=document.querySelector(".submodal");
var subclosebtn=document.querySelector(".subclose-icon");
var subtaskdata=[];
var subtaskids=[];
var parentid={};
var i=[];
function subtaskbtn(td){ 
    // console.log(parenttaskid); 
    submodal.classList.add("active");
    var row=td.parentElement.parentElement;
    var pid=row.cells[0].innerHTML;
    i.push(1);
    parentid[pid.toString()]=i;
    console.log(pid,parentid);
    document.getElementById("subtaskid").value=row.cells[0].innerHTML+"."+`${parentid[pid.toString()].length}`;
   }

subclosebtn.onclick=function(){
    submodal.classList.remove("active");
}


var subselectedRow=null;
function onsubformsubmit(){
   event.preventDefault();
   var subformdata=subreadformdata();
   var subeditdata=subEditreadformdata();
   
   if(subselectedRow===null){
    if(subformdata){
    subinsertNewRecord(subformdata);
    subclosebtn.click();
   }
   }
   else{
      subupdaterecord(subeditdata);
      subclosebtn.click();
   }
   subresetform();
   subselectedRow=null;
}

function subreadformdata(){

    var subformdata={};
    const suberrorDisplay = document.getElementById('suberrorDisplay');
    subcurrentid=document.getElementById("subtaskid").value;
    if (subtaskids.includes(subcurrentid)){
           event.preventDefault();
           suberrorDisplay.textContent = 'ID must be unique.';
           setTimeout(function(){ suberrorDisplay.textContent = " " },1500);
           return false
    }
    else{
    
    subformdata["subtaskid"]=document.getElementById("subtaskid").value;
    subformdata["subTaskName"]=document.getElementById("subTaskName").value;
    subformdata["subStartDate"]=document.getElementById("subStartDate").value;
    subformdata["subEndDate"]=document.getElementById("subEndDate").value;
    subformdata["subStatus"]=document.getElementById("subStatus").value;
      
    subtaskids.push(document.getElementById("subtaskid").value);
    subtaskdata.push(subformdata);
    suberrorDisplay.textContent = '';

    return subformdata;}
}


// insert data in subtable*******************
function subinsertNewRecord(data)
{
    // console.log("in insert");
    var subtable=document.getElementById("subfulltable").getElementsByTagName('tbody')[0];
    
    var newrow=subtable.insertRow(subtable.length);
    
    var cell1=newrow.insertCell(0);
    cell1.innerHTML=data.subtaskid;
    var cell2=newrow.insertCell(1);
    cell2.innerHTML=data.subTaskName;
    var cell3=newrow.insertCell(2);
    cell3.innerHTML=data.subStartDate;
    var cell4=newrow.insertCell(3);
    cell4.innerHTML=data.subEndDate;
    var cell5=newrow.insertCell(4);
    cell5.innerHTML=data.subStatus;
    var cell6=newrow.insertCell(5);
    cell6.innerHTML=`<button onclick='onsubedit(this)' style="background-color: rgb(221, 221, 26);color:black" >Edit</button> <button onclick='onsubdelete(this)'>Delete</button>` 
}
fulldata.push(subtaskdata);

function onsubedit(td){
    subselectedRow=td.parentElement.parentElement;
    document.getElementById("subtaskid").value=subselectedRow.cells[0].innerHTML;
    document.getElementById("subTaskName").value=subselectedRow.cells[1].innerHTML;
    document.getElementById("subStartDate").value=subselectedRow.cells[2].innerHTML;
    document.getElementById("subEndDate").value=subselectedRow.cells[3].innerHTML;
    document.getElementById("subStatus").value=subselectedRow.cells[4].innerHTML;
    submodal.classList.add("active");
}
function subEditreadformdata(){
    var subformdata={};
    subformdata["subtaskid"]=document.getElementById("subtaskid").value;
    subformdata["subTaskName"]=document.getElementById("subTaskName").value;
    subformdata["subStartDate"]=document.getElementById("subStartDate").value;
    subformdata["subEndDate"]=document.getElementById("subEndDate").value;
    subformdata["subStatus"]=document.getElementById("subStatus").value;
      
    // subtaskids.push(document.getElementById("subtaskid").value);
    fulldata.push(subformdata);
    // console.log(formdata);
    return subformdata;
}

function subupdaterecord(formdata){
    subselectedRow.cells[0].innerHTML=formdata.subtaskid;
    subselectedRow.cells[1].innerHTML=formdata.subTaskName;
    subselectedRow.cells[2].innerHTML=formdata.subStartDate;
    subselectedRow.cells[3].innerHTML=formdata.subEndDate;
    subselectedRow.cells[4].innerHTML =formdata.subStatus;
    
}

// resetform form
function subresetform(){
    document.getElementById("subtaskid").value='';
    document.getElementById("subTaskName").value='';
    document.getElementById("subStartDate").value='';
    document.getElementById("subEndDate").value='';
    document.getElementById("subStatus").value='';
}

// delete data in table
function onsubdelete(td){
    if(confirm("do you want to delete this record")){
    row=td.parentElement.parentElement;
    document.getElementById('subfulltable').deleteRow(row.rowIndex);
}
resetform();
}
