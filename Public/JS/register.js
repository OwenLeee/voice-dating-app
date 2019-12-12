window.onload = function () {
  main();
};

function main() {
  const loginForm = document.getElementById("registerForm");
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = loginForm.querySelector("input[name='email']").value;
    const password = loginForm.querySelector("input[name='password']").value;
    const confirmPassword = loginForm.querySelector("input[name='confirm-password']").value;

    console.log(email, password, confirmPassword);
    
    if (password === confirmPassword) {
      const res = await fetch('/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ email, password })
      });
      // console.log ("okay");
      window.location.href = '/login.html';
    } else {
      // console.log ("failed");
      swal("Your password is not correct !");
    };
  })
};