const password = document.getElementById('password')
const passwordConfirm = document.getElementById('passwordConfirmation')
const button = document.getElementById('submitButton')

function confirmation() {
  if (password.value !== passwordConfirm.value | password.value == '') {
    button.disabled = true
    button.classList.remove('btnHover')
  } else {
    button.disabled = false
    button.classList.add('btnHover')
  }
}

document.addEventListener('DOMContentLoaded', () => { confirmation() })

password.addEventListener('input', () => { confirmation() })
passwordConfirm.addEventListener('input', () => { confirmation() })

passwordConfirm.addEventListener('blur', () => {
  if (button.disabled == true & password.value != '') {
    alert('O compo de confirmação e de senha não coincidem')
  }
})



