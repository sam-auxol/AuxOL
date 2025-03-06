/*
 * @Author: Qiguang Chen
 * @LastEditors: Qiguang Chen
 * @Date: 2024-05-25 14:52:34
 * @LastEditTime: 2024-05-26 17:41:01
 * @Description: 
 * 
 */

let obj_to_tr = (obj) => {
    let modelCell;
    let avgCell;

    // console.log(obj["#"]);
    let bar_style;
    if (obj["#"] == "**") {
        modelCell = `<td style="text-align: left;"><strong class="high-model-text">${obj.Model}</strong></td>`;
        avgCell = `<td><strong class="high-model-text">${obj.Total}</strong></td>`;
    } else if (obj["Setting"].includes("zero-shot")) {
        modelCell = `<td style="text-align: left;"><strong class="InstructBLIP-model-text">${obj.Model}</strong></td>`;
        avgCell = `<td><strong class="InstructBLIP-model-text">${obj.Total}</strong></td>`;
        bar_style = `class="zero-shot-model-bar"`
    } else if (obj["Setting"].includes("tool-usage")) {
        modelCell = `<td style="text-align: left;"><strong class="tool-usage">${obj.Model}</strong></td>`;
        avgCell = `<td><strong class="tool-usage">${obj.Total}</strong></td>`;
        bar_style = `class="tool-usage-model-bar"`
    } else if (obj["Setting"].includes("fine-tuning")) {
        modelCell = `<td style="text-align: left;"><strong class="CogVLM-model-text">${obj.Model}</strong></td>`;
        avgCell = `<td><strong class="CogVLM-model-text">${obj.Total}</strong></td>`;
        bar_style = `class="fine-tuning-model-bar"`
    } else if (obj["Model"].includes("few-shot")) {
        modelCell = `<td style="text-align: left;"><strong class="Gemini-model-text">${obj.Model}</strong></td>`;
        avgCell = `<td><strong class="Gemini-model-text">${obj.Total}</strong></td>`;
    } else if (obj["Model"].includes("GPT4V")) {
        modelCell = `<td style="text-align: left;"><strong class="GPT4V-model-text">${obj.Model}</strong></td>`;
        avgCell = `<td><strong class="GPT4V-model-text">${obj.Total}</strong></td>`;
    } else {
        modelCell = `<td style="text-align: left;"><strong class="best-model-text">${obj.Model}</strong></td>`;
        avgCell = `<td><strong>${obj.Total}</strong></td>`;
    }
    

    // return `<tr>
    //     <td>${obj["#"]}</td>
    //     ${modelCell}
    //     <td>${obj.Method}</td>
    //     <td>${obj.Learning}</td>
    //     <td>${obj.Size}</td>
    //     <td>${obj.Param}</td>
    //     <td><a href="${obj.Link}" class="ext-link" style="font-size: 16px;">Link</a></td>
    //     <td>${obj.Date}</td>
    //     <td>${obj.NAT}</td>
    //     <td>${obj.SOC}</td>
    //     <td>${obj.LAN}</td>
    //     <td>${obj.TXT}</td>
    //     <td>${obj.IMG}</td>
    //     <td>${obj.NO}</td>
    //     <td>${obj["G1-6"]}</td>
    //     <td>${obj["G7-12"]}</td>
    //     ${avgCell}
    // </tr>`;
    return `<tr ${bar_style}>
        <td>${obj["#"]}</td>
        ${modelCell}
        <td>${obj.Prompt}</td>
        <td>${obj.Setting}</td>
        <td>${obj.Size}</td>
        <td>${obj.Backbone}</td>
        <td><a href="${obj.Link}" class="ext-link" style="font-size: 16px;">Link</a></td>
        <td>${obj.Lang}</td>
        <td>${obj.Natural}</td>
        <td>${obj.Social}</td>
        <td>${obj.Physical}</td>
        <td>${obj.SocialC}</td>
        <td>${obj.Temporal}</td>
        <td>${obj.Algebra}</td>
        <td>${obj.Geometry}</td>
        <td>${obj.Theory}</td>
        ${avgCell}
    </tr>`;
}

let table = document.getElementById("results");
html = "";
for (let i of leaderboard) {
    html += obj_to_tr(i);
}

table.getElementsByTagName("tbody")[0].innerHTML = html;

function reflow(elt) {
    console.log(elt.offsetHeight);
}

reflow(table);
