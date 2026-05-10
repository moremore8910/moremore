function showPage(page) {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("students").style.display = "none";
    document.getElementById("exams").style.display = "none";

    document.getElementById(page).style.display = "block";
}