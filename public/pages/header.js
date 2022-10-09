function itemSearch(val) {
    var selectedValue = document.getElementById("modeSearch").value;
    if (selectedValue == "tag")
        document.location.href = "/item/tag/" + val
    if (selectedValue == "reference")
        document.location.href = "/item/reference/" + val
}