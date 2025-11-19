
function signupHandler(){
  const name = document.getElementById('name')?.value;
  const email = document.getElementById('email')?.value;
  const whatsapp = document.getElementById('whatsapp')?.value;
  if(!email) return alert('Please enter an email');
  alert('Thanks, ' + (name||'there') + '! We\'ll send the free masterclass to ' + email + (whatsapp ? (' and message ' + whatsapp) : ''));
}

function applyHandler(){
  const name = document.getElementById('app-name')?.value;
  const email = document.getElementById('app-email')?.value;
  const phone = document.getElementById('app-phone')?.value;
  if(!email) return alert('Please enter an email');
  alert('Application received. We will contact ' + (name||email) + ' via ' + (phone||email));
}
document.addEventListener('submit', function(e){
  const form = e.target;
  // Basic client-side email presence check for Netlify forms (non-blocking)
  if(form.getAttribute('data-netlify')==='true'){
    const email = form.querySelector('input[name="email"]');
    if(email && !email.value){
      e.preventDefault();
      alert('Please enter your email address.');
      email.focus();
    }
  }
});
