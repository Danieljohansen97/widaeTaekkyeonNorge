const postList = document.querySelector('.posts');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if (user) {
        if(user.admin){
            adminItems.forEach(item => item.style.display = 'block');
        }
        // account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `
                <h4 class="center-align">${doc.data().name}</h4>
                <div class="pink-text center-align">${user.admin ? 'Administrator' : ''}</div>
                <img class="circle center-align" style="width: 150px;" src="${doc.data().imageurl}">
                <div class="left-align">F.dato: ${doc.data().age}</div>
                <div class="left-align">Mobil: ${doc.data().phone}</div>
                <div class="left-align">E-post: ${user.email}</div>
            `;
            accountDetails.innerHTML = html;
        })
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // hide account info
        accountDetails.innerHTML = '';
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        adminItems.forEach(item => item.style.display = 'none');
    }
};

// setup posts

    const setupPosts = (data) => {
        if (postList) {
            if (data.length) {
                let html = '';
                data.forEach(doc => {
                    const post = doc.data();
                    const li = `
                        <li>
                            <div class="collapsible-header grey lighten-4">${post.title}</div>
                            <div class="collapsible-body white">${post.content}</div>
                        </li>
                    `;
                    html += li;
                });
                postList.innerHTML = html;
            } else {
                postList.innerHTML = '<h5 class="center-align red-text">Logg inn for å se blogg</5>';
            }
        };
    };


// Setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    // Modal init
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    // Collapsible init
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
    
    // Dropdown init
    var dropdowns = document.querySelectorAll('.dropdown-trigger');
    var dropdownOptions = {
        'hover': true
    };
    M.Dropdown.init(dropdowns, dropdownOptions);

    // Datepicker init
    var datepickers = document.querySelectorAll('.datepicker');
    var datepickerOptions = {
        'autoClose': true,
        'yearRange': [1950, 2100] 
    }
    M.Datepicker.init(datepickers, datepickerOptions);
    

});