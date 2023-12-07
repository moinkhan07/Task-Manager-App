const register = async () => {
    let userdata = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      userEmail: document.getElementById("email").value,
      userPassword: document.getElementById("pass").value
    };

      if(userdata.firstName.length < 3){
        alert("FirstName length should be 3 or more");
        return;
      }
      if(userdata.lastName.length < 3){
        alert("LastName length should be 3 or more");
        return;
      }
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!userdata.userEmail.match(mailformat)){
        alert("Enter correct email format!")
        return;
      }
      if(userdata.userPassword.length <= 5 || userdata.userPassword.length >= 15){
        alert("Password should be min 6 and max 15");
        return;
      }

        let res = await fetch("http://localhost:8000/users", {
          method: "POST",
          body: JSON.stringify(userdata),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await res.json();
        alert("Welcome To Task Manager " + userdata.firstName);

    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("pass").value="";
    window.location.href  = "./login.html";
  };

  let goToHomePage = () =>{
    window.location.href = "./index.html";
  }