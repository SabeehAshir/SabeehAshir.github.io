
// form validation
let submit = document.querySelector('button[type="submit"]');
let fields = document.querySelectorAll('input, textarea');

if (document.URL.includes("Login.html") || document.URL.includes("addEntry.php")) {
    submit.addEventListener('click', validateFields);
}

let fieldsValid = false;

function validateFields(e) {
    if (fields[0].value === "" || fields[1].value === "") {
        alert("Please fill in all the fields");
        for (let field of fields) {
            if (field.value === "") {
                e.preventDefault();
                field.style.border = "0.2rem solid red";
            } else {
                field.style.border = "white 0.1rem";
            }
        }
        fieldsValid = false;
    } else {
        fieldsValid = true;
    }
}
if (document.URL.includes("addEntry.php")) {
    let reset = document.querySelector('button[type="reset"]');

    reset.addEventListener('click', function (e) {
        if (!confirm("Are you sure you want to clear the form?")) {
            e.preventDefault();
        }
        fields.forEach(field => {
            field.style.border = "dashed white 0.1rem";
        });
    });
}
/* Date and time function */

function getCurrentDate() {
    const date = new Date();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
}
/* Preview post layout */

if (document.URL.includes("addEntry.php")) {
    let preview = document.getElementById('preview');
    preview.addEventListener('click', validateFields);

    preview.addEventListener('click', function (e) {
        e.preventDefault();
        if (!fieldsValid) {
            return;
        }
        localStorage.setItem('title', document.getElementById('title').value);
        localStorage.setItem('content', document.getElementById('content').value);
        window.location.href = "preview.html";
    });
}

/* Display preview form */

function displayPreview() {
    let previewForm = document.getElementById('preview_form');
    let previewFormSection = document.getElementById('preview_section');
    let div = document.createElement('div');
    div.classList.add('post_header');

    let h4 = document.createElement('h4');
    h4.textContent = localStorage.getItem('title');
    h4.id = 'post_title';
    h4.style.whiteSpace = 'pre-wrap';

    let h2 = document.createElement('h2');
    h2.textContent = String.fromCodePoint(128338) + " " + getCurrentDate();
    h2.id = 'post_date';
    h2.style.whiteSpace = 'pre-wrap';

    let p = document.createElement('p');
    p.textContent = localStorage.getItem('content');
    p.id = 'post_content';
    p.style.whiteSpace = 'pre-wrap';

    div.appendChild(h4);
    div.appendChild(h2);
    previewFormSection.appendChild(div);
    previewFormSection.appendChild(document.createElement('hr'));
    previewFormSection.appendChild(p);

    // hidden inputs
    let inputTitle = document.createElement('input');
    inputTitle.type = 'hidden';
    inputTitle.name = 'title';
    inputTitle.value = localStorage.getItem('title');

    let inputContent = document.createElement('input');
    inputContent.type = 'hidden';
    inputContent.name = 'content';
    inputContent.value = localStorage.getItem('content');

    previewForm.appendChild(inputTitle);
    previewForm.appendChild(inputContent);

    // Buttons
    let buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons');

    let submitPost = document.createElement('button');
    submitPost.textContent = "Post";
    submitPost.type = 'submit';
    submitPost.id = 'submit';

    let cancelPost = document.createElement('button');
    cancelPost.textContent = "Edit";
    cancelPost.id = 'cancel-post';

    buttonsDiv.appendChild(submitPost);
    buttonsDiv.appendChild(cancelPost);
    previewFormSection.appendChild(buttonsDiv);
    previewForm.appendChild(previewFormSection);

    //  Listeners (placed *after* buttons are added)
    cancelPost.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = "addEntry.php";
    });

    submitPost.addEventListener('click', function () {
        localStorage.removeItem('title');
        localStorage.removeItem('content');
    });
}

if (document.URL.includes("preview.html")) {
    displayPreview();

/* Go back if edit button pressed */

    let cancelPost = document.getElementById('cancel-post');
    cancelPost.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = "addEntry.php";
    });

    document.getElementById('submit').addEventListener('click', function () {
        localStorage.removeItem('title');
        localStorage.removeItem('content');
    });
}

/* Restore form data if it's contained in localStorage */

if (document.URL.includes("addEntry.php")) {
    if ((localStorage.getItem('title') !== null) && (localStorage.getItem('content') !== null)) {
        document.getElementById('title').value = localStorage.getItem('title');
        document.getElementById('content').value = localStorage.getItem('content');
        localStorage.removeItem('title');
        localStorage.removeItem('content');
    }
}