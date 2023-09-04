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
   if(formdata){
   if(selectedRow===null){
    insertNewRecord(formdata);
    closebtn.click();
    // console.log(fulldata);
    // console.log(ids);
   }
   }
   else{
    if(editdata){
      updaterecord(editdata);
      closebtn.click();
   }}
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

    // console.log(formdata);
    return formdata;}
}
// console.log(ids);

// insert data in table
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
    cell6.innerHTML=`<button style="background-color: hsl(213, 75%, 50%);;color:white">Add Subtask</button><button onclick='onedit(this)' style="background-color: rgb(221, 221, 26);color:black" >Edit</button> <button onclick='ondelete(this)'>Delete</button>` 
}

//  edit data of table
var beforeupdate='';
function onedit(td){
    selectedRow=td.parentElement.parentElement;
    beforeupdate=selectedRow.cells[0].innerHTML;
    document.getElementById("taskid").value=selectedRow.cells[0].innerHTML;
    document.getElementById("TaskName").value=selectedRow.cells[1].innerHTML;
    document.getElementById("StartDate").value=selectedRow.cells[2].innerHTML;
    document.getElementById("EndDate").value=selectedRow.cells[3].innerHTML;
    document.getElementById("Status").value=selectedRow.cells[4].innerHTML;
    modal.classList.add("active");
    console.log(selectedRow.cells[0].innerHTML);
    // console.log(selectedRow);
    // selectedRow=null;
    
}
function Editreadformdata(){
    var formdata={};
    if(beforeupdate==document.getElementById("taskid").value ){
    formdata["taskid"]=document.getElementById("taskid").value;
    formdata["TaskName"]=document.getElementById("TaskName").value;
    formdata["StartDate"]=document.getElementById("StartDate").value;
    formdata["EndDate"]=document.getElementById("EndDate").value;
    formdata["Status"]=document.getElementById("Status").value;
    fulldata.push(formdata);
    // console.log(formdata);
    return formdata;
    }
    else{
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
    fulldata.push(formdata);
    ids.push(document.getElementById("taskid").value);
    // console.log(formdata);
    return formdata;
     }
    }
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