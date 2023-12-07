const logIn = async ()=>{
    let userlogindata ={
    userEmail :document.getElementById("email").value,
    userPassword : document.getElementById("pass").value,
    }
    let res = await fetch("http://localhost:8000/userlogin", {
        method: "POST",
        body: JSON.stringify(userlogindata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
    if(data.message !== "Wrong Credential"){
      alert("Successfully login!");
      localStorage.setItem("userEmail", JSON.stringify(data.userEmail));
      window.location.href="./index.html";
    }else{
      alert("Wrong Credential!");
    }
  }

  let goToHomePage = () =>{
    window.location.href = "./index.html";
  }