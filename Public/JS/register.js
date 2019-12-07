window.onload = function () {
    main();
  };
  
  function main() {
    const loginForm = document.getElementById("registerForm");
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = loginForm.querySelector("input[name='email']").value;
      const password = loginForm.querySelector("input[name='password']").value;

      console.log(email, password);

      const res = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ email, password })
      });

//            !! should delete, pls check!! 
      console.log(res.status);
      if (res.status === 200) {
        alert("Yes!Neway")
        window.location.href = '/login.html';
      } else {
        const resJson = await res.json();
        alert(resJson.message);
      }
    })
  
  };

  