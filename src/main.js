var counterToDOItems=0;
var arrOfNewRow =[];
var arrOfDelRow = [];
var arrOfFunctions = [];
function addDoing() 
{
    counterToDOItems++;
    document.getElementById("counter").innerHTML= counterToDOItems + " ToDos  ";
    let dateOfAddingItem = new Date();
    let year= dateOfAddingItem.getFullYear();
    let month = dateOfAddingItem.getMonth();
    let dayOfMonth = dateOfAddingItem.getDate().toString();
    let hours = dateOfAddingItem.getHours().toString();
    let minutes = dateOfAddingItem.getMinutes().toString();
    let seconds = dateOfAddingItem.getSeconds().toString();
    console.log(dateOfAddingItem);
    let textInput = document.querySelector("#textInput").value;
    if(textInput.length === 0)
    {
        alert("XXX  Error!  XXX \n Your must to write something in the text-bar!!!");
        return false;
    }
    else
    {
        document.querySelector("#textInput").value="";
        var newDoing = document.createElement("li");
        newDoing.className="flex-container";
        let newSpan = document.createElement("span");
        let deleteButton = document.createElement("button");
        let selectList = document.getElementById("prioritySelector");
        let selectedPriority = selectList.options[selectList.selectedIndex].text;
        console.log(selectedPriority);
        newDoing.appendChild(newSpan);
        newDoing.appendChild(deleteButton);
        newSpan.textContent = selectedPriority + "  " + year + "-" + month + "-" + dayOfMonth + " " + hours + ":" + minutes + ":" + seconds + " " + " "+  textInput;
        deleteButton.textContent="Delete This Item";
        arrOfNewRow.push(newDoing);
        arrOfFunctions.push(1);
        let ul_list = document.getElementById("item-list");
        ul_list.appendChild(newDoing);
        deleteButton.onclick = function(e)
        {
            arrOfDelRow.push(newDoing);
            document.querySelector("#textInput").focus();
            ul_list.removeChild(newDoing);
            arrOfFunctions.push(0);
            counterToDOItems--;
            document.getElementById("counter").innerHTML= counterToDOItems + " ToDos  ";
            
        }
    
    }
    document.querySelector("#textInput").focus();
}
function undoFunction ()
{
    let ul_list = document.getElementById("item-list");
    if(!arrOfFunctions.length)
    {
        return;
    }
    let lastOperation = arrOfFunctions.pop();
    if(lastOperation === 1)
    {
        let lastToDoAdded = arrOfNewRow.pop();
        ul_list.removeChild(lastToDoAdded);
        counterToDOItems--;
        document.getElementById("counter").innerHTML= counterToDOItems + " ToDos  ";
    }
    else if(lastOperation ===0)
    {
        let lastToDoDeleted = arrOfDelRow.pop();
        ul_list.appendChild(lastToDoDeleted);
        counterToDOItems++;
        document.getElementById("counter").innerHTML= counterToDOItems + " ToDos  ";
    }
    document.querySelector("#textInput").focus();
}