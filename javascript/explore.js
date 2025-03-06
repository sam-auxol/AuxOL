let topics = ['all', 'natural-science', 'social-science', 'language-science', 'physical-commonsense', 'social-commonsense', 'temporal-commonsense', 'algebra', 'geometry', 'theory'];
let domains = ['all', 'science', 'commonsense', 'mathematics'];


let optbtn = document.getElementsByClassName("optionsbtn")[0];
let closebtn = document.getElementsByClassName("closebtn")[0];
let optionpanel = document.getElementById("option-panel");
let body = document.getElementById("content-body");
let display = document.getElementById("display");
let optboxes = document.getElementsByClassName("optbox");
let opt_dds = document.getElementsByClassName("opt-dd");
let filter_submit = document.getElementById("filter-submit");

let topic_dd = make_dropdown("Choose a topic:", topics, "topic-dd");
let domain_dd = make_dropdown("Choose a domain:", domains, "domain-dd");

optboxes[0].innerHTML += domain_dd;
optboxes[0].innerHTML += topic_dd;

// data filters
let filters = {};

optbtn.addEventListener("click", openNav);
closebtn.addEventListener("click", closeNav);


for (each of opt_dds) {
    each.addEventListener("change", change_filters);
}
filter_submit.addEventListener("click", filter_data);

// display the page
filter_data();

function openNav() {
    optionpanel.style.width = "20vw";
    display.style.width = "80vw";
    for (each of optionpanel.children) {
        each.style.display = "block";
    }
}

function closeNav() {
    optionpanel.style.width = "0";
    display.style.width = "100vw";
    for (each of optionpanel.children) {
        each.style.display = "none";
    }
}

function change_filters(e) {
    filters.topic = document.getElementById("topic-dd").value;
    filters.domain = document.getElementById("domain-dd").value;
    // console.log(filters);
}

// draw the page
function create_page(d) {
    if (d.length === 0) {
        body.innerHTML = "<p>No example satisfies all the filters.</p>";
    } else {
        col1 = create_col(d.slice(0, d.length / 2));
        col2 = create_col(d.slice(d.length / 2));
        body.innerHTML = col1 + col2;
    }
    reflow(body);
    console.log("reflowed");
}

function create_col(data) {
    res = [];
    for (each of data) {
        res.push(create_example(each));
    }
    return `<div class="display-col"> ${res.join("")} </div>`;
}

// data is an object with the following attr.
// hint: textual hint
// path: link/path to the image
// question: question text
// choices: an array of choices
// answer: answer to the question
// lecture: lecture text
// solution: solution text
function create_example(data) {
    let question = make_qt(data.question);

    let hint = make_hint(data.hint)
    let image = "";
    if (data.image !== -1)
        image = make_img(data.path);

    let choices = make_choices(data.choices);
    let answer = make_answer(data.choices[data.answer]);
    lecture = make_lecture(data.lecture);
    solution = make_solution(data.solution);
    html = make_box([question, hint, image, choices, answer, lecture, solution]) + "<hr/>";

    return html;
}

// creates a div with question text in it
function make_qt(text) {
    let html = `
            <p><b>Question </b></p>
            <p class="question-txt">${text}</p>
    `;
    return html;
}

function make_hint(hint) {
    if (hint === null) return "";
    if (hint === "") return "";
    let html = `<p><b>Context </b></p><p class="hint-txt">${hint}</p>`;
    return html;
}

function make_img(path) {
    if (path === null) return "";
    let html = `<p><b>Image </b></p><p><img src="${path}" alt="example image" class="question-img" /></p>`;
    return html;
}

function make_box(contents, cls = "") {
    if (contents.join("").length === 0) return "";
    let html = `
        <div class="box ${cls}"> 
            ${contents.join(" ")}
        </div>
    `;
    return html;
}

function make_choices(choices) {
    let temp = "";
    let len = 0;
    for (each of choices) {
        let html = make_choice(each);
        temp += html;
        len += each.length;
    }
    let html = "";
    if (len < 60)
        html = `<p><b>Choices </b></p><div class="choices">${temp}</div>`;
    else
        html = `<p><b>Choices </b></p><div class="choices-vertical">${temp}</div>`;
    return html;
}
function make_choice(choice) {
    let html = `<div class="choice-txt">${choice}</div>`;
    return html;
}

function make_answer(answer) {
    let html = `<p><b>Answer </b></p><p class="answer-txt">${answer}</p>`;
    return html;
}

function make_lecture(lecture) {
    if (lecture === null) return "";
    let html = `<p><b>Lecture </b></p><p class="lecture"> ${lecture}</p>`;
    return html;
}

function make_solution(solution) {
    if (solution === null) return "";
    solution = solution.replace(/\n/g, "<br>")
    let html = `<p><b>Solution </b></p><p class="solution"> ${solution}</p>`;
    return html;
}

function make_dropdown(label, options, id, default_ind = 0) {
    let html = "";
    for (let i = 0; i < options.length; i++) {
        if (i === default_ind)
            html += `<option value="${options[i]}" selected> ${options[i]} </option>`;
        else
            html += `<option value="${options[i]}"> ${options[i]} </option>`;
    }
    html = `<label class="dd-label">${label} <select id="${id}" class="opt-dd"> ${html} </select> </label><br/>`;
    return html;
}

function filter_data() {
    change_filters();
    res = problem_data;
    if (filters.domain !== "all")
        res = res.filter(e => e.domain === filters.domain);
    if (filters.topic !== "all")
        res = res.filter(e => e.topic === filters.topic);
    
    
    d = _.sample(res, Math.min(10, res.length));
    for (each of d) {
        console.log(d);
    }
    create_page(d);
}

// force the browser to reflow
function reflow(elt) {
    elt.offsetHeight;
}
