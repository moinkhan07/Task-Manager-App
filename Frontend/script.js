const addTask = ()=>{

}

const openOptions = (clickedElement)=>{
    const taskDiv = clickedElement.closest(".taskDiv");

    const threedotfun = taskDiv.querySelector(".threedotfun");

    threedotfun.style.display = "block";
}
const closeOptions = (clickedElement)=>{
    const taskDiv = clickedElement.closest(".taskDiv");

    const threedotfun = taskDiv.querySelector(".threedotfun");

    threedotfun.style.display = "none";
}
const updateTask=()=>{
    
}